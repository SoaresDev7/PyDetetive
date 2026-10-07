# Changelog

## Semana 1 (02-06 Outubro)

### 02/10 - Setup e Editor
- Estrutura base do projeto
- Editor Python com Pyodide

### 03/10 - Fase 1
- Guia completo de Fase 1
- 4 missões: print, variáveis, input, tipos

### 04/10 - Fase 2
- Guia de operadores e cálculos
- Problema prático de análise de horários

### 05/10 - Documentação
- Instruções para professor
- Roadmap das 6 fases

### 06/10 - Finalização
- Changelog e pronto para apresentação

## Semana 2 (07 Outubro)

### 07/10 - Melhorias de Infraestrutura
- **PyodideManager (novo módulo)**: Gerencia execução de código Python com:
  - Captura confiável de stdout usando sys.stdout redirecionamento
  - Timeout de 5 segundos para código infinito
  - Validação básica de indentação
  - Formatação inteligente de mensagens de erro
  - Limpeza de estado entre missões

- **MissionValidator (novo módulo)**: Sistema completo de validação:
  - Normalização de strings (ignora espaços extras)
  - Comparação resultado vs. esperado
  - Sistema de dicas progressivas (3 dicas por missão)
  - Feedback estruturado (sucesso/erro com sugestões)
  - LocalStorageManager para persistência de progresso

- **Integração em app.js**:
  - Rastreamento de tentativas (attemptCount)
  - Validação automática de cada missão
  - Concessão de créditos ao sucesso
  - Animação de créditos
  - Sistema de desbloqueio progressivo

- **Fase 3 - Funções e Modularização**:
  - Missão 9: Função Simples (15 créditos)
  - Missão 10: Função com Parâmetro (20 créditos)
  - Missão 11: Função com Retorno (20 créditos)
  - Missão 12: Múltiplas Funções (25 créditos)
  - Dicas completas para cada missão

- **Consolidação para Distribuição**:
  - PyDetetive-Semana2.html: Arquivo único (self-contained)
  - Inclui todo CSS, JS, dados inline
  - Funciona offline após carregamento do Pyodide
  - Pronto para distribuição aos alunos

- **Arquivos Atualizados**:
  - index.html: Adicionados scripts pyodide-manager.js e mission-validator.js
  - data/phases.json: Adicionada Fase 3 completa
  - CHANGELOG.md: Este documento

### Estrutura Modular Mantida
- js/pyodide-manager.js: 315 linhas
- js/mission-validator.js: 445 linhas
- js/app.js: 214 linhas (atualizado)
- data/phases.json: 120 linhas (expandido)
- css/style.css: 339 linhas (inalterado)
- index.html: 62 linhas (atualizado com referências)

### Status
✅ Pyodide funciona com captura de saída confiável
✅ Validação automática de missões
✅ Progresso persistente em localStorage
✅ 3 fases completas com 12 missões
✅ Arquivo único PyDetetive-Semana2.html pronto
✅ Documentação atualizada
