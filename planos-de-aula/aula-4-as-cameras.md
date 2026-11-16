# Aula 4: As câmeras

**Fase 4 · 50 min**

Repetir tarefas com for e while, usar range() e acumular valores para analisar gravações em série.

[Voltar ao plano de curso](plano-de-curso.md)

## Objetivos

- Repetir um bloco de código para cada item com for.
- Gerar sequências de números com range().
- Acumular valores em uma variável.
- Usar while com uma condição que um dia deixa de ser verdadeira.

## Habilidades trabalhadas

- Repetição (laços): fazer a mesma tarefa muitas vezes sem copiar código.
- Padrões: perceber quando uma tarefa se repete.
- Abstração: o laço trabalha para qualquer quantidade de itens.
- Depuração: reconhecer e interromper um laço infinito.

## Pré-requisitos

- Aulas 1 a 3: print(), variáveis, comparações e if.

## Materiais

- Slides da Aula 4 (modo aula).
- Lista de horários das câmeras escrita no quadro (por exemplo, 21h40 a 21h47, minuto a minuto).
- Cronômetro para a prática.

## Cronograma

| Tempo | Atividade |
|---|---|
| 0–5 min | Abertura: "As câmeras gravaram por minutos. Você olharia todos um por um?" |
| 5–15 min | for e range() ao vivo. |
| 15–25 min | Acumulador: somar valores dentro do laço. |
| 25–35 min | while e a condição que muda a cada volta. |
| 35–42 min | Laço infinito: apenas mostrar o código, sem executar. |
| 42–50 min | Prática em duplas: listar os horários das câmeras com for. |

## Perguntas para a turma

- Quantas vezes o laço repete com range(3)?
- Quais números aparecem em range(1, 4)?
- O que aconteceria se esquecêssemos de atualizar a variável de um while?

## Erros comuns e como conduzi-los

| Erro | Como conduzir |
|---|---|
| range(1, 5) não inclui o 5. | Mostre a lista gerada e pergunte qual é o último número. |
| Esquecer de atualizar a variável do while. | Pergunte: a condição algum dia vai virar falsa? Só é seguro executar se a resposta for sim. |
| Recuo errado dentro do for gera IndentationError. | Mostre que a linha que repete precisa estar um nível abaixo do for. |
| Acumulador não é zerado antes do laço. | Peça para a turma prever o total antes de executar. |

## Avaliação

- for i in range(3): print(i) mostra o quê? (Resposta: 0, 1 e 2)
- total = 0 com for n in range(1, 4): total += n. Qual é o total? (Resposta: 6)
- contador = 0 com while contador < 3: contador += 1 e print(contador). Quantas linhas aparecem? (Resposta: 3)

## Lição de casa

Escrever um for que mostre os horários das câmeras de 21h40 a 21h47. Próximo passo: Fase 5, Listas e textos.
