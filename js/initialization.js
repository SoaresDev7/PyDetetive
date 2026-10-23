/**
 * Initialization - Inicialização centralizada do PyDetetive
 * Coordena carregamento e setup de todos os sistemas
 */

class PyDetetiveInitializer {
    constructor() {
        this.status = 'idle';
        this.modules = [];
        this.initialized = false;
    }

    /**
     * Inicia o jogo
     */
    async initialize() {
        if (this.initialized) return;

        this.status = 'initializing';
        logger?.info('PyDetetive: Iniciando...');

        try {
            // 1. Inicializar sistemas base
            this.initializeBaseSystems();
            logger?.info('PyDetetive: Sistemas base inicializados');

            // 2. Inicializar UI
            this.initializeUI();
            logger?.info('PyDetetive: UI inicializada');

            // 3. Inicializar features avançadas
            this.initializeAdvancedFeatures();
            logger?.info('PyDetetive: Features avançadas inicializadas');

            // 4. Configurar event listeners globais
            this.setupEventListeners();
            logger?.info('PyDetetive: Event listeners configurados');

            // 5. Renderizar interface
            this.renderInterface();
            logger?.info('PyDetetive: Interface renderizada');

            this.status = 'ready';
            this.initialized = true;

            // Tocar som de inicialização
            soundManager?.playIntro();

            logger?.success('PyDetetive: Pronto para jogar!');
            window.dispatchEvent(new CustomEvent('pydetetifeReady'));

            return true;

        } catch (error) {
            this.status = 'error';
            logger?.error(`PyDetetive: Erro na inicialização - ${error.message}`);
            console.error('Erro de inicialização:', error);
            return false;
        }
    }

    /**
     * Inicializa sistemas base
     */
    initializeBaseSystems() {
        // Logger
        logger?.initialize();

        // Theme Manager
        themeManager?.initialize();

        // Progress Manager
        progressManager?.initialize();

        // Animation Effects
        animationEffects?.initialize();

        // Sound Manager
        soundManager?.initialize();

        // Keyboard Shortcuts
        keyboardShortcuts?.initialize();
    }

    /**
     * Inicializa UI
     */
    initializeUI() {
        // Cork Decorations
        corkDecorations?.initialize();
        corkDecorations?.addDecorativeStrings('appScreen');

        // Variable Inspector
        variableInspector?.initialize();

        // Badges System
        badgesSystem?.initialize();

        // Phase Unlock System
        phaseUnlockSystem?.initialize();

        // Hints System
        hintsSystem?.initialize();

        // Code Sharing
        codeSharing?.initialize();
    }

    /**
     * Inicializa features avançadas
     */
    initializeAdvancedFeatures() {
        // Accessibility Helper
        accessibilityHelper?.initialize();
        accessibilityHelper?.renderAccessibilityMenu();

        // Performance Monitor
        performanceMonitor?.initialize();
        performanceMonitor?.renderMonitor();

        // Analytics Tracker
        analyticsTracker?.setEnabled(true);

        // Leaderboard
        leaderboard?.initialize();
    }

    /**
     * Configura event listeners globais
     */
    setupEventListeners() {
        // Theme changed
        window.addEventListener('themeChanged', (e) => {
            logger?.info(`Tema alterado: ${e.detail.theme}`);
            analyticsTracker?.trackThemeChange(e.detail.theme);
        });

        // Phase unlocked
        window.addEventListener('phaseUnlocked', (e) => {
            logger?.success(`Fase desbloqueada: ${e.detail.phaseName}`);
            animationEffects?.confetti();
            analyticsTracker?.trackPhaseUnlock(e.detail.phaseId);
        });

        // Log entries
        window.addEventListener('logEntry', (e) => {
            // Eventos de log já são rastreados pelo logger
        });

        // Analytics events
        window.addEventListener('analyticsEvent', (e) => {
            // Eventos de analytics já são rastreados
        });
    }

    /**
     * Renderiza interface
     */
    renderInterface() {
        // Renderizar variáveis
        variableInspector?.render('variablesList');

        // Renderizar badges
        badgesSystem?.renderBadgesGallery('badgesContainer');

        // Renderizar stats
        progressManager?.renderStats('statsContainer');
        leaderboard?.renderStats('leaderboardContainer');
        leaderboard?.renderTopMissions('topMissionsContainer');
    }

    /**
     * Obtém status
     */
    getStatus() {
        return this.status;
    }

    /**
     * Obtém informações de debug
     */
    getDebugInfo() {
        return {
            status: this.status,
            initialized: this.initialized,
            systems: {
                logger: !!window.logger,
                themeManager: !!window.themeManager,
                progressManager: !!window.progressManager,
                soundManager: !!window.soundManager,
                analyticsTracker: !!window.analyticsTracker,
                performanceMonitor: !!window.performanceMonitor,
                badgesSystem: !!window.badgesSystem,
                leaderboard: !!window.leaderboard
            },
            performance: performanceMonitor?.getReport(),
            analytics: analyticsTracker?.getStats()
        };
    }

    /**
     * Reseta o jogo
     */
    reset() {
        if (confirm('Deseja resetar o jogo completamente? Isto não pode ser desfeito.')) {
            progressManager?.resetProgress();
            badgesSystem?.resetBadges();
            phaseUnlockSystem?.resetUnlocks();
            hintsSystem?.resetAllHints();
            leaderboard?.resetRecords();
            codeSharing?.persistSolutions();

            logger?.success('Jogo resetado');
            location.reload();
        }
    }
}

// Create global instance
const pydetetifeInitializer = new PyDetetiveInitializer();
window.PyDetetiveInitializer = PyDetetiveInitializer;
window.pydetetifeInitializer = pydetetifeInitializer;

// Auto-initialize quando DOM está pronto
document.addEventListener('DOMContentLoaded', () => {
    pydetetifeInitializer.initialize();
});
