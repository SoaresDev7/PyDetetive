/**
 * MissionValidator v2.0 - Valida execução de missões
 * Responsável por:
 * - Comparar resultado com esperado
 * - Fornecer dicas progressivas
 * - Análise estática de código
 * - Gerenciar progresso
 * - Salvar em localStorage
 */

class MissionValidator {
    constructor() {
        this.storage = new LocalStorageManager();
        this.hints = this.loadHints();
        this.patternDetector = new Map();
        this.initPatterns();
    }

    /**
     * Inicializa padrões de detecção
     * @private
     */
    initPatterns() {
        // Padrões comuns que alunos usam errado
        this.patternDetector.set('print-without-args', /print\s*\(\s*\)/);
        this.patternDetector.set('missing-print', /^\s*\w+\s*=\s*[^=]/);
        this.patternDetector.set('string-not-quoted', /print\s*\(\s*\w+\s*\)/);
        this.patternDetector.set('missing-colon', /(if|for|while|def)\s+.*[^:]\s*$/m);
        this.patternDetector.set('wrong-indentation', /^[ ]{1,3}(?!$)/m);
    }

    /**
     * Valida se resultado está correto
     * @param {string} output - Output do código executado
     * @param {string} expected - Output esperado
     * @param {string} missionId - ID da missão
     * @returns {Promise<{passed: boolean, feedback: string}>}
     */
    async validate(output, expected, missionId) {
        // Normalizar strings (remover espaços extras, quebras de linha)
        const normalizedOutput = this.normalizeString(output);
        const normalizedExpected = this.normalizeString(expected);

        // Comparação simples
        const passed = normalizedOutput === normalizedExpected;

        let feedback = '';
        if (passed) {
            feedback = '✅ Parabéns! Missão completada!';
        } else {
            feedback = this.generateFeedback(normalizedOutput, normalizedExpected);
        }

        // Salvar tentativa
        await this.storage.recordAttempt(missionId, passed);

        return { passed, feedback };
    }

    /**
     * Normaliza string para comparação
     * @private
     */
    normalizeString(str) {
        return str
            .trim()
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .join('\n');
    }

    /**
     * Gera feedback útil
     * @private
     */
    generateFeedback(actual, expected) {
        // Se saída está vazia
        if (!actual) {
            return '❌ Seu código não produziu saída. Use print() para exibir resultado.';
        }

        // Se tamanho muito diferente
        if (Math.abs(actual.length - expected.length) > 10) {
            return `❌ Saída incompleta ou com muitos caracteres extras.\nEsperado: ${expected}\nRecebido: ${actual}`;
        }

        // Se é similar mas não igual
        if (this.isSimilar(actual, expected)) {
            return `❌ Muito perto! Verifique espaços, maiúsculas ou pontuação.\nEsperado: "${expected}"\nRecebido: "${actual}"`;
        }

        return `❌ Saída não corresponde.\nEsperado: "${expected}"\nRecebido: "${actual}"`;
    }

    /**
     * Verifica se strings são similares
     * @private
     */
    isSimilar(str1, str2) {
        const maxDiff = Math.max(str1.length, str2.length) * 0.2;
        let diff = 0;

        for (let i = 0; i < Math.max(str1.length, str2.length); i++) {
            if (str1[i] !== str2[i]) diff++;
        }

        return diff < maxDiff;
    }

    /**
     * Analisa código estaticamente
     * @param {string} code - Código a analisar
     * @returns {object} Análise do código {hasErrors, patterns, issues}
     */
    analyzeCode(code) {
        const analysis = {
            hasErrors: false,
            patterns: [],
            issues: [],
            complexity: this.calculateComplexity(code)
        };

        // Detectar padrões problematicos
        for (const [patternName, pattern] of this.patternDetector) {
            if (pattern.test(code)) {
                analysis.patterns.push(patternName);
            }
        }

        // Verificar estrutura
        if (!code.includes('print')) {
            analysis.issues.push('Código não contém print() - nenhuma saída será gerada');
            analysis.hasErrors = true;
        }

        return analysis;
    }

    /**
     * Calcula complexidade do código
     * @private
     */
    calculateComplexity(code) {
        const lines = code.split('\n').length;
        const hasLoop = /\b(for|while)\b/.test(code);
        const hasCondition = /\b(if|else)\b/.test(code);
        const hasFunction = /\bdef\b/.test(code);

        let complexity = 'simples';
        if (hasFunction || (hasLoop && hasCondition)) complexity = 'complexo';
        else if (hasLoop || hasCondition) complexity = 'médio';

        return {
            lines,
            hasLoop,
            hasCondition,
            hasFunction,
            level: complexity
        };
    }

    /**
     * Calcula similaridade entre dois strings (0-100%)
     * @param {string} actual - String real
     * @param {string} expected - String esperada
     * @returns {number} Score de 0 a 100
     */
    calculateSimilarity(actual, expected) {
        if (actual === expected) return 100;
        if (!actual || !expected) return 0;

        const longer = actual.length > expected.length ? actual : expected;
        const shorter = actual.length > expected.length ? expected : actual;

        if (longer.length === 0) return 100;

        const editDistance = this.levenshteinDistance(longer, shorter);
        return Math.round(((longer.length - editDistance) / longer.length) * 100);
    }

    /**
     * Calcula distância de Levenshtein
     * @private
     */
    levenshteinDistance(s1, s2) {
        const costs = [];
        for (let i = 0; i <= s1.length; i++) {
            let lastValue = i;
            for (let j = 0; j <= s2.length; j++) {
                if (i === 0) {
                    costs[j] = j;
                } else if (j > 0) {
                    let newValue = costs[j - 1];
                    if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
                        newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                    }
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
            if (i > 0) costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    }

    /**
     * Sugere correções baseado no código
     * @param {string} code - Código do aluno
     * @param {string} expected - Resultado esperado
     * @returns {string} Sugestão de correção
     */
    suggestFix(code, expected) {
        const analysis = this.analyzeCode(code);

        if (analysis.issues.length > 0) {
            return `⚠️ Problemas detectados:\n${analysis.issues.join('\n')}`;
        }

        if (analysis.patterns.includes('missing-print')) {
            return '💡 Parece que você criou variáveis mas não usou print() para exibir o resultado.';
        }

        if (analysis.patterns.includes('string-not-quoted')) {
            return '💡 Strings devem estar entre aspas: print("seu texto")';
        }

        return '💡 Verifique se o output corresponde exatamente ao esperado (maiúsculas, espaços, etc.)';
    }

    /**
     * Obtém dica para uma missão
     * @param {object} mission - Objeto da missão
     * @param {number} attemptCount - Número de tentativas
     * @returns {string} Dica apropriada
     */
    getHint(mission, attemptCount = 0) {
        const hints = this.hints[mission.id] || [];

        if (attemptCount < 1) {
            return 'Faça uma tentativa antes de pedir dica!';
        }

        if (attemptCount - 1 >= hints.length) {
            return `Nenhuma mais dicas. Dica final: ${hints[hints.length - 1]}`;
        }

        return hints[attemptCount - 1] || hints[hints.length - 1];
    }

    /**
     * Carrega dicas do arquivo
     * @private
     */
    loadHints() {
        return {
            1: [
                'Use a função print() para exibir texto',
                'O texto deve estar entre aspas: print("texto")',
                'print("Olá, Mundo!")'
            ],
            2: [
                'Defina uma variável: nome = "valor"',
                'Use f-string para interpolar: f"texto {variavel}"',
                'nome = "Lumi"\nprint(f"O robô é: {nome}")'
            ],
            3: [
                'Declare as variáveis x e y',
                'Use + para soma e * para multiplicação',
                'x = 5\ny = 3\nprint(f"Soma: {x + y}")\nprint(f"Produto: {x * y}")'
            ],
            4: [
                'Crie 3 variáveis com tipos diferentes',
                'Use f-string para exibir todos juntos',
                'inteiro = 42\nfloat_num = 3.14\ntexto = "Python"\nprint(f"Inteiro: {inteiro}, Float: {float_num}, Texto: {texto}")'
            ],
            5: [
                'Use operadores: >, <, ==, !=',
                'Os resultados serão True ou False',
                'a = 10\nb = 5\nprint(f"a > b: {a > b}")\nprint(f"a == b: {a == b}")\nprint(f"a != b: {a != b}")'
            ],
            6: [
                'Use if/else para tomar decisões',
                'Lembre-se da indentação (4 espaços)',
                'idade = 20\nif idade >= 18:\n    print("Você é maior de idade")\nelse:\n    print("Você é menor de idade")'
            ],
            7: [
                'Use for com range()',
                'range(1, 6) gera números de 1 a 5',
                'for i in range(1, 6):\n    print(f"Número: {i}")'
            ],
            8: [
                'Crie uma lista com [elemento1, elemento2, ...]',
                'Use índices: lista[0], lista[-1], len(lista)',
                'lista = ["Ana", "Bruno", "Carlos", "Diana"]\nprint(f"Primeiro: {lista[0]}")\nprint(f"Último: {lista[-1]}")\nprint(f"Tamanho: {len(lista)}")'
            ],
            // Fase 3
            9: [
                'Defina uma função com def nome():',
                'Lembre-se da indentação dentro da função',
                'def saudacao():\n    print("Olá!")\nsaudacao()'
            ],
            10: [
                'Função com parâmetro: def nome(parametro):',
                'Use o parâmetro dentro da função',
                'def saudacao(nome):\n    print(f"Olá, {nome}!")\nsaudacao("Lumi")'
            ],
            11: [
                'Use return para devolver um valor',
                'Atribua o resultado a uma variável',
                'def dobrar(x):\n    return x * 2\nresultado = dobrar(5)\nprint(resultado)'
            ],
            12: [
                'Defina múltiplas funções',
                'Chame cada uma e imprima os resultados',
                'def somar(a, b):\n    return a + b\ndef multiplicar(a, b):\n    return a * b\nprint(somar(3, 5))\nprint(multiplicar(2, 4))'
            ]
        };
    }

    /**
     * Verifica se missão está desbloqueada
     * @param {string} phaseId - ID da fase
     * @param {string} missionId - ID da missão
     * @returns {Promise<boolean>}
     */
    async isMissionUnlocked(phaseId, missionId) {
        // Fase 1 sempre desbloqueada
        if (phaseId === 1) return true;

        // Verificar se fase anterior foi completada
        const previousPhase = phaseId - 1;
        const isPhaseCompleted = await this.storage.isPhaseCompleted(previousPhase);

        return isPhaseCompleted;
    }

    /**
     * Marca missão como completada
     * @param {string} missionId - ID da missão
     * @param {number} creditos - Créditos da missão
     * @returns {Promise<{creditos: number, nextLevel: boolean}>}
     */
    async completeMission(missionId, creditos) {
        await this.storage.completeMission(missionId);
        const newCredits = await this.storage.addCredits(creditos);

        return {
            credits: newCredits,
            nextLevel: false // Será implementado depois
        };
    }

    /**
     * Obtém progresso do usuário
     * @returns {Promise<object>}
     */
    async getProgress() {
        return {
            completedMissions: await this.storage.getCompletedMissions(),
            totalCredits: await this.storage.getCredits(),
            attempts: await this.storage.getAllAttempts()
        };
    }
}

/**
 * LocalStorageManager - Gerencia dados persistentes
 */
class LocalStorageManager {
    constructor() {
        this.prefix = 'pydetetive_';
        this.initStorage();
    }

    /**
     * Inicializa storage se necessário
     * @private
     */
    initStorage() {
        const data = this.get('data');
        if (!data) {
            this.set('data', {
                completedMissions: [],
                credits: 0,
                attempts: {},
                currentPhase: 1,
                completedPhases: []
            });
        }
    }

    /**
     * Salva na storage
     * @private
     */
    set(key, value) {
        try {
            localStorage.setItem(this.prefix + key, JSON.stringify(value));
        } catch (e) {
            console.warn('localStorage cheio:', e);
        }
    }

    /**
     * Recupera da storage
     * @private
     */
    get(key) {
        try {
            const item = localStorage.getItem(this.prefix + key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.warn('Erro ao ler localStorage:', e);
            return null;
        }
    }

    /**
     * Registra tentativa de missão
     */
    async recordAttempt(missionId, passed) {
        const data = this.get('data');

        if (!data.attempts[missionId]) {
            data.attempts[missionId] = { count: 0, passed: false };
        }

        data.attempts[missionId].count++;
        if (passed) {
            data.attempts[missionId].passed = true;
            if (!data.completedMissions.includes(missionId)) {
                data.completedMissions.push(missionId);
            }
        }

        this.set('data', data);
    }

    /**
     * Marca missão como completada
     */
    async completeMission(missionId) {
        const data = this.get('data');
        if (!data.completedMissions.includes(missionId)) {
            data.completedMissions.push(missionId);
        }
        this.set('data', data);
    }

    /**
     * Adiciona créditos
     */
    async addCredits(amount) {
        const data = this.get('data');
        data.credits += amount;
        this.set('data', data);
        return data.credits;
    }

    /**
     * Obtém créditos atuais
     */
    async getCredits() {
        const data = this.get('data');
        return data.credits || 0;
    }

    /**
     * Obtém missões completadas
     */
    async getCompletedMissions() {
        const data = this.get('data');
        return data.completedMissions || [];
    }

    /**
     * Obtém todas as tentativas
     */
    async getAllAttempts() {
        const data = this.get('data');
        return data.attempts || {};
    }

    /**
     * Verifica se fase foi completada
     */
    async isPhaseCompleted(phaseId) {
        // Implementar lógica de qual missão marca fase como completa
        // Por enquanto, simples check
        return false;
    }

    /**
     * Limpa dados (debug)
     */
    clear() {
        try {
            for (let key in localStorage) {
                if (key.startsWith(this.prefix)) {
                    localStorage.removeItem(key);
                }
            }
        } catch (e) {
            console.warn('Erro ao limpar localStorage:', e);
        }
    }
}

// Exportar para uso global
window.MissionValidator = MissionValidator;
window.LocalStorageManager = LocalStorageManager;
