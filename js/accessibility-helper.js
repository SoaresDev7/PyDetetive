/**
 * Accessibility Helper - Utilitários de acessibilidade
 * Melhora usabilidade para usuários com necessidades especiais
 */

class AccessibilityHelper {
    constructor() {
        this.settings = {
            highContrast: false,
            fontSize: 'normal',
            reduceMotion: false,
            enableScreenReader: false,
            focusIndicator: true
        };
        this.initialized = false;
    }

    /**
     * Inicializa helper
     */
    initialize() {
        if (this.initialized) return;
        this.loadSettings();
        this.addStyles();
        this.detectSystemPreferences();
        this.initialized = true;
    }

    /**
     * Adiciona estilos de acessibilidade
     */
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            body.high-contrast {
                --bg-light: #000000;
                --bg-secondary: #1a1a1a;
                --text-dark: #ffffff;
                --text-light: #cccccc;
                --border-color: #ffffff;
            }

            body.font-large {
                font-size: 16px;
            }

            body.font-xlarge {
                font-size: 18px;
            }

            body.reduce-motion * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }

            *:focus-visible {
                outline: 3px solid #4ECDC4;
                outline-offset: 2px;
            }

            .sr-only {
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                white-space: nowrap;
                border-width: 0;
            }

            .accessibility-menu {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: var(--bg-light, #ffffff);
                border: 2px solid #4ECDC4;
                border-radius: 8px;
                padding: 12px;
                z-index: 5000;
                min-width: 200px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }

            .accessibility-menu h3 {
                margin: 0 0 8px;
                color: #4ECDC4;
                font-size: 13px;
                font-weight: 700;
            }

            .accessibility-option {
                display: flex;
                align-items: center;
                gap: 8px;
                margin: 8px 0;
                padding: 6px;
                border-radius: 4px;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .accessibility-option:hover {
                background: var(--bg-secondary, #f8f9fa);
            }

            .accessibility-option input[type="checkbox"] {
                cursor: pointer;
                width: 18px;
                height: 18px;
            }

            .accessibility-option label {
                flex: 1;
                margin: 0;
                cursor: pointer;
                font-size: 12px;
                color: var(--text-dark, #2d3748);
            }

            .accessibility-option select {
                padding: 4px 8px;
                border: 1px solid var(--border-color, #e0e0e0);
                border-radius: 4px;
                font-size: 11px;
                background: var(--bg-secondary, #f8f9fa);
                color: var(--text-dark, #2d3748);
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Detecta preferências do sistema
     */
    detectSystemPreferences() {
        // Detectar preferência de redução de movimento
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.settings.reduceMotion = true;
            this.applyReduceMotion();
        }

        // Detectar preferência de alto contraste
        if (window.matchMedia && window.matchMedia('(prefers-contrast: more)').matches) {
            this.settings.highContrast = true;
            this.applyHighContrast();
        }
    }

    /**
     * Aplica alto contraste
     */
    applyHighContrast() {
        if (this.settings.highContrast) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }
        this.saveSettings();
    }

    /**
     * Aplica redução de movimento
     */
    applyReduceMotion() {
        if (this.settings.reduceMotion) {
            document.body.classList.add('reduce-motion');
        } else {
            document.body.classList.remove('reduce-motion');
        }
        this.saveSettings();
    }

    /**
     * Aplica tamanho de fonte
     */
    setFontSize(size) {
        document.body.classList.remove('font-large', 'font-xlarge');
        this.settings.fontSize = size;

        if (size === 'large') {
            document.body.classList.add('font-large');
        } else if (size === 'xlarge') {
            document.body.classList.add('font-xlarge');
        }

        this.saveSettings();
    }

    /**
     * Toggle de alto contraste
     */
    toggleHighContrast() {
        this.settings.highContrast = !this.settings.highContrast;
        this.applyHighContrast();
    }

    /**
     * Toggle de redução de movimento
     */
    toggleReduceMotion() {
        this.settings.reduceMotion = !this.settings.reduceMotion;
        this.applyReduceMotion();
    }

    /**
     * Adiciona texto para screen readers
     */
    addScreenReaderText(element, text) {
        const sr = document.createElement('span');
        sr.className = 'sr-only';
        sr.textContent = text;
        element.appendChild(sr);
    }

    /**
     * Melhora label associations
     */
    improveFormAccessibility(formElement) {
        const inputs = formElement.querySelectorAll('input, textarea, select');
        inputs.forEach((input, index) => {
            if (!input.id) {
                input.id = `input-${index}`;
            }

            const label = formElement.querySelector(`label[for="${input.id}"]`);
            if (!label) {
                const newLabel = document.createElement('label');
                newLabel.htmlFor = input.id;
                newLabel.textContent = input.placeholder || `Campo ${index + 1}`;
                input.before(newLabel);
            }
        });
    }

    /**
     * Renderiza menu de acessibilidade
     */
    renderAccessibilityMenu(containerId = null) {
        const menuHTML = `
            <div class="accessibility-menu">
                <h3>♿ Acessibilidade</h3>

                <div class="accessibility-option">
                    <input type="checkbox" id="high-contrast" ${this.settings.highContrast ? 'checked' : ''}>
                    <label for="high-contrast">Alto Contraste</label>
                </div>

                <div class="accessibility-option">
                    <input type="checkbox" id="reduce-motion" ${this.settings.reduceMotion ? 'checked' : ''}>
                    <label for="reduce-motion">Reduzir Movimento</label>
                </div>

                <div class="accessibility-option">
                    <label for="font-size">Tamanho da Fonte:</label>
                    <select id="font-size">
                        <option value="normal" ${this.settings.fontSize === 'normal' ? 'selected' : ''}>Normal</option>
                        <option value="large" ${this.settings.fontSize === 'large' ? 'selected' : ''}>Maior</option>
                        <option value="xlarge" ${this.settings.fontSize === 'xlarge' ? 'selected' : ''}>Muito Grande</option>
                    </select>
                </div>
            </div>
        `;

        if (containerId) {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = menuHTML;
                this.setupEventListeners(container);
            }
        } else {
            document.body.insertAdjacentHTML('beforeend', menuHTML);
            this.setupEventListeners(document.body);
        }
    }

    /**
     * Configura event listeners do menu
     */
    setupEventListeners(container) {
        const highContrastCheckbox = container.querySelector('#high-contrast');
        const reduceMotionCheckbox = container.querySelector('#reduce-motion');
        const fontSizeSelect = container.querySelector('#font-size');

        if (highContrastCheckbox) {
            highContrastCheckbox.addEventListener('change', () => this.toggleHighContrast());
        }

        if (reduceMotionCheckbox) {
            reduceMotionCheckbox.addEventListener('change', () => this.toggleReduceMotion());
        }

        if (fontSizeSelect) {
            fontSizeSelect.addEventListener('change', (e) => this.setFontSize(e.target.value));
        }
    }

    /**
     * Salva settings
     */
    saveSettings() {
        localStorage.setItem('pydetetive_accessibility', JSON.stringify(this.settings));
    }

    /**
     * Carrega settings
     */
    loadSettings() {
        const saved = localStorage.getItem('pydetetive_accessibility');
        if (saved) {
            this.settings = { ...this.settings, ...JSON.parse(saved) };
            this.applyHighContrast();
            this.applyReduceMotion();
            this.setFontSize(this.settings.fontSize);
        }
    }

    /**
     * Reseta para padrão
     */
    reset() {
        this.settings = {
            highContrast: false,
            fontSize: 'normal',
            reduceMotion: false,
            enableScreenReader: false,
            focusIndicator: true
        };
        this.saveSettings();
        this.applyHighContrast();
        this.applyReduceMotion();
        this.setFontSize('normal');
    }
}

// Create global instance
const accessibilityHelper = new AccessibilityHelper();
window.AccessibilityHelper = AccessibilityHelper;
window.accessibilityHelper = accessibilityHelper;
