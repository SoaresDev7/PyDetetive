/**
 * Keyboard Shortcuts - Sistema de atalhos de teclado
 * Gerencia atalhos customizáveis para o jogo
 */

class KeyboardShortcuts {
    constructor() {
        this.shortcuts = new Map();
        this.enabled = true;
        this.initialized = false;
        this.initializeDefaultShortcuts();
    }

    /**
     * Inicializa atalhos padrão
     */
    initializeDefaultShortcuts() {
        // Controles gerais
        this.registerShortcut('Escape', 'pauseGame', 'Pausa o jogo');
        this.registerShortcut('Enter', 'executeCode', 'Executa o código');
        this.registerShortcut('Ctrl+S', 'saveProgress', 'Salva progresso');
        this.registerShortcut('Ctrl+H', 'showHelp', 'Mostra ajuda');
        this.registerShortcut('Alt+T', 'toggleTheme', 'Alterna tema');

        // Navegação
        this.registerShortcut('ArrowRight', 'nextMission', 'Próxima missão');
        this.registerShortcut('ArrowLeft', 'previousMission', 'Missão anterior');
        this.registerShortcut('ArrowUp', 'nextPhase', 'Próxima fase');
        this.registerShortcut('ArrowDown', 'previousPhase', 'Fase anterior');

        // Editor
        this.registerShortcut('Ctrl+A', 'selectAll', 'Seleciona tudo');
        this.registerShortcut('Ctrl+Z', 'undo', 'Desfaz');
        this.registerShortcut('Ctrl+Y', 'redo', 'Refaz');
        this.registerShortcut('Tab', 'indent', 'Indenta');

        // Debug
        this.registerShortcut('Ctrl+L', 'clearConsole', 'Limpa console');
        this.registerShortcut('F12', 'toggleDevTools', 'Abre ferramentas do desenvolvedor');
    }

    /**
     * Inicializa o sistema
     */
    initialize() {
        if (this.initialized) return;
        this.setupEventListener();
        this.showShortcutsGuide();
        this.initialized = true;
    }

    /**
     * Registra um atalho
     */
    registerShortcut(keys, action, description = '') {
        this.shortcuts.set(keys.toUpperCase(), {
            action,
            description,
            handler: null,
            enabled: true
        });
    }

    /**
     * Define handler para um atalho
     */
    onShortcut(keys, handler) {
        const key = keys.toUpperCase();
        if (this.shortcuts.has(key)) {
            const shortcut = this.shortcuts.get(key);
            shortcut.handler = handler;
        }
    }

    /**
     * Configura event listener global
     */
    setupEventListener() {
        document.addEventListener('keydown', (e) => {
            if (!this.enabled) return;

            const keyCombo = this.getKeyCombo(e);
            const shortcut = this.shortcuts.get(keyCombo);

            if (shortcut && shortcut.enabled && shortcut.handler) {
                e.preventDefault();
                shortcut.handler();
            }
        });
    }

    /**
     * Obtém combinação de teclas
     */
    getKeyCombo(event) {
        const parts = [];

        if (event.ctrlKey || event.metaKey) parts.push('Ctrl');
        if (event.shiftKey) parts.push('Shift');
        if (event.altKey) parts.push('Alt');

        const key = event.key.toUpperCase();
        if (!['Control', 'Shift', 'Alt', 'Meta'].includes(event.key)) {
            parts.push(key);
        }

        return parts.join('+');
    }

    /**
     * Habilita atalho
     */
    enableShortcut(keys) {
        const shortcut = this.shortcuts.get(keys.toUpperCase());
        if (shortcut) shortcut.enabled = true;
    }

    /**
     * Desabilita atalho
     */
    disableShortcut(keys) {
        const shortcut = this.shortcuts.get(keys.toUpperCase());
        if (shortcut) shortcut.enabled = false;
    }

    /**
     * Ativa/desativa todos os atalhos
     */
    setEnabled(enabled) {
        this.enabled = enabled;
    }

    /**
     * Obtém todos os atalhos
     */
    getAll() {
        return Array.from(this.shortcuts.entries()).map(([keys, data]) => ({
            keys,
            ...data
        }));
    }

    /**
     * Mostra guia de atalhos
     */
    showShortcutsGuide() {
        const style = document.createElement('style');
        style.textContent = `
            .shortcuts-modal {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                border: 3px solid #4ECDC4;
                border-radius: 12px;
                padding: 24px;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                z-index: 3000;
                display: none;
            }

            .shortcuts-modal.active {
                display: block;
                animation: modalSlideIn 0.3s ease-out;
            }

            .shortcuts-modal h2 {
                color: #4ECDC4;
                margin: 0 0 16px;
            }

            .shortcut-group {
                margin-bottom: 16px;
            }

            .shortcut-group h3 {
                font-size: 12px;
                color: var(--text-light, #718096);
                text-transform: uppercase;
                letter-spacing: 1px;
                margin: 12px 0 8px;
                border-bottom: 1px solid var(--border-color, #e0e0e0);
                padding-bottom: 4px;
            }

            .shortcut-row {
                display: flex;
                justify-content: space-between;
                padding: 6px 0;
                font-size: 13px;
            }

            .shortcut-key {
                font-family: 'Fira Code', monospace;
                background: var(--bg-secondary, #f8f9fa);
                padding: 4px 8px;
                border-radius: 4px;
                font-weight: 600;
                color: #4ECDC4;
                min-width: 80px;
            }

            .shortcut-action {
                color: var(--text-dark, #2d3748);
                text-align: right;
            }

            .shortcuts-backdrop {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                z-index: 2999;
                display: none;
            }

            .shortcuts-backdrop.active {
                display: block;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Abre modal de atalhos
     */
    openShortcutsModal() {
        let modal = document.querySelector('.shortcuts-modal');
        let backdrop = document.querySelector('.shortcuts-backdrop');

        if (!modal) {
            // Criar backdrop
            backdrop = document.createElement('div');
            backdrop.className = 'shortcuts-backdrop';
            document.body.appendChild(backdrop);

            // Criar modal
            modal = document.createElement('div');
            modal.className = 'shortcuts-modal';

            const content = this.generateShortcutsHTML();
            modal.innerHTML = content;

            document.body.appendChild(modal);

            // Event listeners
            const closeBtn = modal.querySelector('[data-close]');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.closeShortcutsModal());
            }

            backdrop.addEventListener('click', () => this.closeShortcutsModal());
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') this.closeShortcutsModal();
            });
        }

        modal.classList.add('active');
        backdrop.classList.add('active');
    }

    /**
     * Fecha modal de atalhos
     */
    closeShortcutsModal() {
        const modal = document.querySelector('.shortcuts-modal');
        const backdrop = document.querySelector('.shortcuts-backdrop');

        if (modal) modal.classList.remove('active');
        if (backdrop) backdrop.classList.remove('active');
    }

    /**
     * Gera HTML do modal de atalhos
     */
    generateShortcutsHTML() {
        const groups = {
            'Controles Gerais': ['Escape', 'Enter', 'Ctrl+S', 'Ctrl+H', 'Alt+T'],
            'Navegação': ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'],
            'Editor': ['Ctrl+A', 'Ctrl+Z', 'Ctrl+Y', 'Tab'],
            'Debug': ['Ctrl+L', 'F12']
        };

        let html = `
            <h2>⌨️ Atalhos de Teclado</h2>
            <p style="color: var(--text-light, #718096); font-size: 12px; margin-bottom: 16px;">
                Use estes atalhos para navegar e controlar o jogo rapidamente
            </p>
        `;

        Object.entries(groups).forEach(([group, keys]) => {
            html += `<div class="shortcut-group"><h3>${group}</h3>`;

            keys.forEach(keyCombo => {
                const shortcut = this.shortcuts.get(keyCombo);
                if (shortcut) {
                    html += `
                        <div class="shortcut-row">
                            <span class="shortcut-key">${keyCombo}</span>
                            <span class="shortcut-action">${shortcut.description}</span>
                        </div>
                    `;
                }
            });

            html += '</div>';
        });

        html += `
            <div style="margin-top: 16px; text-align: right;">
                <button data-close style="
                    background: #4ECDC4;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 6px;
                    font-weight: 600;
                    cursor: pointer;
                ">Fechar</button>
            </div>
        `;

        return html;
    }

    /**
     * Reseta atalhos aos padrões
     */
    resetToDefaults() {
        this.shortcuts.clear();
        this.initializeDefaultShortcuts();
    }
}

// Create global instance
const keyboardShortcuts = new KeyboardShortcuts();
window.KeyboardShortcuts = KeyboardShortcuts;
window.keyboardShortcuts = keyboardShortcuts;
