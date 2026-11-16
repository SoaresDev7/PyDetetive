# PyDetetive: plano de curso e planos de aula

Este documento reúne o plano de curso e os seis planos de aula do PyDetetive, para consulta direta pelo professor, sem precisar entrar no jogo. O conteúdo é o mesmo exibido na área do professor, em **Planos de aula**.

## Plano de curso

**Público:** estudantes do ensino médio que estão tendo o primeiro contato com programação.

**Carga horária:** 6 aulas de 50 minutos (5 horas no total).

**Organização:** cada aula corresponde a uma fase do jogo e tem três missões de programação, verificadas automaticamente. As fases são liberadas pelo professor com códigos de acesso, conforme o ritmo da turma.

**Pré-requisitos:** nenhum conhecimento prévio de programação. É necessário um computador com navegador e conexão com a internet.

| Aula | Fase | Título | Resumo | Duração |
|---|---|---|---|---|
| 1 | 1 | O arquivo do caso | Primeiro contato com Python: mostrar informações, guardar pistas em variáveis, reconhecer tipos e ler mensagens de erro. | 50 min |
| 2 | 2 | A linha do tempo | Receber dados de quem usa o programa com input(), converter textos em números e calcular intervalos de tempo. | 50 min |
| 3 | 3 | Os álibis | Fazer o computador decidir caminhos com if, elif e else, usando comparações e a lógica de and, or e not. | 50 min |
| 4 | 4 | As câmeras | Repetir tarefas com for e while, usar range() e acumular valores para analisar gravações em série. | 50 min |
| 5 | 5 | Mensagens cifradas | Guardar vários valores em listas, acessá-los pelo índice e transformar textos com métodos e fatiamento. | 50 min |
| 6 | 6 | A revelação | Organizar o raciocínio em funções: escrever uma regra uma vez e reutilizá-la para qualquer suspeito. | 50 min |

## Planos de aula

### Aula 1: O arquivo do caso

**Fase 1 · 50 min**

Primeiro contato com Python: mostrar informações, guardar pistas em variáveis, reconhecer tipos e ler mensagens de erro.

**Objetivos**

- Mostrar textos e valores na tela com print().
- Criar variáveis, dar nomes claros a elas e reutilizá-las.
- Identificar os tipos str, int, float e bool com type().
- Ler uma mensagem de erro e localizar a linha do problema.

**Habilidades trabalhadas**

- Abstração: dar nome a uma informação para usá-la depois (variáveis).
- Reconhecimento de padrões: perceber que texto vai entre aspas e número não.
- Depuração: interpretar a mensagem de erro antes de mudar o código.
- Decomposição: dividir a investigação em pistas pequenas e verificáveis.

**Pré-requisitos**

- Nenhum conhecimento de programação.
- Computador com navegador. Na primeira abertura, o Python leva alguns segundos para carregar.

**Materiais**

- Slides da Aula 1 (modo aula).
- Manual do detetive, Capítulo 1: quatro seções com exemplos para testar.
- Missões 1 a 3 da Fase 1 para a prática.
- Quadro branco para anotar as respostas da turma: elas viram as variáveis da aula.

**Cronograma**

| Tempo | Atividade |
|---|---|
| 0–5 min | Abertura: relembrar a introdução em quadrinhos e fazer a pergunta disparadora. |
| 5–12 min | print(): demonstração ao vivo, com textos e números. |
| 12–22 min | Variáveis: visualizador de gavetas. Peça para a turma prever cada passo antes do clique. |
| 22–30 min | Tipos: type() e o caso do "34" com aspas. |
| 30–37 min | Erros de propósito: Suspeito com maiúscula e aspas que faltam. Deixe a turma apontar antes de executar. |
| 37–46 min | Prática nas Missões 1 a 3. Circule pela sala. |
| 46–50 min | Fechamento: revisão do vocabulário e gancho para a próxima aula. |

**Perguntas para a turma**

- Se vocês fossem investigar, que informações anotariam primeiro?
- O que aparece: print(suspeito) ou print("suspeito")? Por quê?
- Por que 34 e "34" são diferentes para o computador?

**Erros comuns e como conduzi-los**

| Erro | Como conduzir |
|---|---|
| Texto sem aspas (print(Caio)) gera NameError. | Pergunte: o Python acha que Caio é o nome de uma gaveta? |
| print com P maiúsculo gera NameError. | Lembre que o Python diferencia maiúsculas de minúsculas. |
| Vírgula no decimal (altura = 1,68) não dá erro: vira uma tupla (1, 68). | Mostre o resultado com print(altura) e pergunte o tipo com type(). Use ponto. |
| Usar uma variável antes de criá-la. | Pergunte em que linha ela foi criada e leve a turma a ler o erro. |

**Avaliação**

- print("10 + 5") mostra o quê? (Resposta: 10 + 5)
- Qual é o tipo de idade = 34? (Resposta: int)
- Qual erro aparece em print(nome) sem criar nome? (Resposta: NameError)

**Lição de casa**

Terminar as Missões 1 a 3 e reler o Capítulo 1 do manual. Próximo passo: Fase 2, Entrada e cálculos.

### Aula 2: A linha do tempo

**Fase 2 · 50 min**

Receber dados de quem usa o programa com input(), converter textos em números e calcular intervalos de tempo.

**Objetivos**

- Ler informações digitadas com input() e entender que o retorno é sempre texto.
- Converter texto em número com int() e float().
- Usar os operadores + - * / // % ** com segurança.
- Montar mensagens com valores usando f-strings.

**Habilidades trabalhadas**

- Entrada e saída de dados.
- Operadores e expressões aritméticas.
- Algoritmos: sequência de passos (ler, converter, calcular, mostrar).
- Abstração: guardar um resultado em variável para usar depois.

**Pré-requisitos**

- Aula 1: print(), variáveis e os tipos str, int e float.

**Materiais**

- Slides da Aula 2 (modo aula).
- Relógio ou cronômetro para o exercício de horários.
- Atenção: as missões da Fase 2 ainda estão em produção na plataforma. Use os exemplos dos slides ou crie desafios na aba Criar desafio.

**Cronograma**

| Tempo | Atividade |
|---|---|
| 0–5 min | Abertura: "Quanto tempo o Lumi ficou sozinho entre 21h40 e 21h47?" |
| 5–15 min | input(): execute ao vivo pedindo um nome a um aluno. |
| 15–25 min | Textos e números: int() e float(). Mostre o TypeError ao somar texto com número. |
| 25–35 min | Operadores: calcule com a turma, em voz alta, 7 / 2 e 7 // 2. |
| 35–45 min | Cálculo de horário: converter 21h40 em minutos e achar a diferença. |
| 45–50 min | Avaliação rápida e recados. |

**Perguntas para a turma**

- Se digitarem 20 e 5 e somarmos sem converter, o resultado é 25?
- Qual é a diferença entre / e //?
- Por que precisamos de int() antes de calcular a idade?

**Erros comuns e como conduzi-los**

| Erro | Como conduzir |
|---|---|
| Somar input sem converter: "20" + "5" dá "205". | Mostre o resultado e pergunte o tipo. Depois converta com int(). |
| TypeError ao somar texto e número. | Peça para a turma ler a mensagem e identificar os dois tipos envolvidos. |
| Esquecer um parêntese em int(input()). | Peça para contar em voz alta os parênteses abertos e fechados. |
| Esperar 3 como resultado de 7 / 2. | Mostre 3.5 e explique a diferença entre divisão exata e divisão inteira. |

**Avaliação**

- print(7 // 2) mostra o quê? (Resposta: 3)
- Se idade = input() e a pessoa digitar 30, qual é o tipo? (Resposta: str)
- Quanto é 10 % 3? (Resposta: 1)

**Lição de casa**

Escrever um programa que pergunte a hora em que o Lumi foi visto e calcule quantos minutos faltam até 21h47. Próximo passo: Fase 3, Condicionais.

### Aula 3: Os álibis

**Fase 3 · 50 min**

Fazer o computador decidir caminhos com if, elif e else, usando comparações e a lógica de and, or e not.

**Objetivos**

- Comparar valores com ==, !=, <, >, <= e >=.
- Escrever if, elif e else com a indentação correta.
- Combinar condições com and, or e not.
- Interpretar erros de sintaxe e de recuo.

**Habilidades trabalhadas**

- Estruturas de decisão: o programa escolhe caminhos.
- Lógica booleana: verdadeiro e falso como resultados de perguntas.
- Teste e depuração: testar um caminho de cada vez.
- Decomposição: transformar um álibi em regras verificáveis.

**Pré-requisitos**

- Aulas 1 e 2: print(), variáveis, input(), conversões e o tipo bool.

**Materiais**

- Slides da Aula 3 (modo aula).
- Ficha de álibis: horários dos quatro suspeitos escritos no quadro ou impressos.
- Dupla de trabalho para a prática final.

**Cronograma**

| Tempo | Atividade |
|---|---|
| 0–6 min | Abertura: "Se o álibi do Caio cobre 21h40, ele é suspeito?" |
| 6–14 min | Comparações e o tipo bool. Peça previsões antes de executar. |
| 14–26 min | if e else ao vivo, com o exemplo do guarda-chuva. |
| 26–34 min | elif e a ordem das condições: mude a hora e observe o caminho. |
| 34–42 min | and, or e not. Erro de recuo proposital. |
| 42–50 min | Prática em duplas: um if para o álibi de um suspeito. |

**Perguntas para a turma**

- Por que o if precisa de dois pontos no fim da linha?
- 5 == 5.0 é True ou False?
- Se a condição do elif for verdadeira e a do else também, qual frase aparece?

**Erros comuns e como conduzi-los**

| Erro | Como conduzir |
|---|---|
| Usar = no lugar de == dentro do if gera SyntaxError. | Lembre que = guarda um valor e == pergunta se são iguais. |
| Esquecer os dois pontos no fim do if. | Peça para a turma encontrar o lugar onde faltam os dois pontos. |
| Recuo errado gera IndentationError. | Conte os espaços em voz alta e mostre que cada bloco precisa do mesmo recuo. |
| Escrever "else if" em vez de elif gera SyntaxError. | Mostre a forma correta e pergunte por que o Python não entende a outra. |
| Comparar texto com número: "34" == 34 dá False sem erro. | Este é o erro mais traiçoeiro: pergunte o tipo de cada lado antes de comparar. |

**Avaliação**

- print(3 > 2 and 2 > 5) mostra o quê? (Resposta: False)
- x = 3, com if x % 2 == 0 e else: o resultado é par ou ímpar? (Resposta: ímpar)
- Qual operador inverte um valor booleano? (Resposta: not)

**Lição de casa**

Escrever um if para dois suspeitos com álibis diferentes e explicar em uma frase por que cada caminho foi escolhido. Próximo passo: Fase 4, Laços.

### Aula 4: As câmeras

**Fase 4 · 50 min**

Repetir tarefas com for e while, usar range() e acumular valores para analisar gravações em série.

**Objetivos**

- Repetir um bloco de código para cada item com for.
- Gerar sequências de números com range().
- Acumular valores em uma variável.
- Usar while com uma condição que um dia deixa de ser verdadeira.

**Habilidades trabalhadas**

- Repetição (laços): fazer a mesma tarefa muitas vezes sem copiar código.
- Padrões: perceber quando uma tarefa se repete.
- Abstração: o laço trabalha para qualquer quantidade de itens.
- Depuração: reconhecer e interromper um laço infinito.

**Pré-requisitos**

- Aulas 1 a 3: print(), variáveis, comparações e if.

**Materiais**

- Slides da Aula 4 (modo aula).
- Lista de horários das câmeras escrita no quadro (por exemplo, 21h40 a 21h47, minuto a minuto).
- Cronômetro para a prática.

**Cronograma**

| Tempo | Atividade |
|---|---|
| 0–5 min | Abertura: "As câmeras gravaram por minutos. Você olharia todos um por um?" |
| 5–15 min | for e range() ao vivo. |
| 15–25 min | Acumulador: somar valores dentro do laço. |
| 25–35 min | while e a condição que muda a cada volta. |
| 35–42 min | Laço infinito: apenas mostrar o código, sem executar. |
| 42–50 min | Prática em duplas: listar os horários das câmeras com for. |

**Perguntas para a turma**

- Quantas vezes o laço repete com range(3)?
- Quais números aparecem em range(1, 4)?
- O que aconteceria se esquecêssemos de atualizar a variável de um while?

**Erros comuns e como conduzi-los**

| Erro | Como conduzir |
|---|---|
| range(1, 5) não inclui o 5. | Mostre a lista gerada e pergunte qual é o último número. |
| Esquecer de atualizar a variável do while. | Pergunte: a condição algum dia vai virar falsa? Só é seguro executar se a resposta for sim. |
| Recuo errado dentro do for gera IndentationError. | Mostre que a linha que repete precisa estar um nível abaixo do for. |
| Acumulador não é zerado antes do laço. | Peça para a turma prever o total antes de executar. |

**Avaliação**

- for i in range(3): print(i) mostra o quê? (Resposta: 0, 1 e 2)
- total = 0 com for n in range(1, 4): total += n. Qual é o total? (Resposta: 6)
- contador = 0 com while contador < 3: contador += 1 e print(contador). Quantas linhas aparecem? (Resposta: 3)

**Lição de casa**

Escrever um for que mostre os horários das câmeras de 21h40 a 21h47. Próximo passo: Fase 5, Listas e textos.

### Aula 5: Mensagens cifradas

**Fase 5 · 50 min**

Guardar vários valores em listas, acessá-los pelo índice e transformar textos com métodos e fatiamento.

**Objetivos**

- Criar listas e acessar itens pelo índice.
- Usar len() e append() para ler e aumentar uma lista.
- Aplicar métodos de texto como upper(), strip() e replace().
- Percorrer uma lista com for.

**Habilidades trabalhadas**

- Estruturas de dados: agrupar informações relacionadas.
- Representação de informação: o texto é uma sequência de letras.
- Algoritmos de transformação: aplicar a mesma regra a cada item.
- Abstração: tratar a lista inteira como um único objeto.

**Pré-requisitos**

- Aulas 1 a 4: variáveis, tipos, if e for/range.

**Materiais**

- Slides da Aula 5 (modo aula).
- Tabela de letras com posição (A = 0, B = 1 e assim por diante) para explicar índices.
- Pequeno bilhete com uma mensagem cifrada para a turma decifrar.

**Cronograma**

| Tempo | Atividade |
|---|---|
| 0–5 min | Abertura: "Quatro suspeitos numa só gaveta. Como guardar todos juntos?" |
| 5–15 min | Listas e índices: a contagem começa em zero. |
| 15–25 min | append() e len(): crescer a lista e medi-la. |
| 25–35 min | Métodos de texto: upper(), strip(), replace(). |
| 35–45 min | Mensagem ao contrário: fatiamento com [::-1]. |
| 45–50 min | Avaliação rápida e recados. |

**Perguntas para a turma**

- Qual é o índice do último item de uma lista com 4 elementos?
- upper() muda a variável original ou devolve um novo texto?
- Por que lista[1] é o segundo item, e não o primeiro?

**Erros comuns e como conduzi-los**

| Erro | Como conduzir |
|---|---|
| Confundir posição com índice: lista[1] parece ser o primeiro item. | Use a tabela de letras: A = 0, B = 1. Peça para a turma achar a letra do índice 2. |
| IndexError: list index out of range. | Pergunte quantos itens a lista tem e qual é o maior índice válido. |
| Tentar trocar uma letra de um texto: texto[0] = "X" gera TypeError. | Explique que texto é imutável: métodos devolvem um texto novo. |
| Escrever texto.upper sem parênteses mostra a função, não o resultado. | Peça para a turma comparar as duas linhas e ler a diferença. |

**Avaliação**

- suspeitos = ["Helena", "Caio", "Bia"]; print(suspeitos[1]) mostra o quê? (Resposta: Caio)
- print(len("LUMI")) mostra o quê? (Resposta: 4)
- print("lumi".upper()) mostra o quê? (Resposta: LUMI)

**Lição de casa**

Criar uma lista com os quatro suspeitos e mostrar cada nome em maiúsculas. Próximo passo: Fase 6, Funções.

### Aula 6: A revelação

**Fase 6 · 50 min**

Organizar o raciocínio em funções: escrever uma regra uma vez e reutilizá-la para qualquer suspeito.

**Objetivos**

- Criar uma função com def e chamá-la.
- Passar informações para a função com parâmetros.
- Devolver um resultado com return.
- Diferenciar print (mostrar) de return (devolver).

**Habilidades trabalhadas**

- Decomposição: dividir um problema grande em partes menores.
- Abstração: nomear uma regra e usá-la sem repetir código.
- Reutilização: uma mesma função serve para vários casos.
- Modularização: separar a regra do lugar onde ela é usada.

**Pré-requisitos**

- Aulas 1 a 5, em especial comparações (Aula 3) e conversões (Aula 2).

**Materiais**

- Slides da Aula 6 (modo aula).
- Quadro com os horários dos suspeitos: Helena 21h30 a 21h50, Caio 21h40 a 21h45.
- Folha em branco para a turma escrever a função em duplas.

**Cronograma**

| Tempo | Atividade |
|---|---|
| 0–5 min | Abertura: "Vamos repetir o mesmo cálculo para cada suspeito?" |
| 5–15 min | def e chamada da função, ao vivo. |
| 15–25 min | Parâmetros: a função recebe dados de fora. |
| 25–35 min | return versus print: mostre a diferença na mesma execução. |
| 35–45 min | Prática em duplas: função que diz se um horário está coberto por um álibi. |
| 45–50 min | Revelação: fechamento do caso e recados finais. |

**Perguntas para a turma**

- Qual é a diferença entre print e return?
- Quantas vezes a função roda se a chamarmos três vezes?
- Por que escrever uma função é melhor do que copiar o mesmo código?

**Erros comuns e como conduzi-los**

| Erro | Como conduzir |
|---|---|
| Esquecer os parênteses ao chamar: saudar mostra a função, não executa. | Peça para a turma comparar saudar e saudar() e ler o resultado de cada um. |
| Função sem return: print(resultado) mostra None. | Pergunte o que a função devolveu. Mostre que print não é return. |
| Chamar a função sem passar o parâmetro gera TypeError. | Leia a mensagem em voz alta: ela diz qual argumento faltou. |
| Corpo da função sem recuo gera IndentationError. | Mostre o recuo como parte da definição da função. |

**Avaliação**

- def dobro(n) com return n * 2, depois print(dobro(4)). O que aparece? (Resposta: 8)
- Uma função com print dentro é chamada sem return. O que aparece? (Resposta: o texto do print)
- def f(): sem return, e print(f()). O que aparece? (Resposta: None)

**Lição de casa**

Escrever uma função que receba o horário de um suspeito e diga se ele tem álibi para 21h45. Fim da sequência: o professor decide o que vem depois.

---

Para o uso do jogo em sala (liberação de aulas e fases, slides e notas do professor), veja o [guia do professor](INSTRUCOES_PROFESSOR.md).
