/**
 * Logger - Sistema de logging e console
 * Rastreia eventos, erros e execução de código
 */

class Logger {
    constructor(maxLogs = 500) {
        this.logs = [];
        this.maxLogs = maxLogs;
        this.levels = ['debug', 'info', 'warn', 'error', 'success'];
        this.filters = new Set(this.levels);
        this.initialized = false;
    }

    /**
     * Inicializa o logger
     */
    initialize() {
        if (this.initialized) return;
        this.addStyles();
        this.setupConsoleOverride();
        this.initialized = true;
    }

    /**
     * Adiciona estilos
     */
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .logger-console {
                background: var(--bg-light, #ffffff);
                border: 1px solid var(--border-color, #e0e0e0);
                border-radius: 6px;
                padding: 8px;
                font-family: 'Fira Code', monospace;
                font-size: 11px;
                max-height: 200px;
                overflow-y: auto;
                line-height: 1.4;
            }

            .log-entry {
                padding: 4px 8px;
                margin: 2px 0;
                border-radius: 3px;
                border-left: 3px solid;
                display: flex;
                align-items: flex-start;
                gap: 8px;
            }

            .log-entry.debug {
                border-color: #A0A0A0;
                color: #A0A0A0;
                background: rgba(160, 160, 160, 0.05);
            }

            .log-entry.info {
                border-color: #4ECDC4;
                color: #4ECDC4;
                background: rgba(78, 205, 196, 0.05);
            }

            .log-entry.warn {
                border-color: #FFB700;
                color: #FF9F43;
                background: rgba(255, 183, 0, 0.05);
            }

            .log-entry.error {
                border-color: #FF6B6B;
                color: #FF6B6B;
                background: rgba(255, 107, 107, 0.05);
            }

            .log-entry.success {
                border-color: #6BCF7F;
                color: #6BCF7F;
                background: rgba(107, 207, 127, 0.05);
            }

            .log-icon {
                flex-shrink: 0;
                font-weight: 600;
                min-width: 20px;
            }

            .log-content {
                flex: 1;
                word-break: break-word;
            }

            .log-time {
                font-size: 9px;
                opacity: 0.6;
                flex-shrink: 0;
            }

            .logger-controls {
                display: flex;
                gap: 4px;
                margin-bottom: 8px;
                flex-wrap: wrap;
            }

            .logger-filter {
                padding: 4px 8px;
                border: 1px solid var(--border-color, #e0e0e0);
                background: var(--bg-secondary, #f8f9fa);
                border-radius: 3px;
                cursor: pointer;
                font-size: 11px;
                font-weight: 600;
                transition: all 0.3s ease;
            }

            .logger-filter.active {
                background: #4ECDC4;
                color: white;
                border-color: #4ECDC4;
            }

            .logger-filter:hover {
                border-color: #4ECDC4;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Sobrescreve console global
     */
    setupConsoleOverride() {
        const originalLog = console.log;
        const originalError = console.error;
        const originalWarn = console.warn;

        console.log = (...args) => {
            this.log('info', args.join(' '));
            originalLog.apply(console, args);
        };

        console.error = (...args) => {
            this.log('error', args.join(' '));
            originalError.apply(console, args);
        };

        console.warn = (...args) => {
            this.log('warn', args.join(' '));
            originalWarn.apply(console, args);
        };
    }

    /**
     * Registra mensagem
     */
    log(level, message) {
        const entry = {
            level,
            message: String(message),
            timestamp: new Date(),
            id: Math.random()
        };

        this.logs.push(entry);

        // Manter limite de logs
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }

        // Dispatch evento
        window.dispatchEvent(new CustomEvent('logEntry', { detail: entry }));
    }

    /**
     * Log de debug
     */
    debug(message) {
        this.log('debug', message);
    }

    /**
     * Log de informação
     */
    info(message) {
        this.log('info', message);
    }

    /**
     * Log de aviso
     */
    warn(message) {
        this.log('warn', message);
    }

    /**
     * Log de erro
     */
    error(message) {
        this.log('error', message);
    }

    /**
     * Log de sucesso
     */
    success(message) {
        this.log('success', message);
    }

    /**
     * Filtra logs por nível
     */
    filter(level) {
        if (this.filters.has(level)) {
            this.filters.delete(level);
        } else {
            this.filters.add(level);
        }
    }

    /**
     * Obtém logs filtrados
     */
    getFiltered() {
        return this.logs.filter(log => this.filters.has(log.level));
    }

    /**
     * Limpa todos os logs
     */
    clear() {
        this.logs = [];
    }

    /**
     * Obtém todos os logs
     */
    getAll() {
        return [...this.logs];
    }

    /**
     * Renderiza console
     */
    renderConsole(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Criar controles
        const controls = document.createElement('div');
        controls.className = 'logger-controls';

        this.levels.forEach(level => {
            const btn = document.createElement('button');
            btn.className = `logger-filter ${this.filters.has(level) ? 'active' : ''}`;
            btn.textContent = level.charAt(0).toUpperCase() + level.slice(1);
            btn.addEventListener('click', () => {
                this.filter(level);
                this.renderConsole(containerId);
            });
            controls.appendChild(btn);
        });

        // Botão limpar
        const clearBtn = document.createElement('button');
        clearBtn.className = 'logger-filter';
        clearBtn.textContent = 'Limpar';
        clearBtn.style.marginLeft = 'auto';
        clearBtn.addEventListener('click', () => {
            this.clear();
            this.renderConsole(containerId);
        });
        controls.appendChild(clearBtn);

        // Criar console
        const consoleDiv = document.createElement('div');
        consoleDiv.className = 'logger-console';

        const filtered = this.getFiltered();
        if (filtered.length === 0) {
            consoleDiv.innerHTML = '<div style="color: var(--text-light, #718096); text-align: center; padding: 16px;">Nenhum log</div>';
        } else {
            filtered.forEach(log => {
                const entry = document.createElement('div');
                entry.className = `log-entry ${log.level}`;

                const icons = {
                    debug: '🔍',
                    info: 'ℹ️',
                    warn: '⚠️',
                    error: '❌',
                    success: '✓'
                };

                const time = log.timestamp.toLocaleTimeString('pt-BR');

                entry.innerHTML = `
                    <span class="log-icon">${icons[log.level]}</span>
                    <span class="log-content">${log.message}</span>
                    <span class="log-time">${time}</span>
                `;
                consoleDiv.appendChild(entry);
            });

            // Auto-scroll para baixo
            consoleDiv.scrollTop = consoleDiv.scrollHeight;
        }

        container.innerHTML = '';
        container.appendChild(controls);
        container.appendChild(consoleDiv);
    }

    /**
     * Exporta logs como JSON
     */
    export() {
        const data = JSON.stringify(this.logs, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `logs-${Date.now()}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }

    /**
     * Obtém contagem de logs por tipo
     */
    getStats() {
        const stats = {};
        this.levels.forEach(level => {
            stats[level] = this.logs.filter(log => log.level === level).length;
        });
        return stats;
    }
}

// Create global instance
const logger = new Logger();
window.Logger = Logger;
window.logger = logger;
