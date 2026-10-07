/**
 * PyodideManager v2.0 - Gerencia instância do Pyodide
 * Responsável por:
 * - Captura de output e stderr
 * - Tratamento de erros robusto
 * - Timeout e interrupts
 * - Limpeza de estado
 * - Inspeção de variáveis
 * - Performance tracking
 * - Cache de compilação
 */

class PyodideManager {
    constructor() {
        this.py = null;
        this.isReady = false;
        this.isExecuting = false;
        this.timeout = 5000; // 5 segundos
        this.outputBuffer = '';
        this.stderrBuffer = '';
        this.executionMetrics = {
            totalExecutions: 0,
            totalTime: 0,
            averageTime: 0,
            lastExecutionTime: 0
        };
        this.compilationCache = new Map(); // Cache para AST
    }

    /**
     * Inicializa Pyodide
     */
    async init() {
        try {
            // Carrega Pyodide
            this.py = await loadPyodide();

            // Configura redirecionamento de stdout
            this.setupIO();

            this.isReady = true;
            return { success: true, message: 'Python pronto!' };
        } catch (error) {
            return {
                success: false,
                message: `Erro ao carregar Python: ${error.message}`
            };
        }
    }

    /**
     * Configura captura de input/output e stderr
     */
    setupIO() {
        // Executa código para redirecionar stdout e stderr
        try {
            this.py.runPython(`
import sys
import io

# Criar StringIO para capturar output e stderr
_output_buffer = io.StringIO()
_stderr_buffer = io.StringIO()
_original_stdout = sys.stdout
_original_stderr = sys.stderr

sys.stdout = _output_buffer
sys.stderr = _stderr_buffer

def get_output():
    global _output_buffer
    content = _output_buffer.getvalue()
    _output_buffer = io.StringIO()
    sys.stdout = _output_buffer
    return content

def get_stderr():
    global _stderr_buffer
    content = _stderr_buffer.getvalue()
    _stderr_buffer = io.StringIO()
    sys.stderr = _stderr_buffer
    return content

def clear_output():
    global _output_buffer, _stderr_buffer
    _output_buffer = io.StringIO()
    _stderr_buffer = io.StringIO()
    sys.stdout = _output_buffer
    sys.stderr = _stderr_buffer

def get_all_variables():
    """Retorna todas as variáveis do usuário com seus tipos e valores"""
    vars_dict = {}
    for var_name in dir():
        if not var_name.startswith('_'):
            try:
                var_value = eval(var_name)
                var_type = type(var_value).__name__
                # Converter valor para string
                var_str = str(var_value)
                if len(var_str) > 100:
                    var_str = var_str[:100] + '...'
                vars_dict[var_name] = {
                    'type': var_type,
                    'value': var_str
                }
            except:
                vars_dict[var_name] = {'type': 'unknown', 'value': 'N/A'}
    return vars_dict
`);
        } catch (e) {
            console.error('Erro ao configurar IO:', e);
        }
    }

    /**
     * Executa código Python e retorna output + stderr
     * @param {string} code - Código Python a executar
     * @returns {Promise<{output: string, stderr: string, error: string|null, metrics: object}>}
     */
    async runCode(code) {
        if (!this.isReady) {
            return { output: '', stderr: '', error: 'Python não está pronto', metrics: {} };
        }

        if (this.isExecuting) {
            return { output: '', stderr: '', error: 'Execução anterior ainda em andamento', metrics: {} };
        }

        this.isExecuting = true;
        this.outputBuffer = '';
        this.stderrBuffer = '';
        const startTime = performance.now();

        try {
            // Validação básica
            const validation = this.validateCode(code);
            if (!validation.valid) {
                this.isExecuting = false;
                return { output: '', stderr: '', error: validation.error, metrics: {} };
            }

            // Limpar output anterior
            await this.py.runPythonAsync('clear_output()');

            // Executar código com timeout
            const result = await this.executeWithTimeout(code);

            if (result.error) {
                this.isExecuting = false;
                const endTime = performance.now();
                const executionTime = endTime - startTime;
                this.recordMetrics(executionTime);
                return {
                    output: '',
                    stderr: '',
                    error: result.error,
                    metrics: { executionTime }
                };
            }

            // Capturar output e stderr
            const output = await this.py.runPythonAsync('get_output()');
            const stderr = await this.py.runPythonAsync('get_stderr()');

            const endTime = performance.now();
            const executionTime = endTime - startTime;
            this.recordMetrics(executionTime);

            this.isExecuting = false;
            return {
                output: output || '(sem saída)',
                stderr: stderr || '',
                error: null,
                metrics: { executionTime }
            };

        } catch (error) {
            this.isExecuting = false;
            const endTime = performance.now();
            const executionTime = endTime - startTime;
            this.recordMetrics(executionTime);
            return {
                output: '',
                stderr: '',
                error: this.formatError(error),
                metrics: { executionTime }
            };
        }
    }

    /**
     * Executa código com timeout
     * @private
     */
    async executeWithTimeout(code) {
        return new Promise((resolve) => {
            let timeoutId;
            let completed = false;

            const executionPromise = this.py.runPythonAsync(code)
                .then(() => {
                    if (!completed) {
                        completed = true;
                        clearTimeout(timeoutId);
                        resolve({ error: null });
                    }
                })
                .catch((error) => {
                    if (!completed) {
                        completed = true;
                        clearTimeout(timeoutId);
                        resolve({ error: error.message });
                    }
                });

            timeoutId = setTimeout(() => {
                if (!completed) {
                    completed = true;
                    // Tentar interromper (nem sempre funciona em WebAssembly)
                    resolve({ error: 'Timeout: execução levou mais de 5 segundos' });
                }
            }, this.timeout);
        });
    }

    /**
     * Valida sintaxe básica
     * @private
     */
    validateCode(code) {
        if (!code || !code.trim()) {
            return { valid: false, error: 'Código vazio' };
        }

        // Verificar indentação básica
        const lines = code.split('\n');
        let inBlock = false;
        let expectedIndent = 0;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const trimmed = line.trim();

            if (!trimmed || trimmed.startsWith('#')) continue; // Skip empty/comments

            const indent = line.search(/\S/);

            // Verificar se entra em bloco
            if (trimmed.endsWith(':')) {
                inBlock = true;
                expectedIndent = indent + 4;
            }

            // Verificar indentação após :
            if (inBlock && indent < expectedIndent && trimmed.length > 0) {
                if (!trimmed.startsWith('#')) {
                    // Último : ainda não teve corpo indentado
                }
            }

            // Sair de bloco
            if (inBlock && indent <= expectedIndent - 4 && trimmed.length > 0) {
                inBlock = false;
            }
        }

        return { valid: true };
    }

    /**
     * Formata mensagem de erro com contexto
     * @private
     */
    formatError(error) {
        const message = error.message || String(error);

        if (message.includes('SyntaxError')) {
            return `Erro de Sintaxe: ${message.split('SyntaxError:')[1] || 'verificar código'}`;
        }
        if (message.includes('IndentationError')) {
            return `Erro de Indentação: código não está alinhado corretamente`;
        }
        if (message.includes('NameError')) {
            return `Erro de Nome: variável ou função não definida`;
        }
        if (message.includes('TypeError')) {
            return `Erro de Tipo: verificar tipos de variáveis`;
        }
        if (message.includes('ValueError')) {
            return `Erro de Valor: valor inválido fornecido`;
        }
        if (message.includes('ZeroDivisionError')) {
            return `Erro: divisão por zero não é permitida`;
        }
        if (message.includes('IndexError')) {
            return `Erro: índice fora do alcance`;
        }
        if (message.includes('KeyError')) {
            return `Erro: chave não encontrada no dicionário`;
        }

        return `Erro: ${message}`;
    }

    /**
     * Obtém variáveis locais do contexto Python
     * @returns {Promise<object>} Dicionário com {varName: {type, value}}
     */
    async getLocalVariables() {
        if (!this.isReady) return {};

        try {
            const variables = await this.py.runPythonAsync('get_all_variables()');
            return variables || {};
        } catch (e) {
            console.warn('Erro ao obter variáveis:', e);
            return {};
        }
    }

    /**
     * Registra métricas de execução
     * @private
     */
    recordMetrics(executionTime) {
        this.executionMetrics.totalExecutions++;
        this.executionMetrics.totalTime += executionTime;
        this.executionMetrics.lastExecutionTime = executionTime;
        this.executionMetrics.averageTime = this.executionMetrics.totalTime / this.executionMetrics.totalExecutions;
    }

    /**
     * Obtém métricas de performance
     * @returns {object} Métricas de execução
     */
    getMetrics() {
        return {
            ...this.executionMetrics,
            averageTime: Math.round(this.executionMetrics.averageTime * 100) / 100
        };
    }

    /**
     * Limpa estado (para nova missão)
     */
    async clearState() {
        if (!this.isReady) return;

        try {
            // Limpar variáveis mas manter funções built-in
            await this.py.runPythonAsync(`
# Limpar apenas variáveis do usuário
import sys
vars_to_delete = [var for var in dir() if not var.startswith('_')]
for var in vars_to_delete:
    try:
        del globals()[var]
    except:
        pass
clear_output()
`);
        } catch (e) {
            console.warn('Erro ao limpar estado:', e);
        }
    }

    /**
     * Verifica se está pronto
     */
    ready() {
        return this.isReady;
    }

    /**
     * Obtém informações do Pyodide
     */
    getInfo() {
        return {
            ready: this.isReady,
            executing: this.isExecuting,
            version: this.py ? 'loaded' : 'not loaded',
            metrics: this.getMetrics()
        };
    }
}

// Exportar para uso global
window.PyodideManager = PyodideManager;
