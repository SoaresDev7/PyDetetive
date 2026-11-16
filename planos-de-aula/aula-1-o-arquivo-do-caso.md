# Aula 1: O arquivo do caso

**Fase 1 · 50 min**

Primeiro contato com Python: mostrar informações, guardar pistas em variáveis, reconhecer tipos e ler mensagens de erro.

[Voltar ao plano de curso](plano-de-curso.md)

## Objetivos

- Mostrar textos e valores na tela com print().
- Criar variáveis, dar nomes claros a elas e reutilizá-las.
- Identificar os tipos str, int, float e bool com type().
- Ler uma mensagem de erro e localizar a linha do problema.

## Habilidades trabalhadas

- Abstração: dar nome a uma informação para usá-la depois (variáveis).
- Reconhecimento de padrões: perceber que texto vai entre aspas e número não.
- Depuração: interpretar a mensagem de erro antes de mudar o código.
- Decomposição: dividir a investigação em pistas pequenas e verificáveis.

## Pré-requisitos

- Nenhum conhecimento de programação.
- Computador com navegador. Na primeira abertura, o Python leva alguns segundos para carregar.

## Materiais

- Slides da Aula 1 (modo aula).
- Manual do detetive, Capítulo 1: quatro seções com exemplos para testar.
- Missões 1 a 3 da Fase 1 para a prática.
- Quadro branco para anotar as respostas da turma: elas viram as variáveis da aula.

## Cronograma

| Tempo | Atividade |
|---|---|
| 0–5 min | Abertura: relembrar a introdução em quadrinhos e fazer a pergunta disparadora. |
| 5–12 min | print(): demonstração ao vivo, com textos e números. |
| 12–22 min | Variáveis: visualizador de gavetas. Peça para a turma prever cada passo antes do clique. |
| 22–30 min | Tipos: type() e o caso do "34" com aspas. |
| 30–37 min | Erros de propósito: Suspeito com maiúscula e aspas que faltam. Deixe a turma apontar antes de executar. |
| 37–46 min | Prática nas Missões 1 a 3. Circule pela sala. |
| 46–50 min | Fechamento: revisão do vocabulário e gancho para a próxima aula. |

## Perguntas para a turma

- Se vocês fossem investigar, que informações anotariam primeiro?
- O que aparece: print(suspeito) ou print("suspeito")? Por quê?
- Por que 34 e "34" são diferentes para o computador?

## Erros comuns e como conduzi-los

| Erro | Como conduzir |
|---|---|
| Texto sem aspas (print(Caio)) gera NameError. | Pergunte: o Python acha que Caio é o nome de uma gaveta? |
| print com P maiúsculo gera NameError. | Lembre que o Python diferencia maiúsculas de minúsculas. |
| Vírgula no decimal (altura = 1,68) não dá erro: vira uma tupla (1, 68). | Mostre o resultado com print(altura) e pergunte o tipo com type(). Use ponto. |
| Usar uma variável antes de criá-la. | Pergunte em que linha ela foi criada e leve a turma a ler o erro. |

## Avaliação

- print("10 + 5") mostra o quê? (Resposta: 10 + 5)
- Qual é o tipo de idade = 34? (Resposta: int)
- Qual erro aparece em print(nome) sem criar nome? (Resposta: NameError)

## Lição de casa

Terminar as Missões 1 a 3 e reler o Capítulo 1 do manual. Próximo passo: Fase 2, Entrada e cálculos.
