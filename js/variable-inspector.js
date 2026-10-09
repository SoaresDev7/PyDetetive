/**
 * Variable Inspector - Visualização interativa de variáveis
 * Mostra o estado das variáveis com animações e efeitos
 */

class VariableInspector {
    constructor() {
        this.variables = new Map();
        this.watches = new Map();
        this.initialized = false;
    }

    /**
     * Inicializa o sistema de inspeção de variáveis
     */
    initialize() {
        if (this.initialized) return;
        this.addStyles();
        this.initialized = true;
    }

    /**
     * Adiciona estilos para o inspetor
     */
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .variable-inspector {
                background: var(--bg-secondary, #f8f9fa);
                border: 2px solid var(--border-color, #e0e0e0);
                border-radius: 8px;
                padding: 12px;
                margin: 8px 0;
                font-family: 'Fira Code', monospace;
                font-size: 13px;
            }

            .variable-item {
                padding: 8px 12px;
                margin: 4px 0;
                background: var(--bg-light, #ffffff);
                border-left: 4px solid #4ECDC4;
                border-radius: 4px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: all 0.3s ease;
                animation: slideInVariable 0.3s ease-out;
            }

            @keyframes slideInVariable {
                from {
                    opacity: 0;
                    transform: translateX(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            .variable-item:hover {
                background: rgba(78, 205, 196, 0.05);
                box-shadow: 0 2px 8px rgba(78, 205, 196, 0.2);
            }

            .variable-name {
                font-weight: 600;
                color: var(--text-dark, #2d3748);
                min-width: 120px;
            }

            .variable-separator {
                color: var(--text-light, #718096);
                margin: 0 8px;
            }

            .variable-value {
                color: var(--text-dark, #2d3748);
                word-break: break-all;
                flex: 1;
                text-align: right;
            }

            .variable-type {
                font-size: 11px;
                color: var(--text-light, #718096);
                background: var(--bg-secondary, #f8f9fa);
                padding: 2px 6px;
                border-radius: 3px;
                margin-left: 8px;
            }

            .variable-item.modified {
                border-left-color: #FF6B6B;
                animation: pulse 0.6s ease;
            }

            @keyframes pulse {
                0%, 100% {
                    box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.4);
                }
                50% {
                    box-shadow: 0 0 0 8px rgba(255, 107, 107, 0);
                }
            }

            .variable-item.integer .variable-value {
                color: #FF6B6B;
            }

            .variable-item.float .variable-value {
                color: #FF9F43;
            }

            .variable-item.string .variable-value {
                color: #6BCF7F;
            }

            .variable-item.list .variable-value {
                color: #4ECDC4;
            }

            .variable-item.dict .variable-value {
                color: #A29BFE;
            }

            .variable-item.bool .variable-value {
                color: #00D2FC;
            }

            .variable-item.none .variable-value {
                color: var(--text-light, #718096);
                font-style: italic;
            }

            .variables-empty {
                color: var(--text-light, #718096);
                font-style: italic;
                padding: 16px;
                text-align: center;
            }

            .variable-history {
                font-size: 11px;
                color: var(--text-light, #718096);
                margin-top: 4px;
                padding-top: 4px;
                border-top: 1px solid var(--border-color, #e0e0e0);
                max-height: 40px;
                overflow: hidden;
            }

            .variable-change {
                display: inline-block;
                margin-right: 8px;
                padding: 2px 4px;
                background: var(--bg-secondary, #f8f9fa);
                border-radius: 2px;
            }

            .watch-expression {
                background: var(--bg-secondary, #f8f9fa);
                padding: 8px 12px;
                border-radius: 4px;
                margin: 4px 0;
                font-size: 12px;
                border-left: 4px solid #FFB700;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .watch-expression .expression {
                color: var(--text-dark, #2d3748);
                font-weight: 600;
            }

            .watch-expression .result {
                color: var(--text-dark, #2d3748);
                background: var(--bg-light, #ffffff);
                padding: 2px 8px;
                border-radius: 3px;
                margin-left: 8px;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Atualiza variável e mostra animação
     */
    updateVariable(name, value, type = null) {
        const oldValue = this.variables.get(name);
        this.variables.set(name, value);

        if (!type) {
            type = this.inferType(value);
        }

        // Armazenar histórico
        if (!this.watches.has(name)) {
            this.watches.set(name, {
                value: value,
                type: type,
                history: [value],
                lastUpdated: Date.now()
            });
        } else {
            const watch = this.watches.get(name);
            watch.value = value;
            watch.type = type;
            watch.history.push(value);
            if (watch.history.length > 5) {
                watch.history.shift();
            }
            watch.lastUpdated = Date.now();
        }

        return oldValue !== value;
    }

    /**
     * Infere o tipo de uma variável
     */
    inferType(value) {
        if (typeof value === 'number') {
            return Number.isInteger(value) ? 'integer' : 'float';
        } else if (typeof value === 'string') {
            return 'string';
        } else if (Array.isArray(value)) {
            return 'list';
        } else if (typeof value === 'object' && value !== null) {
            return 'dict';
        } else if (typeof value === 'boolean') {
            return 'bool';
        }
        return 'none';
    }

    /**
     * Formata valor para exibição
     */
    formatValue(value) {
        if (typeof value === 'string') {
            return `"${value}"`;
        } else if (Array.isArray(value)) {
            return `[${value.join(', ')}]`;
        } else if (typeof value === 'object' && value !== null) {
            const pairs = Object.entries(value).map(([k, v]) => `${k}: ${v}`);
            return `{${pairs.join(', ')}}`;
        }
        return String(value);
    }

    /**
     * Renderiza inspetor de variáveis
     */
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';

        if (this.variables.size === 0) {
            container.innerHTML = '<div class="variables-empty">Nenhuma variável ainda...</div>';
            return;
        }

        const inspector = document.createElement('div');
        inspector.className = 'variable-inspector';

        this.variables.forEach((value, name) => {
            const watch = this.watches.get(name);
            const type = watch ? watch.type : this.inferType(value);
            const isModified = watch && watch.history.length > 1;

            const item = document.createElement('div');
            item.className = `variable-item ${isModified ? 'modified' : ''} ${type}`;

            const content = document.createElement('div');
            content.style.display = 'flex';
            content.style.flex = '1';
            content.style.alignItems = 'center';

            const name_el = document.createElement('div');
            name_el.className = 'variable-name';
            name_el.textContent = name;

            const sep = document.createElement('div');
            sep.className = 'variable-separator';
            sep.textContent = '=';

            const value_el = document.createElement('div');
            value_el.className = 'variable-value';
            value_el.textContent = this.formatValue(value);

            const type_el = document.createElement('div');
            type_el.className = 'variable-type';
            type_el.textContent = type;

            content.appendChild(name_el);
            content.appendChild(sep);
            content.appendChild(value_el);
            content.appendChild(type_el);

            item.appendChild(content);

            // Adicionar histórico se houver
            if (isModified && watch && watch.history.length > 1) {
                const history = document.createElement('div');
                history.className = 'variable-history';
                watch.history.slice(-3).forEach(val => {
                    const change = document.createElement('span');
                    change.className = 'variable-change';
                    change.textContent = this.formatValue(val);
                    history.appendChild(change);
                });
                item.appendChild(history);
            }

            inspector.appendChild(item);
        });

        container.appendChild(inspector);
    }

    /**
     * Limpa todas as variáveis
     */
    clear() {
        this.variables.clear();
        this.watches.clear();
    }

    /**
     * Obtém todas as variáveis
     */
    getVariables() {
        return Object.fromEntries(this.variables);
    }

    /**
     * Obtém informações detalhadas de uma variável
     */
    getVariableInfo(name) {
        if (!this.watches.has(name)) return null;
        return this.watches.get(name);
    }
}

// Create global instance
const variableInspector = new VariableInspector();
window.VariableInspector = VariableInspector;
window.variableInspector = variableInspector;
