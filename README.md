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
- `INSTRUCOES_PROFESSOR.md`: guia de uso para o professor.
