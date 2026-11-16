# Aula 2: A linha do tempo

**Fase 2 · 50 min**

Receber dados de quem usa o programa com input(), converter textos em números e calcular intervalos de tempo.

[Voltar ao plano de curso](plano-de-curso.md)

## Objetivos

- Ler informações digitadas com input() e entender que o retorno é sempre texto.
- Converter texto em número com int() e float().
- Usar os operadores + - * / // % ** com segurança.
- Montar mensagens com valores usando f-strings.

## Habilidades trabalhadas

- Entrada e saída de dados.
- Operadores e expressões aritméticas.
- Algoritmos: sequência de passos (ler, converter, calcular, mostrar).
- Abstração: guardar um resultado em variável para usar depois.

## Pré-requisitos

- Aula 1: print(), variáveis e os tipos str, int e float.

## Materiais

- Slides da Aula 2 (modo aula).
- Relógio ou cronômetro para o exercício de horários.
- Atenção: as missões da Fase 2 ainda estão em produção na plataforma. Use os exemplos dos slides ou crie desafios na aba Criar desafio.

## Cronograma

| Tempo | Atividade |
|---|---|
| 0–5 min | Abertura: "Quanto tempo o Lumi ficou sozinho entre 21h40 e 21h47?" |
| 5–15 min | input(): execute ao vivo pedindo um nome a um aluno. |
| 15–25 min | Textos e números: int() e float(). Mostre o TypeError ao somar texto com número. |
| 25–35 min | Operadores: calcule com a turma, em voz alta, 7 / 2 e 7 // 2. |
| 35–45 min | Cálculo de horário: converter 21h40 em minutos e achar a diferença. |
| 45–50 min | Avaliação rápida e recados. |

## Perguntas para a turma

- Se digitarem 20 e 5 e somarmos sem converter, o resultado é 25?
- Qual é a diferença entre / e //?
- Por que precisamos de int() antes de calcular a idade?

## Erros comuns e como conduzi-los

| Erro | Como conduzir |
|---|---|
| Somar input sem converter: "20" + "5" dá "205". | Mostre o resultado e pergunte o tipo. Depois converta com int(). |
| TypeError ao somar texto e número. | Peça para a turma ler a mensagem e identificar os dois tipos envolvidos. |
| Esquecer um parêntese em int(input()). | Peça para contar em voz alta os parênteses abertos e fechados. |
| Esperar 3 como resultado de 7 / 2. | Mostre 3.5 e explique a diferença entre divisão exata e divisão inteira. |

## Avaliação

- print(7 // 2) mostra o quê? (Resposta: 3)
- Se idade = input() e a pessoa digitar 30, qual é o tipo? (Resposta: str)
- Quanto é 10 % 3? (Resposta: 1)

## Lição de casa

Escrever um programa que pergunte a hora em que o Lumi foi visto e calcule quantos minutos faltam até 21h47. Próximo passo: Fase 3, Condicionais.
