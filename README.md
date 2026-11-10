# PyDetetive

Jogo investigativo para aprender Python. Os alunos resolvem o caso do robô **Lumi**
escrevendo pequenos programas no navegador. Não é preciso instalar nada além de um
navegador moderno e conexão com a internet (o interpretador Python é carregado na hora).

## Conteúdo

- **18 missões** em 6 fases: `print()` e variáveis, entrada de dados, condicionais,
  laços, listas e funções.
- **Manual do detetive**, com explicação de cada conceito.
- **Área do professor**: planos de aula por fase, slides para projetar, liberação de
  aulas e de fases, e criação de desafios personalizados.

## Como usar (aluno)

1. Abra o link do jogo (ou o arquivo `index.html`, veja abaixo).
2. Leia a introdução em quadrinhos e comece pela Fase 1.
3. Escreva o código no editor e clique em **Executar** para testar.
4. Clique em **Entregar pista** para verificar a resposta da missão.
5. Se travar, use **Comprar dica** (custa moedas, que você ganha ao concluir missões).
   As fases seguintes podem exigir um código de acesso fornecido pelo professor.

## Como usar (professor)

Veja o guia completo em [INSTRUCOES_PROFESSOR.md](INSTRUCOES_PROFESSOR.md).

## Como executar

### Opção 1: pelo link online (recomendado para a turma)

Veja a seção "Publicar no GitHub Pages" no guia do professor. Depois de publicado,
basta enviar o link aos alunos.

### Opção 2: no próprio computador

**Windows:** dê dois cliques em `iniciar.bat`. Se aparecer "Python não foi encontrado",
instale o Python pela [página oficial](https://www.python.org/downloads/) marcando
a opção *Add python.exe to PATH*, ou pela Microsoft Store, e tente de novo.

**Linux / macOS:** no terminal, dentro da pasta do projeto, execute:

```bash
./iniciar.sh
```

Depois abra <http://localhost:8000> no navegador. Para parar o servidor, pressione `Ctrl+C`.

Também funciona abrir `index.html` diretamente no navegador, mas o servidor local
evita problemas de armazenamento em alguns navegadores.

## Limitações conhecidas

- O progresso fica salvo **no navegador de cada pessoa**. Trocar de computador ou
  limpar os dados do navegador apaga o progresso.
- Os códigos curtos de desafio funcionam **apenas no computador do professor**. Para
  enviar um desafio a outro computador, use o código completo (começa com `PYD1:`).
- A senha do professor e os códigos de acesso das fases são verificados no próprio
  navegador. Servem para organizar a turma, **não são uma proteção de segurança**.
- Código com laço infinito (`while True:` sem saída) congela a aba do navegador.
  Recarregue a página para continuar.

## Estrutura do projeto

- `index.html`: o jogo inteiro (HTML, CSS e JavaScript em um único arquivo).
- `iniciar.bat` / `iniciar.sh`: sobem um servidor local na porta 8000.
- `INSTRUCOES_PROFESSOR.md`: guia de uso para o professor.
