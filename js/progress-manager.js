/**
 * Progress Manager - Gerenciamento de progresso e salva de estado
 * Persiste configurações, progresso e preferências do usuário
 */

class ProgressManager {
    constructor() {
        this.gameState = {
            currentPhase: 1,
            currentMission: null,
            totalCredits: 0,
            startDate: new Date().toISOString(),
            lastPlayed: new Date().toISOString(),
            sessionCount: 0
        };

        this.userPreferences = {
            theme: 'light',
            soundEnabled: true,
            animationsEnabled: true,
            fontSize: 'normal',
            autoSave: true
        };

        this.loadGameState();
        this.loadPreferences();
        this.initialized = false;
    }

    /**
     * Inicializa o gerenciador
     */
    initialize() {
        if (this.initialized) return;
        this.addStyles();
        this.setupAutoSave();
        this.initialized = true;
    }

    /**
     * Adiciona estilos
     */
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .save-indicator {
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: rgba(78, 205, 196, 0.9);
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 600;
                opacity: 0;
                animation: fadeInOut 2s ease-in-out;
                pointer-events: none;
                z-index: 100;
            }

            @keyframes fadeInOut {
                0% { opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { opacity: 0; }
            }

            .progress-stats {
                background: var(--bg-secondary, #f8f9fa);
                border: 2px solid #4ECDC4;
                border-radius: 8px;
                padding: 12px;
                margin: 12px 0;
            }

            .stat-row {
                display: flex;
                justify-content: space-between;
                padding: 6px 0;
                border-bottom: 1px solid var(--border-color, #e0e0e0);
                font-size: 13px;
            }

            .stat-row:last-child {
                border-bottom: none;
            }

            .stat-label {
                color: var(--text-light, #718096);
                font-weight: 600;
            }

            .stat-value {
                color: var(--text-dark, #2d3748);
                font-weight: 600;
            }

            .progress-bar {
                width: 100%;
                height: 8px;
                background: var(--border-color, #e0e0e0);
                border-radius: 4px;
                overflow: hidden;
                margin: 8px 0;
            }

            .progress-bar-fill {
                height: 100%;
                background: linear-gradient(90deg, #4ECDC4 0%, #00D2FC 100%);
                transition: width 0.5s ease;
            }

            .save-button {
                background: linear-gradient(135deg, #4ECDC4 0%, #00D2FC 100%);
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 12px;
            }

            .save-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(78, 205, 196, 0.3);
            }

            .session-timer {
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
     * Configura auto-save
     */
    setupAutoSave() {
        if (!this.userPreferences.autoSave) return;

        setInterval(() => {
            this.saveGameState();
        }, 30000); // A cada 30 segundos
    }

    /**
     * Salva estado do jogo
     */
    saveGameState() {
        this.gameState.lastPlayed = new Date().toISOString();
        localStorage.setItem('pydetetive_gamestate', JSON.stringify(this.gameState));
        this.showSaveIndicator();
    }

    /**
     * Carrega estado do jogo
     */
    loadGameState() {
        const saved = localStorage.getItem('pydetetive_gamestate');
        if (saved) {
            try {
                const loaded = JSON.parse(saved);
                this.gameState = { ...this.gameState, ...loaded };
            } catch (e) {
                console.warn('Erro ao carregar estado:', e);
            }
        }
    }

    /**
     * Salva preferências do usuário
     */
    savePreferences() {
        localStorage.setItem('pydetetive_preferences', JSON.stringify(this.userPreferences));
    }

    /**
     * Carrega preferências do usuário
     */
    loadPreferences() {
        const saved = localStorage.getItem('pydetetive_preferences');
        if (saved) {
            try {
                const loaded = JSON.parse(saved);
                this.userPreferences = { ...this.userPreferences, ...loaded };
            } catch (e) {
                console.warn('Erro ao carregar preferências:', e);
            }
        }
    }

    /**
     * Mostra indicador de salvamento
     */
    showSaveIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'save-indicator';
        indicator.textContent = '✓ Progresso salvo';
        document.body.appendChild(indicator);

        setTimeout(() => indicator.remove(), 2000);
    }

    /**
     * Atualiza créditos
     */
    addCredits(amount) {
        this.gameState.totalCredits += amount;
        this.saveGameState();
    }

    /**
     * Define fase atual
     */
    setCurrentPhase(phaseId) {
        this.gameState.currentPhase = phaseId;
        this.saveGameState();
    }

    /**
     * Define missão atual
     */
    setCurrentMission(missionId) {
        this.gameState.currentMission = missionId;
        this.saveGameState();
    }

    /**
     * Obtém tempo jogado
     */
    getPlayTime() {
        const start = new Date(this.gameState.startDate);
        const now = new Date();
        const diffMs = now - start;

        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        return { hours, minutes, total: diffMs };
    }

    /**
     * Obtém informações de sessão
     */
    getSessionInfo() {
        const { hours, minutes } = this.getPlayTime();
        const lastSession = new Date(this.gameState.lastPlayed);
        const now = new Date();
        const daysSinceLastPlay = Math.floor((now - lastSession) / (1000 * 60 * 60 * 24));

        return {
            playtime: `${hours}h ${minutes}m`,
            lastPlayed: lastSession.toLocaleString('pt-BR'),
            daysSinceLastPlay,
            totalCredits: this.gameState.totalCredits
        };
    }

    /**
     * Renderiza estatísticas de progresso
     */
    renderStats(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const stats = this.getSessionInfo();
        const { hours, minutes } = this.getPlayTime();

        container.innerHTML = `
            <div class="progress-stats">
                <div class="stat-row">
                    <span class="stat-label">Créditos Totais:</span>
                    <span class="stat-value">${stats.totalCredits}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Tempo Jogado:</span>
                    <span class="stat-value">${hours}h ${minutes}m</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Fase Atual:</span>
                    <span class="stat-value">Fase ${this.gameState.currentPhase}</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-bar-fill" style="width: ${(this.gameState.currentPhase / 3) * 100}%"></div>
                </div>
                <div class="session-timer">
                    Último acesso: ${stats.daysSinceLastPlay === 0 ? 'Hoje' : `${stats.daysSinceLastPlay} dias atrás`}
                </div>
            </div>
        `;
    }

    /**
     * Define preferência de tema
     */
    setTheme(theme) {
        this.userPreferences.theme = theme;
        this.savePreferences();
    }

    /**
     * Define preferência de sons
     */
    setSoundEnabled(enabled) {
        this.userPreferences.soundEnabled = enabled;
        this.savePreferences();
    }

    /**
     * Define preferência de animações
     */
    setAnimationsEnabled(enabled) {
        this.userPreferences.animationsEnabled = enabled;
        this.savePreferences();
    }

    /**
     * Exporta progresso como JSON
     */
    exportProgress() {
        const data = {
            gameState: this.gameState,
            preferences: this.userPreferences,
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `pydetetive-progress-${Date.now()}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }

    /**
     * Importa progresso de arquivo JSON
     */
    importProgress(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            if (data.gameState) this.gameState = data.gameState;
            if (data.preferences) this.userPreferences = data.preferences;
            this.saveGameState();
            this.savePreferences();
            return true;
        } catch (e) {
            console.error('Erro ao importar:', e);
            return false;
        }
    }

    /**
     * Reseta todo o progresso
     */
    resetProgress() {
        if (confirm('Tem certeza que deseja resetar todo o progresso? Esta ação não pode ser desfeita.')) {
            this.gameState = {
                currentPhase: 1,
                currentMission: null,
                totalCredits: 0,
                startDate: new Date().toISOString(),
                lastPlayed: new Date().toISOString(),
                sessionCount: 0
            };
            this.saveGameState();
            return true;
        }
        return false;
    }
}

// Create global instance
const progressManager = new ProgressManager();
window.ProgressManager = ProgressManager;
window.progressManager = progressManager;
