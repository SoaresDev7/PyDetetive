/**
 * Analytics Tracker - Rastreamento de eventos e analytics
 * Coleta dados de interação e progresso
 */

class AnalyticsTracker {
    constructor() {
        this.events = [];
        this.sessions = [];
        this.currentSession = this.createSession();
        this.enabled = true;
        this.maxEvents = 1000;
    }

    /**
     * Cria nova sessão
     */
    createSession() {
        return {
            id: Math.random().toString(36).substr(2, 9),
            startTime: new Date().toISOString(),
            endTime: null,
            eventCount: 0,
            missionCount: 0,
            creditsGained: 0
        };
    }

    /**
     * Rastreia evento genérico
     */
    trackEvent(category, action, label = null, value = null) {
        if (!this.enabled) return;

        const event = {
            timestamp: new Date().toISOString(),
            sessionId: this.currentSession.id,
            category,
            action,
            label,
            value,
            url: window.location.href
        };

        this.events.push(event);
        this.currentSession.eventCount++;

        if (this.events.length > this.maxEvents) {
            this.events.shift();
        }

        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('analyticsEvent', { detail: event }));
    }

    /**
     * Rastreia conclusão de missão
     */
    trackMissionComplete(phaseId, missionId, timeSeconds, success = true) {
        this.trackEvent('mission', 'complete', `${phaseId}-${missionId}`, {
            timeSeconds,
            success,
            phase: phaseId,
            mission: missionId
        });

        this.currentSession.missionCount++;
    }

    /**
     * Rastreia ganho de créditos
     */
    trackCreditsGained(amount, source) {
        this.trackEvent('credits', 'gained', source, amount);
        this.currentSession.creditsGained += amount;
    }

    /**
     * Rastreia desbloqueio de fase
     */
    trackPhaseUnlock(phaseId) {
        this.trackEvent('phase', 'unlocked', `phase-${phaseId}`, phaseId);
    }

    /**
     * Rastreia desbloqueio de badge
     */
    trackBadgeUnlock(badgeId) {
        this.trackEvent('badge', 'unlocked', badgeId);
    }

    /**
     * Rastreia clique de usuário
     */
    trackClick(elementId, elementType) {
        this.trackEvent('interaction', 'click', elementId, { type: elementType });
    }

    /**
     * Rastreia tempo gasto em missão
     */
    trackMissionTime(phaseId, missionId, seconds) {
        this.trackEvent('mission', 'time_spent', `${phaseId}-${missionId}`, seconds);
    }

    /**
     * Rastreia tentativa de código
     */
    trackCodeExecution(success, errorType = null) {
        this.trackEvent('code', 'execution', success ? 'success' : 'failure', {
            success,
            errorType
        });
    }

    /**
     * Rastreia dica solicitada
     */
    trackHintRequested(phaseId, missionId, hintNumber) {
        this.trackEvent('hint', 'requested', `${phaseId}-${missionId}`, hintNumber);
    }

    /**
     * Rastreia seleção de tema
     */
    trackThemeChange(theme) {
        this.trackEvent('ui', 'theme_changed', theme);
    }

    /**
     * Obtém estatísticas gerais
     */
    getStats() {
        const sessionEvents = this.events.filter(e => e.sessionId === this.currentSession.id);

        const missionEvents = sessionEvents.filter(e => e.category === 'mission' && e.action === 'complete');
        const successfulMissions = missionEvents.filter(e => e.value.success).length;

        const creditEvents = sessionEvents.filter(e => e.category === 'credits' && e.action === 'gained');
        const totalCredits = creditEvents.reduce((sum, e) => sum + e.value, 0);

        const codeEvents = sessionEvents.filter(e => e.category === 'code' && e.action === 'execution');
        const successfulCode = codeEvents.filter(e => e.value.success).length;

        return {
            totalEvents: sessionEvents.length,
            missionsCompleted: missionEvents.length,
            successfulMissions,
            totalCredits,
            codeExecutions: codeEvents.length,
            successfulCodeExecutions: successfulCode,
            codeSuccessRate: codeEvents.length > 0 ? (successfulCode / codeEvents.length * 100).toFixed(2) : 0
        };
    }

    /**
     * Obtém eventos por categoria
     */
    getEventsByCategory(category) {
        return this.events.filter(e => e.category === category && e.sessionId === this.currentSession.id);
    }

    /**
     * Obtém análise de tempo gasto
     */
    getTimeAnalysis() {
        const timeEvents = this.getEventsByCategory('mission')
            .filter(e => e.action === 'time_spent');

        if (timeEvents.length === 0) return null;

        const times = timeEvents.map(e => e.value);
        const totalTime = times.reduce((a, b) => a + b, 0);
        const averageTime = totalTime / times.length;

        return {
            totalTime,
            averageTime,
            minTime: Math.min(...times),
            maxTime: Math.max(...times),
            missionsTracked: times.length
        };
    }

    /**
     * Exporta eventos como JSON
     */
    exportEvents() {
        const data = {
            session: this.currentSession,
            events: this.events.filter(e => e.sessionId === this.currentSession.id),
            stats: this.getStats(),
            exportedAt: new Date().toISOString()
        };

        return JSON.stringify(data, null, 2);
    }

    /**
     * Envia dados para servidor (simulado)
     */
    sendToServer(endpoint = '/api/analytics') {
        if (!this.enabled) return;

        const payload = {
            session: this.currentSession,
            events: this.events.filter(e => e.sessionId === this.currentSession.id)
        };

        // Simulação - em produção, fazer fetch real
        logger?.info(`Analytics: Enviando ${payload.events.length} eventos para ${endpoint}`);

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    status: 'success',
                    eventsProcessed: payload.events.length
                });
            }, 500);
        });
    }

    /**
     * Ativa/desativa rastreamento
     */
    setEnabled(enabled) {
        this.enabled = enabled;
    }

    /**
     * Finaliza sessão
     */
    endSession() {
        this.currentSession.endTime = new Date().toISOString();
        this.sessions.push(this.currentSession);
        this.currentSession = this.createSession();
    }

    /**
     * Limpa eventos
     */
    clearEvents() {
        this.events = [];
    }

    /**
     * Obtém todas as sessões
     */
    getSessions() {
        return this.sessions;
    }
}

// Create global instance
const analyticsTracker = new AnalyticsTracker();
window.AnalyticsTracker = AnalyticsTracker;
window.analyticsTracker = analyticsTracker;
