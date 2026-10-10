/**
 * Phase Unlock System - Sistema de desbloqueio de fases
 * Controla progressão de fases baseada em conclusão de missões
 */

class PhaseUnlockSystem {
    constructor() {
        this.phases = {
            1: { id: 1, name: 'Fase 1: Primeiros Passos', unlocked: true, missionCount: 4 },
            2: { id: 2, name: 'Fase 2: Investigação Profunda', unlocked: false, missionCount: 4 },
            3: { id: 3, name: 'Fase 3: O Grande Desfecho', unlocked: false, missionCount: 4 }
        };

        this.completedMissions = new Map();
        this.unlockedPhases = this.loadUnlockedPhases();
        this.initialized = false;
    }

    /**
     * Inicializa o sistema
     */
    initialize() {
        if (this.initialized) return;
        this.addStyles();
        this.loadUnlockedPhases();
        this.initialized = true;
    }

    /**
     * Adiciona estilos para o sistema de desbloqueio
     */
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .phase-lock-badge {
                position: absolute;
                top: 8px;
                right: 8px;
                background: rgba(255, 107, 107, 0.9);
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 4px;
            }

            .phase-locked {
                opacity: 0.6;
                pointer-events: none;
                position: relative;
            }

            .phase-locked::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: repeating-linear-gradient(
                    45deg,
                    rgba(255, 107, 107, 0.05),
                    rgba(255, 107, 107, 0.05) 10px,
                    rgba(255, 107, 107, 0.1) 10px,
                    rgba(255, 107, 107, 0.1) 20px
                );
                border-radius: inherit;
                pointer-events: none;
            }

            .phase-item {
                position: relative;
                transition: all 0.3s ease;
                border-radius: 8px;
                overflow: hidden;
            }

            .phase-item.unlocked {
                cursor: pointer;
            }

            .phase-item.unlocked:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }

            .unlock-progress {
                padding: 12px;
                background: var(--bg-secondary, #f8f9fa);
                border-radius: 4px;
                margin-top: 8px;
                font-size: 12px;
                color: var(--text-light, #718096);
            }

            .unlock-bar {
                width: 100%;
                height: 6px;
                background: var(--border-color, #e0e0e0);
                border-radius: 3px;
                overflow: hidden;
                margin: 4px 0;
            }

            .unlock-bar-fill {
                height: 100%;
                background: linear-gradient(90deg, #4ECDC4 0%, #00D2FC 100%);
                transition: width 0.5s ease;
                border-radius: 3px;
            }

            .unlock-notification {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                border: 3px solid #4ECDC4;
                border-radius: 12px;
                padding: 32px;
                text-align: center;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                z-index: 2000;
                animation: unlockPop 0.5s ease-out;
            }

            @keyframes unlockPop {
                0% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.5);
                }
                50% {
                    transform: translate(-50%, -50%) scale(1.1);
                }
                100% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }

            .unlock-notification-backdrop {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                z-index: 1999;
                animation: fadeIn 0.3s ease-out;
            }

            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }

            .unlock-notification h2 {
                color: #4ECDC4;
                font-size: 28px;
                margin: 0 0 8px;
            }

            .unlock-notification p {
                color: var(--text-dark, #2d3748);
                margin: 4px 0;
            }

            .unlock-notification .emoji {
                font-size: 48px;
                margin: 8px 0;
            }

            .mission-progress {
                font-size: 14px;
                font-weight: 600;
                color: var(--text-dark, #2d3748);
            }

            .missions-required {
                font-size: 12px;
                color: var(--text-light, #718096);
                margin-top: 4px;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Carrega fases desbloqueadas do localStorage
     */
    loadUnlockedPhases() {
        const saved = localStorage.getItem('pydetetive_unlocked_phases');
        if (saved) {
            const unlockedIds = JSON.parse(saved);
            unlockedIds.forEach(id => {
                if (this.phases[id]) {
                    this.phases[id].unlocked = true;
                }
            });
        }
        return new Set(Object.keys(this.phases).filter(k => this.phases[k].unlocked));
    }

    /**
     * Salva fases desbloqueadas
     */
    saveUnlockedPhases() {
        const unlockedIds = Object.keys(this.phases)
            .filter(k => this.phases[k].unlocked)
            .map(Number);
        localStorage.setItem('pydetetive_unlocked_phases', JSON.stringify(unlockedIds));
    }

    /**
     * Marca missão como completa
     */
    completeMission(phaseId, missionId) {
        const key = `${phaseId}-${missionId}`;
        if (this.completedMissions.has(key)) {
            return false; // Já completada
        }

        this.completedMissions.set(key, true);
        this.checkPhaseUnlock(phaseId);

        return true;
    }

    /**
     * Verifica se uma fase deve ser desbloqueada
     */
    checkPhaseUnlock(phaseId) {
        const nextPhaseId = phaseId + 1;
        if (!this.phases[nextPhaseId]) return false;

        if (this.phases[nextPhaseId].unlocked) return false;

        // Contar missões completadas
        const completedCount = this.getCompletedMissionCount(phaseId);
        const requiredCount = this.phases[phaseId].missionCount;

        if (completedCount >= requiredCount) {
            this.unlockPhase(nextPhaseId);
            return true;
        }

        return false;
    }

    /**
     * Desbloqueia uma fase
     */
    unlockPhase(phaseId) {
        if (!this.phases[phaseId]) return false;
        if (this.phases[phaseId].unlocked) return false;

        this.phases[phaseId].unlocked = true;
        this.saveUnlockedPhases();
        this.showUnlockNotification(phaseId);

        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('phaseUnlocked', {
            detail: { phaseId, phaseName: this.phases[phaseId].name }
        }));

        return true;
    }

    /**
     * Mostra notificação de desbloqueio
     */
    showUnlockNotification(phaseId) {
        const phase = this.phases[phaseId];
        if (!phase) return;

        // Criar backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'unlock-notification-backdrop';
        document.body.appendChild(backdrop);

        // Criar notificação
        const notification = document.createElement('div');
        notification.className = 'unlock-notification';
        notification.innerHTML = `
            <div class="emoji">🔓</div>
            <h2>Fase Desbloqueada!</h2>
            <p><strong>${phase.name}</strong></p>
            <p>Você está pronto para o próximo desafio!</p>
        `;
        document.body.appendChild(notification);

        // Remover após animação
        setTimeout(() => {
            notification.remove();
            backdrop.remove();
        }, 3000);

        // Tocar som
        this.playUnlockSound();
    }

    /**
     * Toca som de desbloqueio
     */
    playUnlockSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            // Sequência de tons (sucesso!)
            oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // Do
            oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1); // Mi
            oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2); // Sol

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0, audioContext.currentTime + 0.3);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (e) {
            // Silent fail
        }
    }

    /**
     * Conta missões completadas de uma fase
     */
    getCompletedMissionCount(phaseId) {
        let count = 0;
        for (let i = 1; i <= this.phases[phaseId].missionCount; i++) {
            const key = `${phaseId}-${i}`;
            if (this.completedMissions.has(key)) count++;
        }
        return count;
    }

    /**
     * Obtém progresso de desbloqueio de uma fase
     */
    getUnlockProgress(phaseId) {
        const nextPhaseId = phaseId + 1;
        if (!this.phases[nextPhaseId]) return null;

        const completed = this.getCompletedMissionCount(phaseId);
        const required = this.phases[phaseId].missionCount;

        return {
            completed,
            required,
            percentage: (completed / required) * 100,
            locked: !this.phases[nextPhaseId].unlocked
        };
    }

    /**
     * Verifica se uma fase está desbloqueada
     */
    isPhaseUnlocked(phaseId) {
        return this.phases[phaseId] && this.phases[phaseId].unlocked;
    }

    /**
     * Obtém todas as fases
     */
    getPhases() {
        return Object.values(this.phases);
    }

    /**
     * Reseta todos os desbloqueios
     */
    resetUnlocks() {
        Object.keys(this.phases).forEach(id => {
            this.phases[id].unlocked = id === '1';
        });
        this.completedMissions.clear();
        this.saveUnlockedPhases();
    }
}

// Create global instance
const phaseUnlockSystem = new PhaseUnlockSystem();
window.PhaseUnlockSystem = PhaseUnlockSystem;
window.phaseUnlockSystem = phaseUnlockSystem;
