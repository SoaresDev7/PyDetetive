# Troubleshooting - PyDetetive

Guia para resolver problemas comuns.

---

## Problema: Comandos não funcionam

### ❌ Erro: "make: command not found"
**Causa:** Make não está instalado

**Solução:**
- Use diretamente: `python -m http.server 8000`
- Ou use o script: `./iniciar.sh` (Linux/Mac) ou `iniciar.bat` (Windows)

---

### ❌ Erro: "python: command not found"
**Causa:** Python não está instalado ou não está no PATH

**Solução 1:** Verifique se Python está instalado
```bash
python --version
python3 --version
```

**Solução 2:** Use a versão correta
- Se `python` não funciona, tente `python3`
- Se `python3 -m http.server 8000` não funciona, use `python -m http.server 8000`

**Solução 3:** Instale Python
- **Windows:** Baixe em python.org e marque "Add Python to PATH"
- **Mac:** `brew install python3`
- **Linux:** `sudo apt-get install python3` (Ubuntu/Debian) ou equivalente

---

### ❌ Erro: "Porta 8000 já está em uso"
**Causa:** Outro programa está usando a porta 8000

**Solução:**
Use uma porta diferente:
```bash
python -m http.server 8001
python -m http.server 8002
python -m http.server 9000
```

Depois acesse: `http://localhost:8001` (ou a porta que escolheu)

---

### ❌ Erro: "Permission denied" ao executar iniciar.sh
**Causa:** Script não tem permissão de execução

**Solução:**
```bash
chmod +x iniciar.sh
./iniciar.sh
```

Ou simplesmente use:
```bash
python -m http.server 8000
```

---

## Problema: Página não carrega

### ❌ Erro: "ERR_CONNECTION_REFUSED" ou "Unable to connect"
**Causa:** Servidor não está rodando

**Solução:**
1. Verifique se você está no diretório correto:
   ```bash
   pwd  # Deve mostrar o caminho para PyDetetive
   ls   # Deve listar index.html
   ```

2. Inicie o servidor:
   ```bash
   python -m http.server 8000
   ```

3. Acesse novamente: `http://localhost:8000`

---

### ❌ Erro: Página em branco ou "404 Not Found"
**Causa:** Você não está no diretório correto

**Solução:**
1. Navegue para a pasta PyDetetive:
   ```bash
   cd /caminho/para/PyDetetive
   ```

2. Inicie o servidor novamente:
   ```bash
   python -m http.server 8000
   ```

3. Acesse: `http://localhost:8000`

---

### ❌ Erro: CSS não carrega ou página fica sem estilo
**Causa:** Caminho da pasta está incorreto

**Solução:**
Verifique se a estrutura de pastas existe:
```
PyDetetive/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
└── data/
    └── phases.json
```

Se faltarem pasta, copie o projeto inteiro corretamente.

---

## Problema: Python não executa código

### ❌ Erro: "Python não está pronto" ou "Esperando..."
**Causa:** Pyodide ainda está carregando

**Solução:**
- Aguarde 5-10 segundos após abrir a página
- Atualize a página (F5 ou Cmd+R)
- Limpe o cache do navegador (Ctrl+Shift+Delete / Cmd+Shift+Delete)

---

### ❌ Erro: "Python pronto!" mas nada acontece ao clicar em Executar
**Causa:** Problema de compatibilidade do navegador

**Solução:**
Tente outro navegador:
- Chrome / Chromium ✓ (melhor suporte)
- Firefox ✓
- Safari (verificar versão)
- Edge ✓

**Para Chrome:** Atualize para a versão mais recente

---

## Problema: Erro ao executar código Python

### ❌ Erro: "SyntaxError" ou "IndentationError"
**Causa:** Código Python tem erro de sintaxe

**Solução:**
- Verifique a indentação (use 4 espaços)
- Verifique parênteses, aspas e dois-pontos
- Comece com o código simples da missão

**Exemplo correto:**
```python
print("Olá")
x = 10
print(x)
```

---

### ❌ Erro: "ModuleNotFoundError" ou "ImportError"
**Causa:** Módulo Python não está disponível no Pyodide

**Solução:**
- Evite imports de bibliotecas externas (numpy, pandas, etc.)
- Use apenas módulos built-in: math, random, datetime, etc.
- O Pyodide tem suporte limitado a bibliotecas

**Módulos disponíveis no Pyodide:**
```python
import math
import random
import datetime
import json
import re
```

---

## Problema: Aplicação lenta ou travada

### ❌ Problema: Página demora muito para carregar
**Causa:** Pyodide está sendo carregado da CDN

**Solução:**
- Verifique sua conexão de internet
- Aguarde até que o carregamento termine (5-30 segundos dependendo da velocidade)
- Limpe o cache para forçar novo carregamento

---

### ❌ Problema: Aplicação fica lenta após usar por um tempo
**Causa:** Uso excessivo de memória

**Solução:**
- Recarregue a página
- Não execute código em loop infinito
- Evite arrays/listas muito grandes

---

## Guia Passo a Passo para Iniciantes

### Se você é iniciante no terminal:

**Windows:**
1. Abra `File Explorer`
2. Navegue até a pasta PyDetetive
3. Clique na barra de endereço e escreva `cmd`
4. Pressione Enter
5. Escreva: `python -m http.server 8000`
6. Abra o navegador em: `http://localhost:8000`

**Ou simplesmente:**
1. Na pasta PyDetetive, clique em `iniciar.bat`
2. Duplo clique para executar

---

**Mac/Linux:**
1. Abra Terminal
2. Escreva: `cd /caminho/para/PyDetetive`
3. Escreva: `python -m http.server 8000`
4. Abra o navegador em: `http://localhost:8000`

**Ou simplesmente:**
1. Na pasta PyDetetive, clique em `iniciar.sh`
2. Duplo clique para executar (pode pedir para executar como programa)

---

## Se nada funcionar

### Teste com conexão de internet desativada?
Após a página carregar com Pyodide, você pode desativar a internet.

### Verifique o Console do Navegador
Pressione F12 para abrir as ferramentas do desenvolvedor e veja se há erros em vermelho.

### Verifique o Terminal
Se estiver no terminal, veja se há mensagens de erro quando você clica em "Executar".

### Último recurso: Reinstale
Se nada funcionar:
1. Baixe o repositório novamente: `git clone https://github.com/SoaresDev7/PyDetetive.git`
2. Navegue para a pasta
3. Execute novamente

---

## Dúvidas Frequentes

### P: Preciso de conexão com a internet?
**R:** Sim, na primeira vez para carregar o Pyodide (5-10 segundos). Depois funciona offline.

### P: O código Python é seguro?
**R:** Sim! Roda em WebAssembly, sem acesso ao sistema de arquivos ou rede.

### P: Por que Pyodide demora para carregar?
**R:** É um arquivo grande (60MB) que é carregado uma única vez e fica em cache.

### P: Posso fechar o terminal após iniciar?
**R:** Não. O terminal mantém o servidor rodando. Se fechar, o servidor para.

### P: Como parar o servidor?
**R:** Clique no terminal e pressione `Ctrl+C`

---

## Suporte Adicional

Se ainda tiver problemas, verifique:
- Python está instalado? `python --version`
- Você está no diretório correto? `ls` (deve listar index.html)
- A porta 8000 está disponível? Tente outra porta: `python -m http.server 8001`
- Seu navegador é moderno? Tente Chrome, Firefox ou Edge

Para mais ajuda, envie as mensagens de erro exatas que você recebeu.
