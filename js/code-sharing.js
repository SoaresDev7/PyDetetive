/**
 * Code Sharing - Sistema de compartilhamento e exportação de código
 * Permite salvar e compartilhar soluções de missões
 */

class CodeSharing {
    constructor() {
        this.solutions = new Map();
        this.initialized = false;
    }

    /**
     * Inicializa o sistema
     */
    initialize() {
        if (this.initialized) return;
        this.addStyles();
        this.loadSolutions();
        this.initialized = true;
    }

    /**
     * Adiciona estilos
     */
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .code-sharing-panel {
                background: var(--bg-secondary, #f8f9fa);
                border: 2px solid #4ECDC4;
                border-radius: 8px;
                padding: 12px;
                margin: 12px 0;
            }

            .sharing-button-group {
                display: flex;
                gap: 8px;
                margin: 8px 0;
                flex-wrap: wrap;
            }

            .share-btn {
                background: linear-gradient(135deg, #4ECDC4 0%, #00D2FC 100%);
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 12px;
                display: flex;
                align-items: center;
                gap: 6px;
            }

            .share-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(78, 205, 196, 0.3);
            }

            .share-btn.danger {
                background: linear-gradient(135deg, #FF6B6B 0%, #FF8A80 100%);
            }

            .share-btn.danger:hover {
                box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
            }

            .code-snapshot {
                background: var(--bg-light, #ffffff);
                border: 1px solid var(--border-color, #e0e0e0);
                border-radius: 4px;
                padding: 8px;
                margin: 8px 0;
                font-family: 'Fira Code', monospace;
                font-size: 11px;
                line-height: 1.4;
                max-height: 120px;
                overflow-y: auto;
                color: var(--text-dark, #2d3748);
            }

            .export-modal {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                border: 3px solid #4ECDC4;
                border-radius: 12px;
                padding: 24px;
                max-width: 500px;
                width: 90%;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                z-index: 2000;
                animation: modalSlideIn 0.3s ease-out;
            }

            @keyframes modalSlideIn {
                from {
                    opacity: 0;
                    transform: translate(-50%, -48%);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%);
                }
            }

            .export-modal-backdrop {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                z-index: 1999;
            }

            .export-modal h2 {
                color: #4ECDC4;
                margin: 0 0 16px;
            }

            .export-modal textarea {
                width: 100%;
                height: 200px;
                font-family: 'Fira Code', monospace;
                font-size: 11px;
                padding: 8px;
                border: 1px solid var(--border-color, #e0e0e0);
                border-radius: 4px;
                resize: vertical;
                margin: 8px 0;
            }

            .export-modal-buttons {
                display: flex;
                gap: 8px;
                margin-top: 16px;
            }

            .export-modal-buttons button {
                flex: 1;
                padding: 8px 16px;
                border: none;
                border-radius: 6px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .export-modal-buttons .confirm {
                background: #4ECDC4;
                color: white;
            }

            .export-modal-buttons .confirm:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(78, 205, 196, 0.3);
            }

            .export-modal-buttons .cancel {
                background: var(--bg-secondary, #f8f9fa);
                color: var(--text-dark, #2d3748);
                border: 1px solid var(--border-color, #e0e0e0);
            }

            .export-modal-buttons .cancel:hover {
                background: var(--bg-light, #ffffff);
            }

            .share-link {
                background: var(--bg-light, #ffffff);
                border: 1px solid #4ECDC4;
                border-radius: 4px;
                padding: 8px 12px;
                margin: 8px 0;
                word-break: break-all;
                font-family: 'Fira Code', monospace;
                font-size: 11px;
                color: var(--text-dark, #2d3748);
            }

            .copy-icon {
                cursor: copy;
                margin-left: 8px;
                opacity: 0.6;
                transition: opacity 0.3s ease;
            }

            .copy-icon:hover {
                opacity: 1;
            }

            .solution-item {
                background: var(--bg-light, #ffffff);
                border-left: 4px solid #4ECDC4;
                padding: 8px 12px;
                margin: 4px 0;
                border-radius: 4px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: all 0.3s ease;
            }

            .solution-item:hover {
                box-shadow: 0 2px 8px rgba(78, 205, 196, 0.2);
            }

            .solution-meta {
                font-size: 11px;
                color: var(--text-light, #718096);
            }

            .checkmark {
                color: #6BCF7F;
                font-weight: 600;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Salva uma solução
     */
    saveSolution(phaseId, missionId, code, timestamp = null) {
        const key = `${phaseId}-${missionId}`;
        const solution = {
            code,
            timestamp: timestamp || new Date().toISOString(),
            size: code.length
        };

        this.solutions.set(key, solution);
        this.persistSolutions();

        return solution;
    }

    /**
     * Carrega solução
     */
    loadSolution(phaseId, missionId) {
        const key = `${phaseId}-${missionId}`;
        return this.solutions.get(key);
    }

    /**
     * Obtém todas as soluções
     */
    getAllSolutions() {
        return Object.fromEntries(this.solutions);
    }

    /**
     * Persiste soluções no localStorage
     */
    persistSolutions() {
        const data = Object.fromEntries(this.solutions);
        localStorage.setItem('pydetetive_solutions', JSON.stringify(data));
    }

    /**
     * Carrega soluções do localStorage
     */
    loadSolutions() {
        const saved = localStorage.getItem('pydetetive_solutions');
        if (saved) {
            const data = JSON.parse(saved);
            Object.entries(data).forEach(([key, solution]) => {
                this.solutions.set(key, solution);
            });
        }
    }

    /**
     * Exporta solução como arquivo
     */
    exportAsFile(phaseId, missionId, filename = null) {
        const solution = this.loadSolution(phaseId, missionId);
        if (!solution) return null;

        const file = new Blob([solution.code], { type: 'text/plain' });
        const url = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename || `missao-${phaseId}-${missionId}.py`;
        link.click();
        URL.revokeObjectURL(url);

        return true;
    }

    /**
     * Cria link de compartilhamento
     */
    generateShareLink(phaseId, missionId) {
        const solution = this.loadSolution(phaseId, missionId);
        if (!solution) return null;

        const encoded = btoa(solution.code);
        const link = `${window.location.origin}${window.location.pathname}?code=${encoded}&phase=${phaseId}&mission=${missionId}`;

        return link;
    }

    /**
     * Carrega código de URL
     */
    loadFromURL(urlParams) {
        const code = urlParams.get('code');
        const phaseId = urlParams.get('phase');
        const missionId = urlParams.get('mission');

        if (code && phaseId && missionId) {
            try {
                const decoded = atob(code);
                return {
                    code: decoded,
                    phaseId: parseInt(phaseId),
                    missionId: parseInt(missionId)
                };
            } catch (e) {
                return null;
            }
        }

        return null;
    }

    /**
     * Mostra modal de exportação
     */
    showExportModal(phaseId, missionId) {
        const solution = this.loadSolution(phaseId, missionId);
        if (!solution) return;

        // Criar backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'export-modal-backdrop';
        document.body.appendChild(backdrop);

        // Criar modal
        const modal = document.createElement('div');
        modal.className = 'export-modal';
        modal.innerHTML = `
            <h2>Exportar Solução</h2>
            <p>Sua solução:</p>
            <textarea readonly>${solution.code}</textarea>
            <div style="display: flex; gap: 8px; align-items: center; margin: 8px 0;">
                <button onclick="navigator.clipboard.writeText(this.nextElementSibling.value); this.textContent='✓ Copiado!';" style="padding: 4px 8px; background: #4ECDC4; color: white; border: none; border-radius: 4px; cursor: pointer;">Copiar</button>
                <input type="text" value="${this.generateShareLink(phaseId, missionId)}" readonly style="flex: 1; padding: 4px 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 11px;">
            </div>
            <div class="export-modal-buttons">
                <button class="confirm" onclick="this.closest('.export-modal').previousElementSibling.remove(); this.closest('.export-modal').remove();">Fechar</button>
            </div>
        `;
        document.body.appendChild(modal);

        backdrop.addEventListener('click', () => {
            backdrop.remove();
            modal.remove();
        });
    }

    /**
     * Apaga uma solução
     */
    deleteSolution(phaseId, missionId) {
        const key = `${phaseId}-${missionId}`;
        this.solutions.delete(key);
        this.persistSolutions();
    }

    /**
     * Conta soluções salvas
     */
    getSolutionCount() {
        return this.solutions.size;
    }

    /**
     * Obtém estatísticas de soluções
     */
    getStats() {
        let totalLines = 0;
        let totalChars = 0;
        let avgSize = 0;

        this.solutions.forEach(solution => {
            totalLines += solution.code.split('\n').length;
            totalChars += solution.code.length;
        });

        if (this.solutions.size > 0) {
            avgSize = totalChars / this.solutions.size;
        }

        return {
            count: this.solutions.size,
            totalLines,
            totalChars,
            avgSize: Math.round(avgSize)
        };
    }
}

// Create global instance
const codeSharing = new CodeSharing();
window.CodeSharing = CodeSharing;
window.codeSharing = codeSharing;
