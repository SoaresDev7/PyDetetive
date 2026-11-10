# Guia do professor

## 1. Entrar na área do professor

Clique em **Professor** no topo e digite a senha da área do professor. A senha está
definida em `index.html` (constante `SENHA_PROFESSOR`).

> **Recomendado:** troque a senha antes de publicar o link para os alunos. Como o
> projeto é público, qualquer pessoa pode ler o código-fonte; a senha serve só para
> evitar acessos acidentais.

## 2. Publicar no GitHub Pages

1. No GitHub, abra o repositório e vá em **Settings → Pages**.
2. Em **Source**, escolha **Deploy from a branch**, branch **main** e pasta **/ (root)**.
3. Clique em **Save**. Em alguns minutos o jogo fica disponível no endereço
   `https://<usuario>.github.io/<nome-do-repositorio>/`.

Observações:

- No plano gratuito do GitHub, o Pages exige que o repositório seja **público**.
- Para atualizar o jogo, basta fazer commit na branch `main`. A publicação é refeita
  automaticamente.

## 3. Planejar uma aula

A área **Planos de aula** traz um plano completo para cada uma das 6 aulas:

- objetivos e habilidades trabalhadas;
- pré-requisitos e materiais de apoio;
- cronograma com tempo estimado (cerca de 50 min por aula);
- perguntas para a turma, erros comuns e como conduzi-los;
- forma de avaliação, roteiro e lição de casa.

Leia o plano antes de liberar a aula para os alunos.

## 4. Projetar os slides

Dentro do plano, abra os **slides** da aula. Eles podem ser projetados direto da
ferramenta, sem precisar criar apresentação do zero. As notas do professor aparecem
somente na área do professor, não para os alunos.

## 5. Controlar o que os alunos veem

- **Liberar aula:** a aula só aparece na aba *Aulas* do aluno depois que você a libera.
- **Fases:** cada fase pode ter um código de acesso. O aluno digita o código para
  desbloquear a fase.

Libere a aula no momento em que for abordá-la com a turma.

## 6. Criar desafios personalizados

Na aba **Novo desafio** você escreve enunciado, código inicial, saída esperada e
critérios. O sistema gera um código para você passar aos alunos:

- **Código curto (até 5 caracteres):** funciona apenas no seu navegador, ou seja, para
  desafios criados e aplicados no mesmo computador.
- **Código completo (começa com `PYD1:`):** é longo, mas funciona em qualquer
  computador. Use este para enviar aos alunos quando eles usarem outro aparelho.

Para o aluno importar um desafio, ele cola o código em **Adicionar desafio do professor**
na aba de missões. O desafio aparece como uma nova missão.

## 7. Dicas de aplicação

- Peça que os alunos instalem ou abram o jogo antes da aula, para não perder tempo.
- Deixe a turma trabalhar em duplas. Quem termina primeiro pode criar um desafio para
  os colegas.

## 8. Problemas comuns

| Problema | O que fazer |
|---|---|
| O código não roda | Recarregue a página e confira a conexão com a internet (o Python é carregado na hora). |
| Aluno perdeu o progresso | O progresso fica no navegador. Peça que ele use o mesmo computador e navegador. |
| Desafio não encontrado | Use o código completo (`PYD1:`) em vez do curto. |
| Aba travada | Código com laço infinito. Recarregue a página. |
