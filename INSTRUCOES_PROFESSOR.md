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

- **Liberar aula:** a aula só aparece na aba *Aulas da turma* do aluno depois que você a libera
  na área **Planos de aula**.
- **Fases:** na aba **Turma e códigos** estão os códigos de acesso de cada fase. Use o
  botão **Projetar** para mostrar o código na tela da turma no momento certo. O aluno
  digita o código no quadro do caso para desbloquear a fase.
- **Apagar progresso deste computador:** zera o progresso salvo neste navegador (use com cuidado).

Libere a aula e a fase no momento em que for abordá-las com a turma.

## 6. Dicas de aplicação

- Peça que os alunos instalem ou abram o jogo antes da aula, para não perder tempo.
- Deixe a turma trabalhar em duplas, e peça que quem termina primeiro explique sua solução.

## 7. Problemas comuns

| Problema | O que fazer |
|---|---|
| O código não roda | Recarregue a página e confira a conexão com a internet (o Python é carregado na hora). |
| Aluno perdeu o progresso | O progresso fica no navegador. Peça que ele use o mesmo computador e navegador. |
| Aba travada | Código com laço infinito. Recarregue a página. |
