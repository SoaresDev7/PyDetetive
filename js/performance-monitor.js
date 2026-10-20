/**
 * Performance Monitor - Monitoramento de performance
 * Rastreia FPS, memória e tempo de execução
 */

class PerformanceMonitor {
    constructor() {
        this.metrics = {
            fps: 0,
            fpsHistory: [],
            memoryUsage: 0,
            executionTimes: new Map(),
            startTime: performance.now(),
            frameCount: 0
        };
        this.maxHistoryLength = 60;
        this.enabled = true;
        this.initialized = false;
    }

    /**
     * Inicializa o monitor
     */
    initialize() {
        if (this.initialized) return;
        this.startMonitoring();
        this.addStyles();
        this.initialized = true;
    }

    /**
     * Adiciona estilos
     */
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .performance-monitor {
                position: fixed;
                top: 10px;
                left: 10px;
                background: rgba(0, 0, 0, 0.8);
                color: #4ECDC4;
                padding: 8px 12px;
                border-radius: 6px;
                font-family: 'Fira Code', monospace;
                font-size: 11px;
                line-height: 1.5;
                z-index: 10000;
                max-width: 300px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
            }

            .perf-metric {
                display: flex;
                justify-content: space-between;
                padding: 2px 0;
            }

            .perf-label {
                color: #A0A0A0;
            }

            .perf-value {
                color: #4ECDC4;
                font-weight: 600;
            }

            .perf-value.good {
                color: #6BCF7F;
            }

            .perf-value.warn {
                color: #FFB700;
            }

            .perf-value.bad {
                color: #FF6B6B;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Inicia monitoramento
     */
    startMonitoring() {
        let lastTime = performance.now();
        let frames = 0;

        const measure = () => {
            frames++;
            const currentTime = performance.now();
            const delta = currentTime - lastTime;

            if (delta >= 1000) {
                this.metrics.fps = Math.round(frames * 1000 / delta);
                this.metrics.fpsHistory.push(this.metrics.fps);

                if (this.metrics.fpsHistory.length > this.maxHistoryLength) {
                    this.metrics.fpsHistory.shift();
                }

                frames = 0;
                lastTime = currentTime;

                if (performance.memory) {
                    this.metrics.memoryUsage = Math.round(performance.memory.usedJSHeapSize / 1048576);
                }
            }

            requestAnimationFrame(measure);
        };

        requestAnimationFrame(measure);
    }

    /**
     * Marca início de execução
     */
    startMeasure(label) {
        performance.mark(`${label}-start`);
    }

    /**
     * Marca fim de execução
     */
    endMeasure(label) {
        performance.mark(`${label}-end`);

        try {
            performance.measure(label, `${label}-start`, `${label}-end`);
            const measures = performance.getEntriesByName(label);

            if (measures.length > 0) {
                const duration = measures[measures.length - 1].duration;

                if (!this.metrics.executionTimes.has(label)) {
                    this.metrics.executionTimes.set(label, []);
                }

                const times = this.metrics.executionTimes.get(label);
                times.push(duration);

                if (times.length > 100) {
                    times.shift();
                }
            }
        } catch (e) {
            console.warn('Performance measurement error:', e);
        }
    }

    /**
     * Obtem tempo de execução médio
     */
    getAverageExecutionTime(label) {
        const times = this.metrics.executionTimes.get(label);
        if (!times || times.length === 0) return 0;

        const sum = times.reduce((a, b) => a + b, 0);
        return sum / times.length;
    }

    /**
     * Obtém FPS médio
     */
    getAverageFPS() {
        if (this.metrics.fpsHistory.length === 0) return 0;
        const sum = this.metrics.fpsHistory.reduce((a, b) => a + b, 0);
        return Math.round(sum / this.metrics.fpsHistory.length);
    }

    /**
     * Obtém FPS mínimo
     */
    getMinFPS() {
        if (this.metrics.fpsHistory.length === 0) return 0;
        return Math.min(...this.metrics.fpsHistory);
    }

    /**
     * Renderiza monitor
     */
    renderMonitor(showDetails = false) {
        const monitor = document.querySelector('.performance-monitor') ||
                       document.createElement('div');

        monitor.className = 'performance-monitor';

        const avgFPS = this.getAverageFPS();
        const minFPS = this.getMinFPS();
        const fpsClass = avgFPS >= 60 ? 'good' : avgFPS >= 30 ? 'warn' : 'bad';
        const memClass = this.metrics.memoryUsage < 50 ? 'good' : 'warn';

        let html = `
            <div class="perf-metric">
                <span class="perf-label">FPS:</span>
                <span class="perf-value ${fpsClass}">${this.metrics.fps} (avg: ${avgFPS})</span>
            </div>
            <div class="perf-metric">
                <span class="perf-label">Memory:</span>
                <span class="perf-value ${memClass}">${this.metrics.memoryUsage}MB</span>
            </div>
        `;

        if (showDetails) {
            html += `
                <div class="perf-metric">
                    <span class="perf-label">Min FPS:</span>
                    <span class="perf-value">${minFPS}</span>
                </div>
                <div class="perf-metric">
                    <span class="perf-label">Uptime:</span>
                    <span class="perf-value">${this.getUptime()}s</span>
                </div>
            `;
        }

        monitor.innerHTML = html;

        if (!document.body.contains(monitor)) {
            document.body.appendChild(monitor);
        }
    }

    /**
     * Obtém tempo de execução
     */
    getUptime() {
        return Math.round((performance.now() - this.metrics.startTime) / 1000);
    }

    /**
     * Habilita/desabilita monitor
     */
    setEnabled(enabled) {
        this.enabled = enabled;
        const monitor = document.querySelector('.performance-monitor');
        if (monitor) {
            monitor.style.display = enabled ? 'block' : 'none';
        }
    }

    /**
     * Limpa medidas
     */
    clearMeasures() {
        this.metrics.executionTimes.clear();
        performance.clearMarks();
        performance.clearMeasures();
    }

    /**
     * Obtém relatório de performance
     */
    getReport() {
        return {
            currentFPS: this.metrics.fps,
            averageFPS: this.getAverageFPS(),
            minFPS: this.getMinFPS(),
            memoryUsage: this.metrics.memoryUsage,
            uptime: this.getUptime(),
            executionTimes: Object.fromEntries(
                Array.from(this.metrics.executionTimes.entries()).map(([label, times]) => [
                    label,
                    {
                        average: this.getAverageExecutionTime(label),
                        min: Math.min(...times),
                        max: Math.max(...times),
                        count: times.length
                    }
                ])
            )
        };
    }
}

// Create global instance
const performanceMonitor = new PerformanceMonitor();
window.PerformanceMonitor = PerformanceMonitor;
window.performanceMonitor = performanceMonitor;
