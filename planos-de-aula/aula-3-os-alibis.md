# Aula 3: Os álibis

**Fase 3 · 50 min**

Fazer o computador decidir caminhos com if, elif e else, usando comparações e a lógica de and, or e not.

[Voltar ao plano de curso](plano-de-curso.md)

## Objetivos

- Comparar valores com ==, !=, <, >, <= e >=.
- Escrever if, elif e else com a indentação correta.
- Combinar condições com and, or e not.
- Interpretar erros de sintaxe e de recuo.

## Habilidades trabalhadas

- Estruturas de decisão: o programa escolhe caminhos.
- Lógica booleana: verdadeiro e falso como resultados de perguntas.
- Teste e depuração: testar um caminho de cada vez.
- Decomposição: transformar um álibi em regras verificáveis.

## Pré-requisitos

- Aulas 1 e 2: print(), variáveis, input(), conversões e o tipo bool.

## Materiais

- Slides da Aula 3 (modo aula).
- Ficha de álibis: horários dos quatro suspeitos escritos no quadro ou impressos.
- Dupla de trabalho para a prática final.

## Cronograma

| Tempo | Atividade |
|---|---|
| 0–6 min | Abertura: "Se o álibi do Caio cobre 21h40, ele é suspeito?" |
| 6–14 min | Comparações e o tipo bool. Peça previsões antes de executar. |
| 14–26 min | if e else ao vivo, com o exemplo do guarda-chuva. |
| 26–34 min | elif e a ordem das condições: mude a hora e observe o caminho. |
| 34–42 min | and, or e not. Erro de recuo proposital. |
| 42–50 min | Prática em duplas: um if para o álibi de um suspeito. |

## Perguntas para a turma

- Por que o if precisa de dois pontos no fim da linha?
- 5 == 5.0 é True ou False?
- Se a condição do elif for verdadeira e a do else também, qual frase aparece?

## Erros comuns e como conduzi-los

| Erro | Como conduzir |
|---|---|
| Usar = no lugar de == dentro do if gera SyntaxError. | Lembre que = guarda um valor e == pergunta se são iguais. |
| Esquecer os dois pontos no fim do if. | Peça para a turma encontrar o lugar onde faltam os dois pontos. |
| Recuo errado gera IndentationError. | Conte os espaços em voz alta e mostre que cada bloco precisa do mesmo recuo. |
| Escrever "else if" em vez de elif gera SyntaxError. | Mostre a forma correta e pergunte por que o Python não entende a outra. |
| Comparar texto com número: "34" == 34 dá False sem erro. | Este é o erro mais traiçoeiro: pergunte o tipo de cada lado antes de comparar. |

## Avaliação

- print(3 > 2 and 2 > 5) mostra o quê? (Resposta: False)
- x = 3, com if x % 2 == 0 e else: o resultado é par ou ímpar? (Resposta: ímpar)
- Qual operador inverte um valor booleano? (Resposta: not)

## Lição de casa

Escrever um if para dois suspeitos com álibis diferentes e explicar em uma frase por que cada caminho foi escolhido. Próximo passo: Fase 4, Laços.
