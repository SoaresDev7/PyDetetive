/**
 * Leaderboard - Sistema de classificação e estatísticas
 * Rastreia recordes e desempenho do jogador
 */

class Leaderboard {
    constructor() {
        this.records = {
            fastestMissions: new Map(),
            mostCredits: 0,
            perfectMissions: [],
            streakData: {
                current: 0,
                best: 0,
                startDate: null
            },
            achievements: new Map()
        };

        this.loadRecords();
        this.initialized = false;
    }

    /**
     * Inicializa o leaderboard
     */
    initialize() {
        if (this.initialized) return;
        this.addStyles();
        this.initialized = true;
    }

    /**
     * Adiciona estilos
     */
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .leaderboard-panel {
                background: var(--bg-secondary, #f8f9fa);
                border: 2px solid #FFB700;
                border-radius: 8px;
                padding: 12px;
                margin: 12px 0;
            }

            .leaderboard-title {
                color: var(--text-dark, #2d3748);
                font-weight: 700;
                font-size: 14px;
                margin-bottom: 8px;
                display: flex;
                align-items: center;
                gap: 6px;
            }

            .leaderboard-item {
                background: var(--bg-light, #ffffff);
                border-left: 4px solid #FFB700;
                padding: 8px 12px;
                margin: 4px 0;
                border-radius: 4px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: all 0.3s ease;
                animation: slideInRecord 0.3s ease-out;
            }

            @keyframes slideInRecord {
                from {
                    opacity: 0;
                    transform: translateX(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            .leaderboard-item:hover {
                box-shadow: 0 2px 8px rgba(255, 183, 0, 0.2);
                background: rgba(255, 183, 0, 0.05);
            }

            .leaderboard-rank {
                font-weight: 700;
                font-size: 16px;
                color: #FFB700;
                min-width: 30px;
                text-align: center;
            }

            .leaderboard-rank.gold {
                color: #FFD700;
                text-shadow: 0 0 4px rgba(255, 215, 0, 0.5);
            }

            .leaderboard-rank.silver {
                color: #C0C0C0;
                text-shadow: 0 0 4px rgba(192, 192, 192, 0.5);
            }

            .leaderboard-rank.bronze {
                color: #CD7F32;
                text-shadow: 0 0 4px rgba(205, 127, 50, 0.5);
            }

            .leaderboard-info {
                flex: 1;
                font-size: 13px;
                margin: 0 8px;
            }

            .leaderboard-name {
                font-weight: 600;
                color: var(--text-dark, #2d3748);
            }

            .leaderboard-meta {
                font-size: 11px;
                color: var(--text-light, #718096);
            }

            .leaderboard-value {
                font-weight: 600;
                color: var(--text-dark, #2d3748);
                background: var(--bg-secondary, #f8f9fa);
                padding: 2px 8px;
                border-radius: 4px;
            }

            .streak-badge {
                display: inline-block;
                background: linear-gradient(135deg, #FF6B6B 0%, #FF8A80 100%);
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 11px;
                font-weight: 600;
                margin-left: 8px;
            }

            .perfect-badge {
                display: inline-block;
                background: linear-gradient(135deg, #FFB700 0%, #FF9F43 100%);
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 11px;
                font-weight: 600;
                margin-left: 4px;
            }

            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 8px;
                margin-top: 8px;
            }

            .stat-card {
                background: linear-gradient(135deg, var(--bg-light, #ffffff) 0%, var(--bg-secondary, #f8f9fa) 100%);
                border: 1px solid var(--border-color, #e0e0e0);
                border-radius: 6px;
                padding: 8px;
                text-align: center;
            }

            .stat-card-value {
                font-size: 18px;
                font-weight: 700;
                color: #FFB700;
            }

            .stat-card-label {
                font-size: 11px;
                color: var(--text-light, #718096);
                margin-top: 4px;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Registra tempo de uma missão
     */
    recordMissionTime(phaseId, missionId, timeSeconds, perfect = false) {
        const key = `${phaseId}-${missionId}`;

        // Verificar se é recorde
        const existing = this.records.fastestMissions.get(key);
        if (!existing || timeSeconds < existing.time) {
            this.records.fastestMissions.set(key, {
                time: timeSeconds,
                date: new Date().toISOString()
            });
        }

        // Registrar missão perfeita
        if (perfect && !this.records.perfectMissions.includes(key)) {
            this.records.perfectMissions.push(key);
        }

        this.updateStreak();
        this.persistRecords();
    }

    /**
     * Atualiza sequência de vitórias
     */
    updateStreak() {
        if (!this.records.streakData.startDate) {
            this.records.streakData.startDate = new Date().toISOString();
        }

        this.records.streakData.current++;

        if (this.records.streakData.current > this.records.streakData.best) {
            this.records.streakData.best = this.records.streakData.current;
        }

        this.persistRecords();
    }

    /**
     * Reseta sequência de vitórias
     */
    resetStreak() {
        this.records.streakData.current = 0;
        this.persistRecords();
    }

    /**
     * Adiciona créditos ao recorde
     */
    addCreditRecord(amount) {
        this.records.mostCredits += amount;
        this.persistRecords();
    }

    /**
     * Obtém tempo mais rápido de uma missão
     */
    getFastestTime(phaseId, missionId) {
        const key = `${phaseId}-${missionId}`;
        const record = this.records.fastestMissions.get(key);
        return record ? record.time : null;
    }

    /**
     * Obtém top 5 missões mais rápidas
     */
    getTopFastest() {
        const sorted = Array.from(this.records.fastestMissions.entries())
            .sort((a, b) => a[1].time - b[1].time)
            .slice(0, 5);

        return sorted.map(([key, record], index) => {
            const [phaseId, missionId] = key.split('-');
            return {
                rank: index + 1,
                name: `Missão ${missionId} - Fase ${phaseId}`,
                time: record.time,
                minutes: Math.floor(record.time / 60),
                seconds: record.time % 60,
                isPerfect: this.records.perfectMissions.includes(key)
            };
        });
    }

    /**
     * Obtém estatísticas gerais
     */
    getStats() {
        return {
            totalCredits: this.records.mostCredits,
            fastestMissions: this.records.fastestMissions.size,
            perfectMissions: this.records.perfectMissions.length,
            currentStreak: this.records.streakData.current,
            bestStreak: this.records.streakData.best,
            totalMissionsCompleted: this.records.fastestMissions.size
        };
    }

    /**
     * Renderiza top missões
     */
    renderTopMissions(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const topMissions = this.getTopFastest();

        if (topMissions.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-light, #718096); padding: 16px;">Nenhuma missão completada ainda</p>';
            return;
        }

        const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];

        let html = '<div class="leaderboard-panel"><div class="leaderboard-title">⚡ Missões Mais Rápidas</div>';

        topMissions.forEach((mission, index) => {
            html += `
                <div class="leaderboard-item">
                    <div class="leaderboard-rank">${medals[index]}</div>
                    <div class="leaderboard-info">
                        <div class="leaderboard-name">${mission.name}${mission.isPerfect ? '<span class="perfect-badge">Perfeita</span>' : ''}</div>
                        <div class="leaderboard-meta">${mission.minutes}m ${mission.seconds}s</div>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        container.innerHTML = html;
    }

    /**
     * Renderiza estatísticas
     */
    renderStats(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const stats = this.getStats();

        const html = `
            <div class="leaderboard-panel">
                <div class="leaderboard-title">📊 Suas Estatísticas</div>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-card-value">${stats.totalCredits}</div>
                        <div class="stat-card-label">Créditos Totais</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-value">${stats.totalMissionsCompleted}</div>
                        <div class="stat-card-label">Missões Completas</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-value">${stats.perfectMissions}</div>
                        <div class="stat-card-label">Perfeitas</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-value">${stats.currentStreak}</div>
                        <div class="stat-card-label">Sequência Atual</div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    /**
     * Persiste recordes
     */
    persistRecords() {
        const data = {
            fastestMissions: Object.fromEntries(this.records.fastestMissions),
            mostCredits: this.records.mostCredits,
            perfectMissions: this.records.perfectMissions,
            streakData: this.records.streakData
        };
        localStorage.setItem('pydetetive_records', JSON.stringify(data));
    }

    /**
     * Carrega recordes
     */
    loadRecords() {
        const saved = localStorage.getItem('pydetetive_records');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.records.fastestMissions = new Map(Object.entries(data.fastestMissions || {}));
                this.records.mostCredits = data.mostCredits || 0;
                this.records.perfectMissions = data.perfectMissions || [];
                this.records.streakData = data.streakData || this.records.streakData;
            } catch (e) {
                console.warn('Erro ao carregar recordes:', e);
            }
        }
    }

    /**
     * Reseta todos os recordes
     */
    resetRecords() {
        this.records = {
            fastestMissions: new Map(),
            mostCredits: 0,
            perfectMissions: [],
            streakData: { current: 0, best: 0, startDate: null },
            achievements: new Map()
        };
        this.persistRecords();
    }
}

// Create global instance
const leaderboard = new Leaderboard();
window.Leaderboard = Leaderboard;
window.leaderboard = leaderboard;
