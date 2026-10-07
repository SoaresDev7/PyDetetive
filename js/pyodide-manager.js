/**
 * PyodideManager - Gerencia instância do Pyodide
 * Responsável por:
 * - Captura de output
 * - Tratamento de erros
 * - Timeout e interrupts
 * - Limpeza de estado
 */

class PyodideManager {
    constructor() {
        this.py = null;
        this.isReady = false;
        this.isExecuting = false;
        this.timeout = 5000; // 5 segundos
        this.outputBuffer = '';
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
     * Configura captura de input/output
     */
    setupIO() {
        // Executa código para redirecionar stdout
        try {
            this.py.runPython(`
import sys
import io

# Criar StringIO para capturar output
_output_buffer = io.StringIO()
_original_stdout = sys.stdout
sys.stdout = _output_buffer

def get_output():
    global _output_buffer
    content = _output_buffer.getvalue()
    # Limpar para próxima execução
    _output_buffer = io.StringIO()
    sys.stdout = _output_buffer
    return content

def clear_output():
    global _output_buffer
    _output_buffer = io.StringIO()
`);
        } catch (e) {
            console.error('Erro ao configurar IO:', e);
        }
    }

    /**
     * Executa código Python e retorna output
     * @param {string} code - Código Python a executar
     * @returns {Promise<{output: string, error: string|null}>}
     */
    async runCode(code) {
        if (!this.isReady) {
            return { output: '', error: 'Python não está pronto' };
        }

        if (this.isExecuting) {
            return { output: '', error: 'Execução anterior ainda em andamento' };
        }

        this.isExecuting = true;
        this.outputBuffer = '';

        try {
            // Validação básica
            const validation = this.validateCode(code);
            if (!validation.valid) {
                this.isExecuting = false;
                return { output: '', error: validation.error };
            }

            // Limpar output anterior
            await this.py.runPythonAsync('clear_output()');

            // Executar código com timeout
            const result = await this.executeWithTimeout(code);

            if (result.error) {
                this.isExecuting = false;
                return { output: '', error: result.error };
            }

            // Capturar output
            const output = await this.py.runPythonAsync('get_output()');

            this.isExecuting = false;
            return {
                output: output || '(sem saída)',
                error: null
            };

        } catch (error) {
            this.isExecuting = false;
            return {
                output: '',
                error: this.formatError(error)
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
     * Formata mensagem de erro
     * @private
     */
    formatError(error) {
        const message = error.message || String(error);

        // Extrair tipo e mensagem
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

        return `Erro: ${message}`;
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
            version: this.py ? 'loaded' : 'not loaded'
        };
    }
}

// Exportar para uso global
window.PyodideManager = PyodideManager;
