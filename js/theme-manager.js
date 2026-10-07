/**
 * Theme Manager - Gerencia temas claro/escuro com persistência
 * Suporta media queries e preferências do usuário
 */

class ThemeManager {
    constructor() {
        this.themes = {
            light: {
                name: 'light',
                label: 'Claro',
                icon: '🌙',
                colors: {
                    'bg-light': '#FFFFFF',
                    'bg-secondary': '#F8F9FA',
                    'text-dark': '#2D3748',
                    'text-light': '#718096',
                    'border-color': '#E0E0E0'
                }
            },
            dark: {
                name: 'dark',
                label: 'Escuro',
                icon: '☀️',
                colors: {
                    'bg-light': '#1A1A1A',
                    'bg-secondary': '#2D2D2D',
                    'text-dark': '#E0E0E0',
                    'text-light': '#A0A0A0',
                    'border-color': '#404040'
                }
            }
        };

        this.currentTheme = this.loadTheme();
        this.initializeTheme();
        this.setupEventListeners();
    }

    /**
     * Carrega tema salvo ou detecta preferência
     */
    loadTheme() {
        // Verificar localStorage
        const saved = localStorage.getItem('pydetetive_theme');
        if (saved && this.themes[saved]) {
            return saved;
        }

        // Detectar preferência do SO
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        return 'light';
    }

    /**
     * Inicializa tema
     */
    initializeTheme() {
        this.applyTheme(this.currentTheme);
        this.updateThemeButton();
    }

    /**
     * Aplica tema ao documento
     */
    applyTheme(themeName) {
        const theme = this.themes[themeName];
        if (!theme) return;

        const root = document.documentElement;
        root.setAttribute('data-theme', themeName);

        // Aplicar cores CSS
        Object.entries(theme.colors).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });

        // Salvar preferência
        localStorage.setItem('pydetetive_theme', themeName);
        this.currentTheme = themeName;

        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: themeName } }));
    }

    /**
     * Alterna entre temas
     */
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        this.updateThemeButton();
    }

    /**
     * Atualiza botão de tema
     */
    updateThemeButton() {
        const btn = document.getElementById('themeToggleBtn');
        if (!btn) return;

        const nextTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        const icon = this.themes[nextTheme].icon;
        btn.textContent = `${icon} Tema`;
    }

    /**
     * Configura event listeners
     */
    setupEventListeners() {
        const btn = document.getElementById('themeToggleBtn');
        if (btn) {
            btn.addEventListener('click', () => this.toggleTheme());
        }

        // Detectar mudança de preferência do SO
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem('pydetetive_theme')) {
                    this.applyTheme(e.matches ? 'dark' : 'light');
                    this.updateThemeButton();
                }
            });
        }
    }

    /**
     * Retorna tema atual
     */
    getTheme() {
        return this.currentTheme;
    }

    /**
     * Retorna cor de um tema
     */
    getColor(colorName, theme = this.currentTheme) {
        const themeObj = this.themes[theme];
        if (!themeObj) return null;
        return themeObj.colors[colorName] || null;
    }

    /**
     * Aplica transição suave ao mudar tema
     */
    setTransitionDuration(duration = '300ms') {
        document.documentElement.style.transition = `
            background-color ${duration} ease-in-out,
            color ${duration} ease-in-out,
            border-color ${duration} ease-in-out
        `;

        setTimeout(() => {
            document.documentElement.style.transition = '';
        }, parseInt(duration));
    }
}

// Create and initialize
const themeManager = new ThemeManager();

// Export global
window.ThemeManager = ThemeManager;
window.themeManager = themeManager;
