# Aula 6: A revelação

**Fase 6 · 50 min**

Organizar o raciocínio em funções: escrever uma regra uma vez e reutilizá-la para qualquer suspeito.

[Voltar ao plano de curso](plano-de-curso.md)

## Objetivos

- Criar uma função com def e chamá-la.
- Passar informações para a função com parâmetros.
- Devolver um resultado com return.
- Diferenciar print (mostrar) de return (devolver).

## Habilidades trabalhadas

- Decomposição: dividir um problema grande em partes menores.
- Abstração: nomear uma regra e usá-la sem repetir código.
- Reutilização: uma mesma função serve para vários casos.
- Modularização: separar a regra do lugar onde ela é usada.

## Pré-requisitos

- Aulas 1 a 5, em especial comparações (Aula 3) e conversões (Aula 2).

## Materiais

- Slides da Aula 6 (modo aula).
- Quadro com os horários dos suspeitos: Helena 21h30 a 21h50, Caio 21h40 a 21h45.
- Folha em branco para a turma escrever a função em duplas.

## Cronograma

| Tempo | Atividade |
|---|---|
| 0–5 min | Abertura: "Vamos repetir o mesmo cálculo para cada suspeito?" |
| 5–15 min | def e chamada da função, ao vivo. |
| 15–25 min | Parâmetros: a função recebe dados de fora. |
| 25–35 min | return versus print: mostre a diferença na mesma execução. |
| 35–45 min | Prática em duplas: função que diz se um horário está coberto por um álibi. |
| 45–50 min | Revelação: fechamento do caso e recados finais. |

## Perguntas para a turma

- Qual é a diferença entre print e return?
- Quantas vezes a função roda se a chamarmos três vezes?
- Por que escrever uma função é melhor do que copiar o mesmo código?

## Erros comuns e como conduzi-los

| Erro | Como conduzir |
|---|---|
| Esquecer os parênteses ao chamar: saudar mostra a função, não executa. | Peça para a turma comparar saudar e saudar() e ler o resultado de cada um. |
| Função sem return: print(resultado) mostra None. | Pergunte o que a função devolveu. Mostre que print não é return. |
| Chamar a função sem passar o parâmetro gera TypeError. | Leia a mensagem em voz alta: ela diz qual argumento faltou. |
| Corpo da função sem recuo gera IndentationError. | Mostre o recuo como parte da definição da função. |

## Avaliação

- def dobro(n) com return n * 2, depois print(dobro(4)). O que aparece? (Resposta: 8)
- Uma função com print dentro é chamada sem return. O que aparece? (Resposta: o texto do print)
- def f(): sem return, e print(f()). O que aparece? (Resposta: None)

## Lição de casa

Escrever uma função que receba o horário de um suspeito e diga se ele tem álibi para 21h45. Fim da sequência: o professor decide o que vem depois.
