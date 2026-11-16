# Aula 5: Mensagens cifradas

**Fase 5 · 50 min**

Guardar vários valores em listas, acessá-los pelo índice e transformar textos com métodos e fatiamento.

[Voltar ao plano de curso](plano-de-curso.md)

## Objetivos

- Criar listas e acessar itens pelo índice.
- Usar len() e append() para ler e aumentar uma lista.
- Aplicar métodos de texto como upper(), strip() e replace().
- Percorrer uma lista com for.

## Habilidades trabalhadas

- Estruturas de dados: agrupar informações relacionadas.
- Representação de informação: o texto é uma sequência de letras.
- Algoritmos de transformação: aplicar a mesma regra a cada item.
- Abstração: tratar a lista inteira como um único objeto.

## Pré-requisitos

- Aulas 1 a 4: variáveis, tipos, if e for/range.

## Materiais

- Slides da Aula 5 (modo aula).
- Tabela de letras com posição (A = 0, B = 1 e assim por diante) para explicar índices.
- Pequeno bilhete com uma mensagem cifrada para a turma decifrar.

## Cronograma

| Tempo | Atividade |
|---|---|
| 0–5 min | Abertura: "Quatro suspeitos numa só gaveta. Como guardar todos juntos?" |
| 5–15 min | Listas e índices: a contagem começa em zero. |
| 15–25 min | append() e len(): crescer a lista e medi-la. |
| 25–35 min | Métodos de texto: upper(), strip(), replace(). |
| 35–45 min | Mensagem ao contrário: fatiamento com [::-1]. |
| 45–50 min | Avaliação rápida e recados. |

## Perguntas para a turma

- Qual é o índice do último item de uma lista com 4 elementos?
- upper() muda a variável original ou devolve um novo texto?
- Por que lista[1] é o segundo item, e não o primeiro?

## Erros comuns e como conduzi-los

| Erro | Como conduzir |
|---|---|
| Confundir posição com índice: lista[1] parece ser o primeiro item. | Use a tabela de letras: A = 0, B = 1. Peça para a turma achar a letra do índice 2. |
| IndexError: list index out of range. | Pergunte quantos itens a lista tem e qual é o maior índice válido. |
| Tentar trocar uma letra de um texto: texto[0] = "X" gera TypeError. | Explique que texto é imutável: métodos devolvem um texto novo. |
| Escrever texto.upper sem parênteses mostra a função, não o resultado. | Peça para a turma comparar as duas linhas e ler a diferença. |

## Avaliação

- suspeitos = ["Helena", "Caio", "Bia"]; print(suspeitos[1]) mostra o quê? (Resposta: Caio)
- print(len("LUMI")) mostra o quê? (Resposta: 4)
- print("lumi".upper()) mostra o quê? (Resposta: LUMI)

## Lição de casa

Criar uma lista com os quatro suspeitos e mostrar cada nome em maiúsculas. Próximo passo: Fase 6, Funções.
