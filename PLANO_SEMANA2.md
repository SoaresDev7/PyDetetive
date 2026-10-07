# Plano de Desenvolvimento - Semana 2

## 🎯 Objetivos Principais

1. **Melhorar Pyodide:**
   - ✅ Captura correta de stdout
   - ✅ Suporte a input() do usuário
   - ✅ Tratamento robusto de erros
   - ✅ Timeout para código infinito
   - ✅ Limpeza de estado entre execuções

2. **Melhorar Lógica:**
   - ✅ Validação de código (AST check)
   - ✅ Verificação de resultado esperado
   - ✅ Sistema de dicas/hints
   - ✅ Salvamento de progresso (localStorage)
   - ✅ Unlock de missões progressivas
   - ✅ Feedback estruturado

3. **Adicionar Fase 3:**
   - ✅ Tema: Funções e Modularização
   - ✅ 4 novas missões
   - ✅ Integrada ao sistema

4. **Estrutura:**
   - ✅ Manter modular (CSS, JS, JSON)
   - ✅ Depois unir em arquivo único

---

## 📋 Tarefas Detalhadas

### 1. Melhorias no js/app.js

#### 1.1 Captura de Output
```javascript
// Problema atual: output pode não ser capturado corretamente
// Solução: Usar sys.stdout.write em vez de print() implícito

// Implementar:
- Redirect de stdout
- Buffer de output
- Flush automático
```

#### 1.2 Suporte a input()
```python
# Fase futura, mas preparar:
- Modal para entrada do usuário
- Pausa de execução
- Validação de entrada
```

#### 1.3 Tratamento de Erros Robusto
```javascript
// Melhorias:
- Capturar SyntaxError, IndentationError, etc.
- Extrair linha do erro
- Mostrar snippet de código com erro
- Sugerir correção
```

#### 1.4 Timeout e Limite de Execução
```javascript
// Adicionar:
- Timeout de 5 segundos
- Limite de iterações
- Interrupt button
- Mensagem de timeout
```

### 2. Sistema de Validação de Missões

#### 2.1 Verificação de Resultado
```javascript
// Comparar saída real com esperada
- Strip de espaços em branco
- Comparação linha por linha
- Feedback de acerto/erro

Exemplo:
esperado: "Olá, Mundo!"
recebido: "Olá, Mundo!"
resultado: ✅ Acertou!
```

#### 2.2 Sistema de Dicas
```javascript
// Mostrar dicas progressivas
Dica 1: "Use a função print()"
Dica 2: "O argumento deve ser uma string com aspas"
Dica 3: "print('Olá, Mundo!')"

// Máximo 3 dicas por missão
```

#### 2.3 Salvamento de Progresso
```javascript
// localStorage:
{
  "progress": {
    "fase_1_missao_1": { completado: true, tentativas: 2 },
    "fase_1_missao_2": { completado: false, tentativas: 5 },
    ...
  },
  "creditos": 35,
  "fase_atual": 1
}
```

#### 2.4 Unlock de Missões
```javascript
// Sistema:
- Fase 1 desbloqueada por padrão
- Fase 2 desbloqueada ao completar Fase 1
- Fase 3 desbloqueada ao completar Fase 2
```

### 3. Nova Fase (Fase 3)

#### Tema: Funções e Modularização

**Missão 1: Função Simples**
```python
def saudacao():
    print("Olá!")

saudacao()
```
Esperado: "Olá!"
Créditos: 15

**Missão 2: Função com Parâmetro**
```python
def saudacao(nome):
    print(f"Olá, {nome}!")

saudacao("Lumi")
```
Esperado: "Olá, Lumi!"
Créditos: 20

**Missão 3: Função com Retorno**
```python
def dobrar(x):
    return x * 2

resultado = dobrar(5)
print(resultado)
```
Esperado: "10"
Créditos: 20

**Missão 4: Múltiplas Funções**
```python
def somar(a, b):
    return a + b

def multiplicar(a, b):
    return a * b

print(somar(3, 5))
print(multiplicar(2, 4))
```
Esperado: "8\n8"
Créditos: 25

---

## 📁 Estrutura de Arquivos - Semana 2

```
PyDetetive/
├── index.html                      (melhorado)
├── css/style.css                   (melhorias visuais)
├── js/
│   ├── app.js                      (melhorias principais)
│   ├── pyodide-manager.js         (novo - gerenciar Pyodide)
│   └── mission-validator.js        (novo - validar missões)
├── data/phases.json                (adicionar Fase 3)
├── PyDetetive-Semana2.html        (arquivo único - Fases 1-3)
├── CHANGELOG.md                    (atualizado)
├── PLANO_SEMANA2.md               (este arquivo)
└── ...
```

---

## 🔧 Commits Planejados - Semana 2

### Dia 1 (07/10)
1. **Criar pyodide-manager.js** - Gerenciar instância Pyodide
   - Melhor captura de output
   - Timeout e interrupts
   - Limpeza de estado

2. **Criar mission-validator.js** - Sistema de validação
   - Comparar resultados
   - Dicas progressivas
   - localStorage integration

3. **Melhorar app.js** - Integrar novos módulos
   - Usar validador
   - Usar Pyodide manager
   - Unlock progressivo

### Dia 2 (08/10)
4. **Adicionar Fase 3** - Funções e modularização
   - Atualizar phases.json
   - Adicionar 4 novas missões
   - Testes

5. **Melhorias no CSS** - Refinamentos visuais
   - Badges de status
   - Animações de progresso
   - Estados de bloqueio

6. **Atualizar documentação**
   - CHANGELOG.md
   - README.md
   - phase3_guide.md

### Dia 3 (09/10)
7. **Testes completos** - Todas as fases

8. **Criar PyDetetive-Semana2.html** - Arquivo único
   - Incorporar CSS
   - Incorporar JS
   - Incorporar dados
   - Testar offline

9. **Push final** - Enviar ao repositório

---

## 🧪 Checklist de Testes

### Pyodide
- [ ] print() funciona
- [ ] Erro de sintaxe é capturado
- [ ] Erro de indentação é capturado
- [ ] Variáveis persistem em execuções múltiplas
- [ ] Estado limpa entre missões
- [ ] Timeout funciona
- [ ] Performance aceitável (<2s por execução)

### Lógica
- [ ] Resultado é validado corretamente
- [ ] Comparação ignora espaços extras
- [ ] Dicas aparecem progressivamente
- [ ] localStorage salva progresso
- [ ] Fase 2 desbloqueia após Fase 1
- [ ] Créditos acumulam corretamente
- [ ] Página recarrega com progresso salvo

### Interface
- [ ] Design responsivo
- [ ] Sem erros no console
- [ ] Animações suaves
- [ ] Acessibilidade OK
- [ ] Funciona em Chrome, Firefox, Safari

### Arquivo Único
- [ ] PyDetetive-Semana2.html carrega sem servidor
- [ ] Funciona offline (após carregar Pyodide)
- [ ] Mesmo tamanho < 1MB
- [ ] Duplo clique abre corretamente

---

## 📝 Próximos Passos (Semana 3+)

- **Fase 4:** Estruturas de dados avançadas (dicts, tuples, sets)
- **Fase 5:** Análise e visualização (arquivos, gráficos)
- **Fase 6:** Projeto integrador final

---

## 💡 Notas Importantes

1. **Funcional > Bonito:** Professor quer funcionalidade, não estética
2. **Modular:** Manter separado no repo, depois unir
3. **Testar:** Cada commit deve ser funcional
4. **Documentar:** Adicionar docstrings em JS

---

## ✅ Definição de Pronto

Semana 2 estará pronta quando:
- ✅ Pyodide funciona confiável
- ✅ Validação de missões automática
- ✅ Progresso salvo em localStorage
- ✅ Fase 3 completa e testada
- ✅ PyDetetive-Semana2.html gerado
- ✅ Repositório enviado ao professor
- ✅ Documentação atualizada
