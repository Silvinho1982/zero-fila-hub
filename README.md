# Fila Zero-ui


1. Identidade Visual e Padrão:

Paleta de cores vista nas imagens: tons de azul royal/marinho, fundos limpos em branco e cinza claro, tipografia sem-serifa moderna e sombras suaves nos cards.

Logotipo oficial em todas as telas (o ícone "0" estilizado com cruz médica e estetoscópio verde/azul, seguido do texto "FILA ZERO UBS").

2. Tela 1: Login

Inputs para "Digite seu CPF ou CNES" e "Digite sua senha" (com ícones correspondentes).

Link clicável "Esqueceu a senha?" que redireciona para a tela de Recuperação de Senha.

Botão principal azul "Acessar" e opção secundária "Entrar com Gov.br" separadas pelo divisor "OU".

3. Tela 2: Cadastro (Novo usuário)

Campos de preenchimento: Nome completo, CPF ou CNES, Senha e Repita sua senha.

Botão principal "Cadastrar".

Rodapé interativo com o texto: "CPF já cadastrado? Faça o login!" (com redirecionamento para a tela de login).

4. Tela 3: Recuperação de Senha (Implementação solicitada e complementar)

Tela dedicada para redefinição de senha contendo: título amigável, input para digitação do CPF cadastrado, botão "Enviar instruções de recuperação" e um botão de voltar para a tela de login.

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

Requisitos técnicos: React, Tailwind CSS, ícones modernos (Lucide React) e navegação (Router) para que seja possível alternar fluidamente entre Login, Cadastro, Recuperação de Senha e a Tela Principal ao clicar nos elementos correspondentes.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
