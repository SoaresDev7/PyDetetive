# Arquitetura do PyDetetive

## Visão Geral

PyDetetive é uma plataforma web gamificada para ensino de Python, construída com uma arquitetura modular e responsiva. A aplicação permite que estudantes executem código Python diretamente no navegador usando Pyodide, sem necessidade de servidor backend.

## Estrutura de Diretórios

```
PyDetetive/
├── index.html              # Ponto de entrada principal
├── css/
│   └── style.css          # Estilos e temas da aplicação
├── js/
│   └── app.js             # Lógica de aplicação
├── data/
│   └── phases.json        # Configuração das fases e missões
├── package.json           # Metadados do projeto
├── Makefile               # Automação de tarefas
├── README.md              # Documentação do usuário
├── ARCHITECTURE.md        # Este arquivo
├── CHANGELOG.md           # Histórico de mudanças
├── INSTRUCOES_PROFESSOR.md # Guia para o professor
├── phase1_guide.md        # Guia pedagógico Fase 1
└── phase2_guide.md        # Guia pedagógico Fase 2
```

## Camadas da Aplicação

### 1. Apresentação (Presentation Layer)

**index.html** - Estrutura HTML semântica com:
- Header com seletor de fases e contador de créditos
- Sidebar com lista de missões e variáveis
- Painel editor com textarea para código Python
- Painel de saída com resultados da execução
- Controles (botões Executar e Limpar)

**css/style.css** - Sistema de design com:
- Variáveis CSS para cores (primária, secundária, sucesso, erro, etc.)
- Design responsivo com flexbox
- Gradientes lineares para visual moderno
- Animações suaves (transições, transforms)
- Tema escuro para o painel de saída
- Scrollbars customizadas
- Mobile-first approach com media queries

### 2. Lógica (Logic Layer)

**js/app.js** - Aplicação principal com funções:
- `initPyodide()` - Inicializa o runtime Python via Pyodide
- `loadPhases()` - Carrega configuração de fases do JSON
- `renderPhaseSelector()` - Renderiza botões de seleção de fase
- `switchPhase()` - Muda a fase ativa
- `renderMissions()` - Renderiza lista de missões
- `executarCodigo()` - Executa código Python com tratamento de erros
- `updateOutput()` - Atualiza painel de saída
- Event listeners para botões e entrada do usuário
- Sistema de créditos

### 3. Dados (Data Layer)

**data/phases.json** - Configuração centralizada contendo:
- Array de fases (Fase 1, Fase 2, etc.)
- Para cada fase:
  - id, nome, descricao
  - Array de missões
- Para cada missão:
  - id, titulo, descricao
  - código de exemplo (starter code)
  - resultado esperado
  - valor em créditos

## Fluxo de Dados

```
1. Carregamento:
   index.html
   ├─→ Carrega css/style.css
   ├─→ Carrega Pyodide via CDN
   └─→ Carrega js/app.js

2. Inicialização:
   app.js
   ├─→ Inicializa Pyodide
   ├─→ Busca data/phases.json
   └─→ Renderiza seletor de fases

3. Interação do Usuário:
   Clique em fase
   └─→ switchPhase()
       ├─→ renderMissions()
       └─→ Popula editor com código de exemplo

4. Execução de Código:
   Clique em "Executar"
   └─→ executarCodigo()
       ├─→ Pega código do textarea
       ├─→ Executa via pyodide.runPythonAsync()
       ├─→ Atualiza output com resultado
       └─→ Adiciona créditos
```

## Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Layout com Flexbox, variáveis CSS, gradientes
- **JavaScript (ES6+)** - Lógica de aplicação, manipulação do DOM
- **Pyodide** - CPython rodando em WebAssembly no navegador
- **Google Fonts** - Tipografia (Inter, Fira Code)

### Ferramentas de Desenvolvimento
- **Git** - Controle de versão
- **Python HTTP Server** - Servidor de desenvolvimento local
- **Make** - Automação de tarefas

## Características Principais

### 1. Execução de Python no Navegador
- Utiliza Pyodide (CPython compilado para WebAssembly)
- Sem necessidade de servidor backend
- Código executado localmente no navegador

### 2. Sistema de Fases e Missões
- Conteúdo progressivo baseado em fases
- Cada fase com múltiplas missões
- Código de exemplo para cada missão
- Sistema de créditos como gamificação

### 3. Interface Responsiva
- Layout adaptável para mobile e desktop
- Painel lateral para navegação (collapsível em mobile)
- Flexbox para layouts flexíveis

### 4. Feedback Visual
- Indicador de carregamento ("⏳ Executando...")
- Mensagens de sucesso ("✓ Executado com sucesso!")
- Mensagens de erro com detalhes
- Animações suaves nas interações

### 5. Persistência Local
- localStorage para salvar progresso (próximas versões)
- Créditos mantidos durante a sessão

## Roadmap Futuro

### Fase 3 - Funções e Modularização
- Conceitos de funções
- Parâmetros e retorno de valores
- Importação de módulos

### Fase 4 - Estruturas de Dados Avançadas
- Dicionários
- Tuplas
- Conjuntos (sets)

### Fase 5 - Análise e Visualização
- Leitura de arquivos
- Processamento de dados
- Gráficos com matplotlib

### Fase 6 - Integração e Projeto Final
- Projeto integrador
- Revisão de conceitos
- Certificado de conclusão

## Desenvolvimento Local

### Iniciar servidor:
```bash
make serve
# ou
python -m http.server 8000
```

### Acessar aplicação:
```
http://localhost:8000
```

### Estrutura de commits:
Cada commit incrementa funcionalidades de forma modular:
- Estrutura base + HTML
- Estilos CSS
- Lógica de aplicação
- Documentação e guias pedagógicos

## Considerações Técnicas

### Vantagens da Arquitetura
- **Modular**: Separação de concerns entre apresentação, lógica e dados
- **Escalável**: Fácil adicionar novas fases e missões via JSON
- **Offline-First**: Funciona sem conexão após carregamento inicial
- **Leve**: Sem dependências de build complexas

### Limitações Atuais
- Pyodide tem limite de performance para operações pesadas
- Sem persistência de dados entre sessões (sem backend)
- Sem suporte para bibliotecas Python externas (a não ser as built-in)

### Segurança
- Código Python executado em sandbox (WebAssembly)
- Sem acesso ao sistema de arquivos do servidor
- Sem chamadas HTTP diretas (apenas via Fetch API)
