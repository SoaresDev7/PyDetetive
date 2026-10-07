# PyDetetive - Documentação Técnica

## Arquitetura do Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                    Interface do Usuário                       │
│                      (index.html)                             │
└────────────────────┬────────────────────────────────────────┘
                     │
         ┌───────────┼───────────┐
         │           │           │
    ┌────▼────┐ ┌────▼────┐ ┌───▼─────┐
    │ app.js  │ │ editor  │ │ output  │
    └────┬────┘ └─────────┘ └─────────┘
         │
    ┌────┴──────────────────────────────┐
    │   Sistema de Gerenciamento        │
    └────┬──────────────────────────────┘
         │
         ├──► PyodideManager v2.0
         │    - Execução de código Python
         │    - Captura de output/stderr
         │    - Performance tracking
         │
         ├──► MissionValidator v2.0
         │    - Validação de resultados
         │    - Análise estática
         │    - Sistema de dicas
         │
         └──► LocalStorageManager
              - Persistência de dados
              - Progresso do usuário
              - Créditos
```

---

## Módulos Principais

### 1. PyodideManager v2.0 (`js/pyodide-manager.js`)

**Responsabilidade:** Gerenciar execução de código Python com Pyodide

#### Métodos Principais:
```javascript
// Inicialização
await pyodideManager.init()

// Execução
const result = await pyodideManager.runCode(code)
// Retorna: {output, stderr, error, metrics}

// Inspeção
const vars = await pyodideManager.getLocalVariables()
// Retorna: {varName: {type, value}, ...}

// Métricas
const metrics = pyodideManager.getMetrics()
// Retorna: {totalExecutions, averageTime, lastExecutionTime}

// Limpeza
await pyodideManager.clearState()
```

#### Recursos:
- ✅ Captura de stdout e stderr separadamente
- ✅ Timeout de 5 segundos para código infinito
- ✅ Validação de indentação básica
- ✅ Rastreamento de variáveis locais
- ✅ Métricas de performance em tempo real
- ✅ Formatação inteligente de erros
- ✅ Cache preparado para compilação AST

#### Erros Suportados:
- SyntaxError
- IndentationError
- NameError
- TypeError
- ValueError
- ZeroDivisionError
- IndexError
- KeyError

---

### 2. MissionValidator v2.0 (`js/mission-validator.js`)

**Responsabilidade:** Validar execução de missões e fornecer feedback inteligente

#### Métodos Principais:
```javascript
// Validação básica
const validation = await missionValidator.validate(output, expected, missionId)
// Retorna: {passed, feedback}

// Análise estática
const analysis = missionValidator.analyzeCode(code)
// Retorna: {hasErrors, patterns, issues, complexity}

// Similaridade (0-100%)
const score = missionValidator.calculateSimilarity(actual, expected)

// Sugestões
const suggestion = missionValidator.suggestFix(code, expected)

// Dicas
const hint = missionValidator.getHint(mission, attemptCount)

// Progresso
const progress = await missionValidator.getProgress()
// Retorna: {completedMissions, totalCredits, attempts}
```

#### Recursos:
- ✅ Validação exata com normalização
- ✅ Análise estática de código
- ✅ Detecção de padrões problematicos
- ✅ Algoritmo de Levenshtein para similaridade
- ✅ Sugestões automáticas de correção
- ✅ Sistema de dicas progressivas (até 3)
- ✅ Análise de complexidade (simples/médio/complexo)

#### Padrões Detectados:
```javascript
{
  'print-without-args': /print\s*\(\s*\)/,
  'missing-print': /^\s*\w+\s*=\s*[^=]/,
  'string-not-quoted': /print\s*\(\s*\w+\s*\)/,
  'missing-colon': /(if|for|while|def)\s+.*[^:]\s*$/m,
  'wrong-indentation': /^[ ]{1,3}(?!$)/m
}
```

---

### 3. LocalStorageManager (`js/mission-validator.js`)

**Responsabilidade:** Persistência de dados do usuário

#### Dados Armazenados:
```javascript
{
  completedMissions: [],    // IDs das missões completadas
  credits: 0,               // Total de créditos
  attempts: {
    missionId: {
      count: 5,             // Tentativas
      passed: true          // Se passou
    }
  },
  currentPhase: 1,
  completedPhases: []
}
```

#### Métodos:
```javascript
// Progresso
await storage.recordAttempt(missionId, passed)
await storage.completeMission(missionId)
await storage.addCredits(amount)

// Consulta
const credits = await storage.getCredits()
const missions = await storage.getCompletedMissions()
const attempts = await storage.getAllAttempts()

// Limpeza
storage.clear()  // Apaga tudo
```

---

## Fluxo de Execução

### 1. Carregamento (ao abrir a página)
```
initPyodide() 
  → PyodideManager.init()
  → setupIO() (redireciona stdout/stderr)
  
loadPhases()
  → Fetch data/phases.json
  → MissionValidator.init()
  → Recupera créditos salvos
  → renderPhaseSelector()
```

### 2. Execução de Código
```
executarCodigo()
  → analyzeCode() [análise estática]
  → pyodideManager.runCode(code)
    → validateCode() [verificação básica]
    → executeWithTimeout() [execução com 5s timeout]
    → Captura output + stderr
    → recordMetrics() [rastreamento]
  → missionValidator.validate() [validação do resultado]
  → calculateSimilarity() [score 0-100%]
  → suggestFix() [sugestão de correção]
  → Feedback ao usuário
```

### 3. Armazenamento
```
Ao completar missão:
  → missionValidator.completeMission()
  → storage.recordAttempt(missionId, true)
  → storage.addCredits(amount)
  → localStorage atualiza
  
Na próxima vez que abre:
  → recupera dados salvos
  → mostra progresso anterior
```

---

## Performance

### Métricas Registradas
- `totalExecutions`: Número total de execuções
- `totalTime`: Tempo total em ms
- `averageTime`: Média de tempo (atualizado a cada execução)
- `lastExecutionTime`: Último tempo de execução

### Benchmarks Esperados
- Execução simples (print): ~100-200ms
- Execução com loops: ~200-500ms
- Execução complexa: ~500-2000ms
- Timeout: 5000ms

### Otimizações
- Cache de compilação (preparado)
- Lazy loading de módulos
- Reutilização de contexto Python

---

## Estrutura de Dados

### Missão (de data/phases.json)
```javascript
{
  id: 1,
  titulo: "Olá Mundo",
  descricao: "Usa print() para exibir uma mensagem",
  codigo: "print(\"Olá, Mundo!\")",
  esperado: "Olá, Mundo!",
  creditos: 10
}
```

### Resultado de Validação
```javascript
{
  passed: true|false,
  feedback: "✅ Parabéns! Missão completada!",
  similarity: 100  // v2.0
}
```

### Resultado de Análise de Código
```javascript
{
  hasErrors: false,
  patterns: ['print-without-args'],
  issues: ['Código não contém print()'],
  complexity: {
    lines: 5,
    hasLoop: false,
    hasCondition: true,
    hasFunction: false,
    level: 'simples'
  }
}
```

---

## Configuração

### Timeout de Execução
```javascript
// Em PyodideManager.constructor()
this.timeout = 5000; // 5 segundos
```

### Limite de Similaridade
```javascript
// Em MissionValidator.isSimilar()
const maxDiff = Math.max(str1.length, str2.length) * 0.2; // 20% de diferença
```

### Limite de Dicas
```javascript
// 3 dicas por missão (em app.js)
if (attemptCount < 3) {
    // Mostrar próxima dica
}
```

---

## Testes e Validação

### Casos de Teste Cobertos

#### PyodideManager
- [ ] print() simples
- [ ] Erro de sintaxe
- [ ] Erro de indentação
- [ ] Variáveis persistem
- [ ] Estado limpa entre missões
- [ ] Timeout funciona
- [ ] Performance < 2s

#### MissionValidator
- [ ] Validação exata
- [ ] Comparação ignora espaços
- [ ] Dicas aparecem progressivamente
- [ ] localStorage salva progresso
- [ ] Análise detecta padrões
- [ ] Similaridade calcula correto
- [ ] Sugestões são relevantes

#### app.js
- [ ] Todas as 12 missões funcionam
- [ ] Créditos acumulam
- [ ] Feedback é claro
- [ ] Progresso persiste
- [ ] Interface responsiva

---

## Debugging

### Console Logs Úteis
```javascript
// Verificar PyodideManager
console.log(pyodideManager.getInfo())

// Verificar MissionValidator
console.log(missionValidator.getProgress())

// Verificar localStorage
localStorage.getItem('pydetetive_data')
```

### Limpeza de Dados (para testes)
```javascript
// No console:
missionValidator.storage.clear()
```

---

## Próximas Melhorias

### Semana 2 (Dias 08-13)
- ✅ Captura de stderr (Dia 07)
- ✅ Análise estática (Dia 07)
- ⏳ Sistema de debug (Dia 09)
- ⏳ Logging estruturado (Dia 10)
- ⏳ Refatoração avançada (Dia 10)
- ⏳ Documentação completa (Dia 11)
- ⏳ Suite de testes (Dia 12)

### Semana 3+ (Frontend)
- Melhorias visuais
- Animações
- Dashboard de progresso
- Exportação de dados

---

## Referências

- [Pyodide Docs](https://pyodide.org/)
- [JavaScript Promises](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [localStorage API](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/localStorage)
- [Levenshtein Distance](https://en.wikipedia.org/wiki/Levenshtein_distance)

---

**Status:** Backend em desenvolvimento ✅  
**Último Update:** 07/10/2026  
**Versão:** 2.0
