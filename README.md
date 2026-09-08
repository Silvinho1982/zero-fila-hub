# Fila Zero-ui

Atue como uma desenvolvedora sênior e, assim, me forneça o que se pede:

Desenvolva a interface mobile-first completa para o sistema Fila Zero - UBS, estruturando um fluxo navegável (com rotas funcionais) baseado exatamente nas três telas apresentadas na imagem de referência (Login, Cadastro e Principal/Boas-vindas), além de criar a tela que faltava de recuperação de senha:

1. Identidade Visual e Padrão:

Siga estritamente a paleta de cores vista nas imagens: tons de azul royal/marinho, fundos limpos em branco e cinza claro, tipografia sem-serifa moderna e sombras suaves nos cards.

Utilize o logotipo oficial em todas as telas (o ícone "0" estilizado com cruz médica e estetoscópio verde/azul, seguido do texto "FILA ZERO UBS").

2. Tela 1: Login

Inputs para "Digite seu CPF ou CNES" e "Digite sua senha" (com ícones correspondentes).

Link clicável "Esqueceu a senha?" que redireciona para a tela de Recuperação de Senha.

Botão principal azul "Acessar" e opção secundária "Entrar com Gov.br" separadas pelo divisor "OU".

3. Tela 2: Cadastro (Novo usuário)

Campos de preenchimento: Nome completo, CPF ou CNES, Senha e Repita sua senha.

Botão principal "Cadastrar".

Rodapé interativo com o texto: "CPF já cadastrado? Faça o login!" (com redirecionamento para a tela de login).

4. Tela 3: Recuperação de Senha (Implementação solicitada e complementar)

Crie uma tela dedicada para redefinição de senha contendo: título amigável, input para digitação do CPF cadastrado, botão "Enviar instruções de recuperação" e um botão de voltar para a tela de login.

5. Tela 4: Principal / Boas-vindas (Painel do Cidadão)

Cabeçalho de boas-vindas personalizado: "Olá, Cidadão!" abaixo do logotipo do app.

Seção de Ações contendo um menu em grade (grid) estilizado com botões interativos em cards azuis/brancos baseados na imagem:

UBS (Localizar unidades básicas de saúde)

Prioridade (Consultar critérios de prioridade)

Sintomas (Triagem rápida de sintomas)

Triagem (Status atual na fila)

Classificação (Visualização de senhas chamadas)

Mapa (Geolocalização das filas)

Agenda (Consultas agendadas)

Fale conosco (Suporte ou Ouvidoria da saúde)

Requisitos técnicos: Utilize React, Tailwind CSS, ícones modernos (Lucide React) e configure a navegação (Router) para que seja possível alternar fluidamente entre Login, Cadastro, Recuperação de Senha e a Tela Principal ao clicar nos elementos correspondentes.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/fac8f163-2b82-4331-b7b9-21b09f93b407).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
