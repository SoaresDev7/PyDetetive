// Instâncias globais
let pyodideManager = null;
let missionValidator = null;
let currentPhase = null;
let currentMission = null;
let phases = [];
let credits = 0;
let attemptCount = 0;

// Inicializar Pyodide com novo gerenciador
async function initPyodide() {
    try {
        pyodideManager = new PyodideManager();
        const result = await pyodideManager.init();

        if (result.success) {
            updateOutput('✓ ' + result.message);
        } else {
            updateOutput('✗ ' + result.message);
        }
    } catch (e) {
        updateOutput('✗ Erro ao carregar Python: ' + e.message);
    }
}

// Carregar fases do arquivo JSON
async function loadPhases() {
    try {
        const response = await fetch('data/phases.json');
        phases = await response.json();

        // Inicializar validador
        missionValidator = new MissionValidator();

        // Recuperar créditos salvos
        const savedCredits = await missionValidator.storage.getCredits();
        credits = savedCredits;
        document.getElementById('creditsValue').textContent = credits;

        renderPhaseSelector();
    } catch (e) {
        updateOutput('✗ Erro ao carregar as fases: ' + e.message);
    }
}

// Renderizar seletor de fases
function renderPhaseSelector() {
    const selector = document.getElementById('phaseSelector');
    selector.innerHTML = '';

    phases.forEach(phase => {
        const btn = document.createElement('button');
        btn.className = 'phase-btn';
        btn.textContent = phase.nome;
        btn.onclick = () => switchPhase(phase, btn);
        selector.appendChild(btn);
    });
}

// Trocar de fase
async function switchPhase(phase, btn) {
    currentPhase = phase;
    currentMission = null;
    attemptCount = 0;

    // Atualizar botões ativos
    document.querySelectorAll('.phase-btn').forEach(b => {
        b.classList.remove('active');
    });
    btn.classList.add('active');

    // Atualizar informações da fase
    document.getElementById('phaseInfo').textContent = phase.descricao;

    // Renderizar missões
    renderMissions();

    // Limpar estado do Pyodide
    if (pyodideManager && pyodideManager.isReady) {
        await pyodideManager.clearState();
    }

    // Carregar primeiro código de exemplo
    if (phase.missoes.length > 0) {
        currentMission = phase.missoes[0];
        document.getElementById('editor').value = currentMission.codigo;
        document.getElementById('output').textContent = '';
    }
}

// Renderizar missões na sidebar
async function renderMissions() {
    const missionsList = document.getElementById('missionsList');
    missionsList.innerHTML = '';

    if (!currentPhase) return;

    const completedMissions = missionValidator ?
        await missionValidator.storage.getCompletedMissions() : [];

    currentPhase.missoes.forEach((mission, index) => {
        const div = document.createElement('div');
        const isCompleted = completedMissions.includes(mission.id);

        div.className = 'mission' + (isCompleted ? ' completed' : '');
        div.innerHTML = `
            <strong>${isCompleted ? '✓ ' : ''}${index + 1}. ${mission.titulo}</strong>
            <p>${mission.descricao}</p>
        `;
        div.onclick = async () => {
            currentMission = mission;
            attemptCount = 0;
            document.getElementById('editor').value = mission.codigo;
            document.getElementById('output').textContent = '';

            // Limpar estado do Pyodide
            if (pyodideManager && pyodideManager.isReady) {
                await pyodideManager.clearState();
            }
        };
        missionsList.appendChild(div);
    });
}

// Atualizar output
function updateOutput(text) {
    document.getElementById('output').textContent = text;
}

// Executar código Python
async function executarCodigo() {
    if (!pyodideManager || !pyodideManager.isReady) {
        updateOutput('✗ Python não está pronto. Aguarde...');
        return;
    }

    const code = document.getElementById('editor').value;
    if (!code.trim()) {
        updateOutput('✗ Escreva algum código para executar.');
        return;
    }

    updateOutput('⏳ Executando...');
    attemptCount++;

    try {
        // Executar com novo gerenciador
        const result = await pyodideManager.runCode(code);

        if (result.error) {
            updateOutput('✗ Erro:\n' + result.error);

            // Oferecer dica se há missão ativa
            if (currentMission && missionValidator) {
                const hint = missionValidator.getHint(currentMission, attemptCount);
                updateOutput(`✗ Erro:\n${result.error}\n\n💡 Dica ${attemptCount}/${3}:\n${hint}`);
            }
            return;
        }

        const output = result.output;

        // Se há missão ativa, validar resultado
        if (currentMission && missionValidator) {
            // Análise estática do código
            const codeAnalysis = missionValidator.analyzeCode(code);

            const validation = await missionValidator.validate(
                output,
                currentMission.esperado,
                currentMission.id
            );

            // Calcular score de similaridade (0-100%)
            const similarityScore = missionValidator.calculateSimilarity(
                output,
                currentMission.esperado
            );

            // Feedback com score
            let feedback = validation.feedback;
            if (!validation.passed && similarityScore > 0) {
                feedback += `\n📊 Similaridade: ${similarityScore}%`;
            }

            updateOutput(feedback);

            // Se passou, adicionar créditos
            if (validation.passed) {
                const newCredits = await missionValidator.completeMission(
                    currentMission.id,
                    currentMission.creditos
                );
                credits = newCredits;
                document.getElementById('creditsValue').textContent = credits;

                // Animar
                const creditElement = document.getElementById('creditsValue');
                creditElement.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    creditElement.style.transform = 'scale(1)';
                }, 300);
            } else if (attemptCount < 3) {
                // Análise e sugestão de correção
                const suggestion = missionValidator.suggestFix(code, currentMission.esperado);

                // Oferecer próxima dica
                const hint = missionValidator.getHint(currentMission, attemptCount + 1);
                updateOutput(`${feedback}\n\n${suggestion}\n\n💡 Dica ${attemptCount}/${3}:\n${hint}`);
            } else {
                // Mostrar sugestão quando não há mais dicas
                const suggestion = missionValidator.suggestFix(code, currentMission.esperado);
                updateOutput(`${feedback}\n\n${suggestion}`);
            }
        } else {
            // Sem missão ativa, apenas mostrar resultado
            updateOutput(`✓ Executado com sucesso!\n\n${output}`);
        }

    } catch (e) {
        updateOutput('✗ Erro inesperado:\n' + e.message);
    }
}

// Event listeners
document.getElementById('runBtn').addEventListener('click', executarCodigo);
document.getElementById('clearBtn').addEventListener('click', () => {
    document.getElementById('output').textContent = '';
});

// Inicializar ao carregar a página
window.addEventListener('load', () => {
    initPyodide();
    loadPhases();
});
