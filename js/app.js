/**
 * PyDetetive Main Application
 * Orquestra a integração de todas as funcionalidades
 */

// Global instances
let pyodideManager = null;
let missionValidator = null;
let currentPhase = null;
let currentMission = null;
let phases = [];
let attemptCount = 0;
let appReady = false;

/**
 * Inicializa Pyodide e carrega as fases
 */
async function initApp() {
    try {
        // Inicializar UIManager
        uiManager.loadTheme();

        // Inicializar Pyodide
        uiManager.showStatus('Carregando Python...');
        pyodideManager = new PyodideManager();
        const result = await pyodideManager.init();

        if (!result.success) {
            uiManager.showFeedback('Erro ao carregar Python: ' + result.message, 'error');
            return;
        }

        uiManager.showStatus('Python carregado com sucesso! ✓');

        // Inicializar Mission Validator
        missionValidator = new MissionValidator();

        // Carregar fases
        await loadPhases();

        // Marcar app como pronto
        appReady = true;

        // Event listeners
        setupEventListeners();

        uiManager.showStatus('Aplicação pronta!');
    } catch (e) {
        uiManager.showFeedback('Erro ao inicializar: ' + e.message, 'error');
        console.error('Init error:', e);
    }
}

/**
 * Carrega as fases do arquivo JSON
 */
async function loadPhases() {
    try {
        const response = await fetch('data/phases.json');
        phases = await response.json();

        // Recuperar créditos salvos
        const savedCredits = await missionValidator.storage.getCredits();
        uiManager.updateCredits(savedCredits, false);

        // Renderizar fases
        uiManager.renderPhases(phases);

        // Selecionar primeira fase
        if (phases.length > 0) {
            uiManager.selectPhase(0, phases[0]);
        }
    } catch (e) {
        uiManager.showFeedback('Erro ao carregar fases: ' + e.message, 'error');
    }
}

/**
 * Configura event listeners
 */
function setupEventListeners() {
    // Run button
    document.getElementById('runBtn')?.addEventListener('click', executarCodigo);

    // Clear editor button
    document.getElementById('clearBtn')?.addEventListener('click', () => {
        if (confirm('Deseja limpar o editor?')) {
            document.getElementById('editor').value = '';
            uiManager.updateLineNumbers();
        }
    });

    // Hint button
    document.getElementById('hintBtn')?.addEventListener('click', solicitarDica);

    // Phase selection event
    window.addEventListener('phaseSelected', (e) => {
        currentPhase = e.detail.phase;
        currentMission = null;
        attemptCount = 0;
        if (pyodideManager && pyodideManager.isReady) {
            pyodideManager.clearState();
        }
    });

    // Mission selection event
    window.addEventListener('missionSelected', (e) => {
        currentMission = e.detail.mission;
        attemptCount = 0;
        document.getElementById('output').innerHTML = '<p class="output-placeholder">Clique em "Executar" para testar seu código...</p>';
        if (pyodideManager && pyodideManager.isReady) {
            pyodideManager.clearState();
        }
    });
}

/**
 * Executa código Python
 */
async function executarCodigo() {
    if (!appReady || !pyodideManager || !pyodideManager.isReady) {
        uiManager.showFeedback('Python não está pronto. Aguarde...', 'error');
        return;
    }

    const code = document.getElementById('editor').value;
    if (!code.trim()) {
        uiManager.showFeedback('Escreva algum código para executar.', 'error');
        return;
    }

    uiManager.showStatus('⏳ Executando código...');
    attemptCount++;

    try {
        // Executar código
        const result = await pyodideManager.runCode(code);

        // Atualizar variáveis
        if (result.error) {
            // Erro na execução
            uiManager.showFeedback(`❌ Erro:\n${result.error}`, 'error');

            // Oferecer dica
            if (currentMission && missionValidator) {
                const hint = missionValidator.getHint(currentMission, attemptCount);
                uiManager.showFeedback(
                    `❌ Erro:\n${result.error}\n\n💡 Dica ${attemptCount}/${3}:\n${hint}`,
                    'error'
                );
            }
            return;
        }

        const output = result.output;

        // Atualizar display de variáveis
        const variables = await pyodideManager.getLocalVariables();
        uiManager.updateVariablesDisplay(variables);

        // Validar resultado se houver missão ativa
        if (currentMission && missionValidator) {
            // Análise estática
            const codeAnalysis = missionValidator.analyzeCode(code);

            // Validação
            const validation = await missionValidator.validate(
                output,
                currentMission.esperado,
                currentMission.id
            );

            // Calcular similaridade
            const similarityScore = missionValidator.calculateSimilarity(
                output,
                currentMission.esperado
            );

            // Construir feedback
            let feedback = validation.feedback;

            if (validation.passed) {
                // Missão completada!
                const newCredits = await missionValidator.completeMission(
                    currentMission.id,
                    currentMission.creditos
                );

                uiManager.updateCredits(newCredits);
                uiManager.markMissionCompleted(currentMission.id);
                uiManager.showFeedback(`✅ Parabéns! Você ganhou ${currentMission.creditos} créditos!`, 'success');

                // Animação
                const creditElement = document.getElementById('creditsValue');
                if (creditElement) {
                    creditElement.classList.add('animate-jump');
                    setTimeout(() => creditElement.classList.remove('animate-jump'), 400);
                }
            } else {
                // Missão não completada
                feedback += `\n📊 Similaridade: ${similarityScore}%`;

                if (attemptCount < 3) {
                    // Oferecer sugestão e dica
                    const suggestion = missionValidator.suggestFix(code, currentMission.esperado);
                    const hint = missionValidator.getHint(currentMission, attemptCount);
                    feedback += `\n\n${suggestion}\n\n💡 Dica ${attemptCount}/${3}:\n${hint}`;
                }

                uiManager.showFeedback(feedback, 'error');
            }
        } else {
            // Sem missão ativa
            uiManager.showFeedback(`✓ Executado com sucesso!\n\n${output}`, 'success');
        }

    } catch (e) {
        uiManager.showFeedback(`Erro inesperado: ${e.message}`, 'error');
        console.error('Execution error:', e);
    } finally {
        uiManager.showStatus('');
    }
}

/**
 * Solicita dica
 */
async function solicitarDica() {
    if (!currentMission || !missionValidator) {
        uiManager.showFeedback('Selecione uma missão primeiro', 'error');
        return;
    }

    if (attemptCount === 0) {
        uiManager.showFeedback('Faça uma tentativa antes de pedir dica!', 'info');
        return;
    }

    if (attemptCount >= 3) {
        uiManager.showFeedback('Você já recebeu todas as dicas!', 'info');
        return;
    }

    const hint = missionValidator.getHint(currentMission, attemptCount + 1);
    uiManager.showFeedback(`💡 Dica ${attemptCount + 1}/${3}:\n${hint}`, 'info');
}

/**
 * Atualiza metrics display
 */
function updateMetrics() {
    if (!pyodideManager) return;

    const metrics = pyodideManager.getMetrics();
    console.log('Execution metrics:', metrics);
}

/**
 * Inicializa quando documento estiver pronto
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔍 PyDetetive iniciando...');
    initApp();
});

/**
 * Exportar para acesso global
 */
window.executarCodigo = executarCodigo;
window.solicitarDica = solicitarDica;
window.updateMetrics = updateMetrics;
