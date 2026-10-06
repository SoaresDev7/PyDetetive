let pyodideReady = false;
let currentPhase = null;
let phases = [];
let credits = 0;

// Inicializar Pyodide
async function initPyodide() {
    try {
        await loadPyodide();
        pyodideReady = true;
        updateOutput('✓ Python pronto! Selecione uma fase para começar.');
    } catch (e) {
        updateOutput('✗ Erro ao carregar Python: ' + e.message);
    }
}

// Carregar fases do arquivo JSON
async function loadPhases() {
    try {
        const response = await fetch('data/phases.json');
        phases = await response.json();
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
        btn.onclick = () => switchPhase(phase);
        selector.appendChild(btn);
    });
}

// Trocar de fase
function switchPhase(phase) {
    currentPhase = phase;

    // Atualizar botões ativos
    document.querySelectorAll('.phase-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Atualizar informações da fase
    document.getElementById('phaseInfo').textContent = phase.descricao;

    // Renderizar missões
    renderMissions();

    // Limpar editor
    document.getElementById('editor').value = phase.missoes[0]?.codigo || '';
    document.getElementById('output').textContent = '';
}

// Renderizar missões na sidebar
function renderMissions() {
    const missionsList = document.getElementById('missionsList');
    missionsList.innerHTML = '';

    if (!currentPhase) return;

    currentPhase.missoes.forEach((mission, index) => {
        const div = document.createElement('div');
        div.className = 'mission';
        div.innerHTML = `
            <strong>${index + 1}. ${mission.titulo}</strong>
            <p>${mission.descricao}</p>
        `;
        div.onclick = () => {
            document.getElementById('editor').value = mission.codigo;
            document.getElementById('output').textContent = '';
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
    if (!pyodideReady) {
        updateOutput('✗ Python não está pronto. Aguarde...');
        return;
    }

    const code = document.getElementById('editor').value;
    if (!code.trim()) {
        updateOutput('✗ Escreva algum código para executar.');
        return;
    }

    updateOutput('⏳ Executando...');

    try {
        const result = await pyodide.runPythonAsync(code);
        const output = result || '(sem saída)';
        updateOutput('✓ Executado com sucesso!\n\n' + output);

        // Adicionar créditos se há missão ativa
        if (currentPhase) {
            credits += 10;
            document.getElementById('creditsValue').textContent = credits;
        }
    } catch (e) {
        updateOutput('✗ Erro:\n' + e.message);
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
