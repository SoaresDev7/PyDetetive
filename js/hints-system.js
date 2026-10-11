/**
 * Hints System - Sistema de dicas progressivas para missões
 * Oferece ajuda contextual sem spoilar a solução
 */

class HintsSystem {
    constructor() {
        this.hints = new Map();
        this.usedHints = new Map();
        this.initialized = false;
        this.initializeDefaultHints();
    }

    /**
     * Inicializa dicas padrão para cada missão
     */
    initializeDefaultHints() {
        // Fase 1 - Conceitos Básicos
        this.addHints(1, 1, [
            '💡 Comece simples. Use o comando print() para exibir uma mensagem.',
            '💡 A sintaxe é: print("sua mensagem aqui")',
            '💡 Não esqueça das aspas duplas ao redor do texto!'
        ]);

        this.addHints(1, 2, [
            '💡 Uma variável guarda um valor em um "container".',
            '💡 Use a sintaxe: nome_variavel = valor',
            '💡 Depois use print() para exibir a variável sem aspas'
        ]);

        this.addHints(1, 3, [
            '💡 Operações matemáticas funcionam como na calculadora.',
            '💡 Use + para somar, - para subtrair, * para multiplicar',
            '💡 Guarde o resultado em uma variável antes de exibir'
        ]);

        this.addHints(1, 4, [
            '💡 Condições verificam se algo é verdadeiro ou falso.',
            '💡 Use if para código que roda apenas em certas situações',
            '💡 Lembre da indentação (4 espaços) dentro do if!'
        ]);

        // Fase 2 - Estruturas Intermediárias
        this.addHints(2, 1, [
            '💡 Loops repetem código múltiplas vezes.',
            '💡 Use for i in range(número) para contar',
            '💡 Lembre que range(5) vai de 0 a 4, não até 5!'
        ]);

        this.addHints(2, 2, [
            '💡 Listas guardam múltiplos valores separados por vírgula.',
            '💡 Sintaxe: minha_lista = [valor1, valor2, valor3]',
            '💡 Acesse cada item usando índices: minha_lista[0]'
        ]);

        this.addHints(2, 3, [
            '💡 Funções são blocos de código reutilizáveis.',
            '💡 Defina com: def minha_funcao():\\n    código',
            '💡 Execute a função chamando: minha_funcao()'
        ]);

        this.addHints(2, 4, [
            '💡 Combine loops e listas para processar múltiplos dados.',
            '💡 Use for item in lista: para iterar sobre cada elemento',
            '💡 Procure reconhecer o padrão do código esperado'
        ]);

        // Fase 3 - Conceitos Avançados
        this.addHints(3, 1, [
            '💡 Strings podem ser divididas em caracteres.',
            '💡 Use indexação para acessar partes da string',
            '💡 len(string) retorna o comprimento'
        ]);

        this.addHints(3, 2, [
            '💡 Dicionários associam chaves a valores.',
            '💡 Sintaxe: meu_dict = {"chave": valor}',
            '💡 Acesse com: meu_dict["chave"]'
        ]);

        this.addHints(3, 3, [
            '💡 Excepções lidam com erros graciosamente.',
            '💡 Use try: para código que pode gerar erro',
            '💡 Use except: para tratar o erro'
        ]);

        this.addHints(3, 4, [
            '💡 Agora você tem todos os conceitos!',
            '💡 Revise o que você aprendeu em todas as fases',
            '💡 Pense logicamente e decomponha o problema'
        ]);
    }

    /**
     * Inicializa estilos
     */
    initialize() {
        if (this.initialized) return;
        this.addStyles();
        this.initialized = true;
    }

    /**
     * Adiciona estilos para o sistema de dicas
     */
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .hints-container {
                background: var(--bg-secondary, #f8f9fa);
                border: 2px solid #FFB700;
                border-radius: 8px;
                padding: 12px;
                margin: 12px 0;
            }

            .hint-level {
                padding: 8px 12px;
                margin: 6px 0;
                background: linear-gradient(135deg, #FFEB3B 0%, #FFC107 100%);
                color: #2D3748;
                border-radius: 6px;
                font-size: 13px;
                line-height: 1.5;
                cursor: pointer;
                transition: all 0.3s ease;
                animation: slideInHint 0.3s ease-out;
            }

            @keyframes slideInHint {
                from {
                    opacity: 0;
                    transform: translateX(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            .hint-level:hover {
                transform: translateX(4px);
                box-shadow: 0 4px 12px rgba(255, 183, 0, 0.3);
            }

            .hint-level.revealed {
                background: linear-gradient(135deg, #FFF9C4 0%, #FFE082 100%);
            }

            .hint-level.locked {
                opacity: 0.6;
                cursor: not-allowed;
                background: var(--bg-light, #ffffff);
                color: var(--text-light, #718096);
                border: 1px solid var(--border-color, #e0e0e0);
            }

            .hint-level.locked::before {
                content: '🔒 ';
            }

            .hint-content {
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.3s ease;
            }

            .hint-content.revealed {
                max-height: 200px;
            }

            .hint-counter {
                display: inline-block;
                margin-left: auto;
                font-size: 11px;
                background: rgba(255, 255, 255, 0.5);
                padding: 2px 6px;
                border-radius: 3px;
            }

            .hint-button {
                background: linear-gradient(135deg, #FFB700 0%, #FF9F43 100%);
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 13px;
            }

            .hint-button:hover:not(:disabled) {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(255, 183, 0, 0.3);
            }

            .hint-button:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }

            .hint-badge {
                display: inline-block;
                background: rgba(255, 183, 0, 0.2);
                border: 1px solid #FFB700;
                color: #FFB700;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 11px;
                font-weight: 600;
                margin-left: 8px;
            }

            .hint-info {
                font-size: 12px;
                color: var(--text-light, #718096);
                margin-top: 8px;
                padding-top: 8px;
                border-top: 1px solid var(--border-color, #e0e0e0);
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Adiciona dicas para uma missão
     */
    addHints(phaseId, missionId, hintList) {
        const key = `${phaseId}-${missionId}`;
        this.hints.set(key, hintList);
        this.usedHints.set(key, []);
    }

    /**
     * Obtém próxima dica
     */
    getNextHint(phaseId, missionId) {
        const key = `${phaseId}-${missionId}`;
        const hints = this.hints.get(key);
        const used = this.usedHints.get(key) || [];

        if (!hints || used.length >= hints.length) {
            return null; // Sem mais dicas
        }

        const hint = hints[used.length];
        used.push(hint);
        this.usedHints.set(key, used);

        return hint;
    }

    /**
     * Obtém todas as dicas de uma missão
     */
    getAllHints(phaseId, missionId) {
        const key = `${phaseId}-${missionId}`;
        return this.hints.get(key) || [];
    }

    /**
     * Obtém dicas já usadas
     */
    getUsedHints(phaseId, missionId) {
        const key = `${phaseId}-${missionId}`;
        return this.usedHints.get(key) || [];
    }

    /**
     * Conta quantas dicas foram usadas
     */
    getHintCount(phaseId, missionId) {
        const key = `${phaseId}-${missionId}`;
        return this.getUsedHints(phaseId, missionId).length;
    }

    /**
     * Verifica se pode pedir mais dicas
     */
    canGetHint(phaseId, missionId) {
        const key = `${phaseId}-${missionId}`;
        const hints = this.hints.get(key);
        const used = this.usedHints.get(key) || [];
        return hints && used.length < hints.length;
    }

    /**
     * Renderiza container de dicas
     */
    renderHints(containerId, phaseId, missionId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';
        const hints = this.getAllHints(phaseId, missionId);
        const used = this.getUsedHints(phaseId, missionId);

        if (hints.length === 0) return;

        const hintsDiv = document.createElement('div');
        hintsDiv.className = 'hints-container';

        hints.forEach((hint, index) => {
            const level = document.createElement('div');
            level.className = `hint-level ${index < used.length ? 'revealed' : index > used.length ? 'locked' : ''}`;

            level.innerHTML = `<span>💡 Dica ${index + 1}</span><span class="hint-counter">${index + 1}/${hints.length}</span>`;

            if (index < used.length) {
                const content = document.createElement('div');
                content.className = 'hint-content revealed';
                content.textContent = hint;
                level.appendChild(content);
            }

            level.addEventListener('click', () => {
                if (index === used.length && this.canGetHint(phaseId, missionId)) {
                    this.getNextHint(phaseId, missionId);
                    this.renderHints(containerId, phaseId, missionId);
                    this.playHintSound();
                }
            });

            hintsDiv.appendChild(level);
        });

        container.appendChild(hintsDiv);
    }

    /**
     * Renderiza botão de dica
     */
    renderHintButton(buttonId, phaseId, missionId, callback) {
        const button = document.getElementById(buttonId);
        if (!button) return;

        const canGetHint = this.canGetHint(phaseId, missionId);
        button.disabled = !canGetHint;
        button.textContent = canGetHint ? '💡 Pedir Dica' : '✓ Sem mais dicas';

        button.addEventListener('click', () => {
            if (canGetHint) {
                const hint = this.getNextHint(phaseId, missionId);
                if (hint && callback) {
                    callback(hint);
                }
            }
        });
    }

    /**
     * Toca som ao revelar dica
     */
    playHintSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.setValueAtTime(1046, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(1046, audioContext.currentTime + 0.1);

            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0, audioContext.currentTime + 0.1);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            // Silent fail
        }
    }

    /**
     * Reseta dicas de uma missão
     */
    resetMissionHints(phaseId, missionId) {
        const key = `${phaseId}-${missionId}`;
        this.usedHints.set(key, []);
    }

    /**
     * Reseta todas as dicas
     */
    resetAllHints() {
        this.usedHints.forEach((val, key) => {
            this.usedHints.set(key, []);
        });
    }
}

// Create global instance
const hintsSystem = new HintsSystem();
window.HintsSystem = HintsSystem;
window.hintsSystem = hintsSystem;
