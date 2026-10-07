/**
 * UIManager - Gerencia toda a interface do usuário e navegação
 * Responsabilidades:
 * - Navegação entre telas (intro, app, teacher, manual)
 * - Atualização de UI baseado em estado
 * - Event listeners e interações
 * - Tema claro/escuro
 */

class UIManager {
    constructor() {
        this.currentScreen = 'intro';
        this.currentPhaseIndex = 0;
        this.currentMissionIndex = null;
        this.introPanel = 0;
        this.teacherUnlocked = false;
        this.editorLineCount = 0;
        this.initializeEventListeners();
    }

    /**
     * Inicializa todos os event listeners
     */
    initializeEventListeners() {
        // Intro Screen
        document.getElementById('introNextBtn')?.addEventListener('click', () => this.nextIntroPanel());
        document.getElementById('introPrevBtn')?.addEventListener('click', () => this.prevIntroPanel());
        document.getElementById('introSkipBtn')?.addEventListener('click', () => this.skipIntro());

        document.querySelectorAll('.indicator').forEach(ind => {
            ind.addEventListener('click', (e) => {
                const panel = parseInt(e.target.dataset.panel);
                this.goToIntroPanel(panel);
            });
        });

        // Navigation
        document.getElementById('navTeacherBtn')?.addEventListener('click', () => this.showScreen('teacher'));
        document.getElementById('navManualBtn')?.addEventListener('click', () => this.showScreen('manual'));
        document.getElementById('backFromTeacherBtn')?.addEventListener('click', () => this.showScreen('app'));
        document.getElementById('backFromManualBtn')?.addEventListener('click', () => this.showScreen('app'));

        // Theme Toggle
        document.getElementById('themeToggleBtn')?.addEventListener('click', () => this.toggleTheme());

        // Teacher Dashboard
        document.getElementById('verifyAccessBtn')?.addEventListener('click', () => this.verifyTeacherAccess());
        document.getElementById('resetProgressBtn')?.addEventListener('click', () => this.resetProgress());
        document.getElementById('exportDataBtn')?.addEventListener('click', () => this.exportData());

        // Manual Sections
        document.querySelectorAll('.manual-section-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchManualSection(e.target.dataset.section));
        });

        // Editor
        document.getElementById('editor')?.addEventListener('input', () => this.updateLineNumbers());
        document.getElementById('editor')?.addEventListener('scroll', (e) => {
            const gutter = document.getElementById('editorGutter');
            if (gutter) gutter.scrollTop = e.target.scrollTop;
        });

        document.getElementById('clearOutputBtn')?.addEventListener('click', () => {
            document.getElementById('output').innerHTML = '<p class="output-placeholder">Clique em "Executar" para ver o resultado...</p>';
        });

        // Start with intro
        this.showScreen('intro');
    }

    /**
     * Muda para uma tela específica
     */
    showScreen(screenName) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Show target screen
        const screen = document.getElementById(screenName + 'Screen');
        if (screen) {
            screen.classList.add('active');
            this.currentScreen = screenName;

            // Initialize screen if needed
            if (screenName === 'app' && !this.appInitialized) {
                this.initializeAppScreen();
                this.appInitialized = true;
            }
        }
    }

    /**
     * Inicializa a tela principal da aplicação
     */
    initializeAppScreen() {
        // Será chamado por app.js
    }

    /**
     * Navega para próximo painel da intro
     */
    nextIntroPanel() {
        if (this.introPanel < 2) {
            this.goToIntroPanel(this.introPanel + 1);
        } else {
            this.skipIntro();
        }
    }

    /**
     * Navega para painel anterior da intro
     */
    prevIntroPanel() {
        if (this.introPanel > 0) {
            this.goToIntroPanel(this.introPanel - 1);
        }
    }

    /**
     * Vai para um painel específico da intro
     */
    goToIntroPanel(panelIndex) {
        // Hide all panels
        document.querySelectorAll('.intro-panel').forEach(panel => {
            panel.classList.remove('active');
        });

        // Update indicators
        document.querySelectorAll('.indicator').forEach(ind => {
            ind.classList.remove('active');
        });

        // Show target panel
        const panels = document.querySelectorAll('.intro-panel');
        if (panels[panelIndex]) {
            panels[panelIndex].classList.add('active');
            document.querySelector(`.indicator[data-panel="${panelIndex}"]`)?.classList.add('active');
            this.introPanel = panelIndex;
        }

        // Update button states
        document.getElementById('introPrevBtn').disabled = panelIndex === 0;
    }

    /**
     * Pula a introdução
     */
    skipIntro() {
        this.showScreen('app');
    }

    /**
     * Atualiza contagem de linhas do editor
     */
    updateLineNumbers() {
        const editor = document.getElementById('editor');
        if (!editor) return;

        const lines = editor.value.split('\n').length;
        document.getElementById('lineCount')?.textContent = lines;

        // Update gutter
        const gutter = document.getElementById('editorGutter');
        if (gutter) {
            let lineNumbers = '';
            for (let i = 1; i <= lines; i++) {
                lineNumbers += i + '\n';
            }
            gutter.textContent = lineNumbers;
        }
    }

    /**
     * Atualiza exibição de missão
     */
    updateMissionDisplay(mission) {
        if (!mission) return;

        document.getElementById('missionTitle')?.textContent = mission.titulo;
        document.getElementById('missionDescription')?.textContent = mission.descricao;
        document.getElementById('codeTemplate')?.textContent = mission.codigo;
        document.getElementById('expectedOutput')?.textContent = mission.esperado;
        document.getElementById('missionCreditsValue')?.textContent = mission.creditos;

        // Load template code into editor
        document.getElementById('editor').value = mission.codigo;
        this.updateLineNumbers();
    }

    /**
     * Renderiza lista de fases
     */
    renderPhases(phases) {
        const selector = document.getElementById('phaseSelector');
        if (!selector) return;

        selector.innerHTML = '';
        phases.forEach((phase, idx) => {
            const btn = document.createElement('button');
            btn.className = 'phase-btn' + (idx === this.currentPhaseIndex ? ' active' : '');
            btn.textContent = phase.nome;
            btn.addEventListener('click', () => this.selectPhase(idx, phase));
            selector.appendChild(btn);
        });
    }

    /**
     * Seleciona uma fase
     */
    selectPhase(index, phase) {
        this.currentPhaseIndex = index;
        this.currentMissionIndex = null;

        // Update active button
        document.querySelectorAll('.phase-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.phase-btn')[index]?.classList.add('active');

        // Update phase display
        document.getElementById('currentPhaseDisplay')?.textContent = phase.nome;

        // Render missions
        this.renderMissions(phase.missoes);

        // Dispatch custom event for app.js to handle
        window.dispatchEvent(new CustomEvent('phaseSelected', { detail: { index, phase } }));
    }

    /**
     * Renderiza lista de missões
     */
    renderMissions(missions) {
        const list = document.getElementById('missionsList');
        if (!list) return;

        list.innerHTML = '';
        missions.forEach((mission, idx) => {
            const div = document.createElement('div');
            div.className = 'mission';
            div.innerHTML = `
                <strong>${idx + 1}. ${mission.titulo}</strong>
                <p>${mission.descricao}</p>
            `;
            div.addEventListener('click', () => this.selectMission(idx, mission));
            list.appendChild(div);
        });
    }

    /**
     * Seleciona uma missão
     */
    selectMission(index, mission) {
        this.currentMissionIndex = index;

        // Update active mission
        document.querySelectorAll('.mission').forEach((m, i) => {
            m.classList.toggle('active', i === index);
        });

        // Update mission display
        this.updateMissionDisplay(mission);

        // Dispatch custom event for app.js
        window.dispatchEvent(new CustomEvent('missionSelected', { detail: { index, mission } }));
    }

    /**
     * Marca missão como completada
     */
    markMissionCompleted(missionId) {
        const missions = document.querySelectorAll('.mission');
        missions.forEach(m => {
            if (m.dataset.missionId === String(missionId)) {
                m.classList.add('completed');
            }
        });
    }

    /**
     * Atualiza display de variáveis
     */
    updateVariablesDisplay(variables) {
        const varsList = document.getElementById('variablesList');
        if (!varsList || !variables || Object.keys(variables).length === 0) {
            if (varsList) varsList.innerHTML = '<p style="color: var(--text-light); font-size: 11px;">Nenhuma variável definida</p>';
            return;
        }

        let html = '';
        for (const [name, info] of Object.entries(variables)) {
            html += `
                <div class="variable-item">
                    <div class="variable-name">${name}</div>
                    <div class="variable-type">${info.type}</div>
                    <div class="variable-value">${info.value}</div>
                </div>
            `;
        }
        varsList.innerHTML = html;
    }

    /**
     * Atualiza output/resultado
     */
    updateOutput(content, isError = false) {
        const output = document.getElementById('output');
        if (!output) return;

        const className = isError ? 'output-error' : 'output-success';
        output.innerHTML = `<div class="${className}">${content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>`;
    }

    /**
     * Atualiza créditos
     */
    updateCredits(credits, animate = true) {
        const creditsEl = document.getElementById('creditsValue');
        if (!creditsEl) return;

        creditsEl.textContent = credits;

        if (animate) {
            creditsEl.classList.add('animate-jump');
            setTimeout(() => creditsEl.classList.remove('animate-jump'), 400);
        }
    }

    /**
     * Alterna tema claro/escuro
     */
    toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('pydetetive_theme', newTheme);

        const btn = document.getElementById('themeToggleBtn');
        if (btn) {
            btn.textContent = newTheme === 'dark' ? '☀️ Tema' : '🌙 Tema';
        }
    }

    /**
     * Carrega tema salvo
     */
    loadTheme() {
        const saved = localStorage.getItem('pydetetive_theme') || 'light';
        document.documentElement.setAttribute('data-theme', saved);

        const btn = document.getElementById('themeToggleBtn');
        if (btn) {
            btn.textContent = saved === 'dark' ? '☀️ Tema' : '🌙 Tema';
        }
    }

    /**
     * Verifica acesso do professor
     */
    verifyTeacherAccess() {
        const input = document.getElementById('accessCode');
        const message = document.getElementById('accessMessage');
        if (!input || !message) return;

        const code = input.value.trim();

        // Simple validation (in real app, this would be more secure)
        if (code === '1234' || code === 'professor') {
            this.teacherUnlocked = true;
            message.textContent = '✓ Acesso de professor desbloqueado!';
            message.className = 'access-message show success';
            document.getElementById('teacherDashboard')?.classList.remove('hidden');
            input.disabled = true;
            document.getElementById('verifyAccessBtn').disabled = true;
            this.updateTeacherDashboard();
        } else {
            message.textContent = '✗ Código de acesso inválido';
            message.className = 'access-message show error';
        }
    }

    /**
     * Atualiza dashboard do professor
     */
    updateTeacherDashboard() {
        // Will be called with actual data from storage
        if (window.missionValidator && window.missionValidator.storage) {
            window.missionValidator.storage.getProgress().then(progress => {
                document.getElementById('totalMissionsCompleted').textContent =
                    `${progress.completedMissions.length}/12`;
                document.getElementById('totalCreditsEarned').textContent =
                    progress.totalCredits;
                document.getElementById('totalAttempts').textContent =
                    Object.values(progress.attempts).reduce((sum, att) => sum + att.count, 0);
            });
        }
    }

    /**
     * Reseta progresso
     */
    resetProgress() {
        if (confirm('Tem certeza que deseja resetar todo o progresso?')) {
            if (window.missionValidator && window.missionValidator.storage) {
                window.missionValidator.storage.clear();
                this.updateTeacherDashboard();
                alert('Progresso resetado com sucesso!');
            }
        }
    }

    /**
     * Exporta dados
     */
    exportData() {
        if (window.missionValidator && window.missionValidator.storage) {
            window.missionValidator.storage.getProgress().then(progress => {
                const data = JSON.stringify(progress, null, 2);
                const blob = new Blob([data], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'pydetetive-progresso.json';
                a.click();
                URL.revokeObjectURL(url);
            });
        }
    }

    /**
     * Muda seção do manual
     */
    switchManualSection(sectionIndex) {
        // Hide all sections
        document.querySelectorAll('.manual-section').forEach(section => {
            section.classList.remove('active');
        });

        // Update buttons
        document.querySelectorAll('.manual-section-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.section === sectionIndex);
        });

        // Show selected section
        document.querySelector(`.manual-section[data-section="${sectionIndex}"]`)?.classList.add('active');
    }

    /**
     * Mostra feedback visual
     */
    showFeedback(message, type = 'info') {
        const output = document.getElementById('output');
        if (!output) return;

        const className = type === 'error' ? 'output-error' : type === 'success' ? 'output-success' : 'output-info';
        const emoji = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';

        output.innerHTML = `<div class="${className}">${emoji} ${message}</div>`;
    }

    /**
     * Mostra mensagem de status
     */
    showStatus(message, duration = 3000) {
        const status = document.getElementById('statusMessage');
        if (!status) return;

        status.textContent = message;
        setTimeout(() => {
            status.textContent = '';
        }, duration);
    }

    /**
     * Atualiza fase display
     */
    updatePhaseDisplay(phaseName) {
        document.getElementById('currentPhaseDisplay')?.textContent = phaseName;
    }
}

// Create global instance
const uiManager = new UIManager();

// Export for use
window.UIManager = UIManager;
window.uiManager = uiManager;
