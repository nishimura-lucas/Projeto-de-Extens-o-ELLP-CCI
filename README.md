SIGELLP - Sistema de Gestão Integrada do Projeto de Extensão ELLP

🎯 Objetivo do Sistema
O SIGELLP é uma aplicação web completa (Full Stack) desenvolvida para modernizar e centralizar a administração do Projeto de Extensão ELLP da UTFPR, Campus Cornélio Procópio. O sistema foi concebido como projeto final da disciplina de Certificadora De Competência Identitária.
A plataforma substitui controlos manuais e planilhas descentralizadas por um ambiente digital seguro e eficiente para gerir voluntários, oficinas, escolas parceiras e dados socioeconómicos relevantes do projeto, cumprindo todos os requisitos funcionais propostos.
✅ Funcionalidades Desenvolvidas (Para Avaliação)
Este projeto implementa com sucesso todos os 5 Requisitos Funcionais (RF) definidos no documento de "Projeto Inicial":

RF01: Módulo de Autenticação e Gestão de Usuários

[FEITO] Registo de novos utilizadores (por defeito, como volunteer e pending).

[FEITO] Sistema de Login via POST /auth/login.

[FEITO] Geração de Token JWT para autenticação.

[FEITO] Sistema de "Guarda" (AuthGuard) para proteger rotas da API.

[FEITO] Rota protegida GET /auth/profile para verificar o utilizador logado.

RF02: Módulo de Gestão de Voluntários

[FEITO] O Registo (RF01) serve como "autocadastro de voluntário", que entra com status pending (pendente).

[FEITO] Rota protegida GET /volunteers para o Coordenador visualizar todos os voluntários.

[FEITO] Rota protegida PATCH /volunteers/:id/approve para o Coordenador "aprovar" um voluntário (mudar o status de pending para approved).

RF03: Módulo de Gestão de Oficinas

[FEITO] Rota protegida POST /oficinas para um Professor/Tutor (ou Admin) criar uma nova oficina.

[FEITO] A oficina é automaticamente associada (via tutorId) ao utilizador que a criou.

RF04: Módulo de Gestão de Escolas Participantes

[FEITO] Rota protegida POST /escolas para um Coordenador cadastrar uma nova escola/ONG/creche.

[FEITO] Rota protegida GET /escolas para o Coordenador visualizar a lista de todas as instituições cadastradas.

RF05: Módulo de Levantamento Socioeconômico

[FEITO] Rota PÚBLICA POST /levantamento para o envio de formulários anónimos (garantindo a LGPD ao não associar userId).

[FEITO] Rota PROTEGIDA GET /levantamento para o Coordenador poder visualizar os dados consolidados.

🛠️ Roteiro de Instalação e Execução

A seguir estão as instruções exatas para compilar, executar e testar o sistema.

Ferramentas Utilizadas

| Ferramenta | Versão (Testada) | Link para Download |
| Node.js | v22.15.0+ | nodejs.org |
| PostgreSQL | 16+ | postgresql.org/download |
| pgAdmin 4 | (Qualquer) | pgadmin.org/download |
| Git | 2.51.2+ | git-scm.com/downloads |
| VS Code (IDE) | (Recomendado) | code.visualstudio.com |

1. Configuração da Base de Dados (PostgreSQL)

Após instalar o PostgreSQL e o pgAdmin, abra o pgAdmin.

Conecte-se ao seu servidor local (normalmente localhost, utilizador postgres e a senha que definiu na instalação, ex: 123456).

Na barra lateral, clique com o botão direito em "Databases" -> "Create" -> "Database...".

No campo "Database", digite o nome exato: sigellp_db

Clique em "Save".

O backend (NestJS) irá criar todas as tabelas (users, oficinas, escolas, levantamentos) automaticamente na primeira vez que for executado, graças ao synchronize: true no app.module.ts.

2. Roteiro para Executar a Aplicação

Clone o repositório:

git clone [https://github.com/nishimura-lucas/Projeto-de-Extens-o-ELLP-CCI](https://github.com/nishimura-lucas/Projeto-de-Extens-o-ELLP-CCI)
cd Projeto-de-Extens-o-ELLP-CCI

Execute o Back-end (Terminal 1):

# Navegue até a pasta do back-end
cd backend

# Instale as dependências
npm install

# Inicie o servidor
npm run start
O servidor estará a rodar em http://localhost:3000.

Execute o Front-end (Terminal 2):

# (Abra um novo terminal)
# Navegue até a pasta do front-end
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

A aplicação estará acessível no seu navegador em http://localhost:5173.

🧪 Roteiro de Testes (Passo a Passo)

Siga os passos abaixo para testar todas as funcionalidades implementadas.

Contas de Acesso Padrão

Não há contas padrão. O sistema de registo é o ponto de partida.

Passo 1: Testar RF05 (Formulário Anónimo)

Aceda a http://localhost:5173.

Navegue até ao fundo, ao "Formulário Socioeconômico (RF05)".

Preencha o formulário (sem fazer login) e clique em "Enviar Dados Anónimos".

Verificação: A mensagem de sucesso "Levantamento enviado com sucesso!" deve aparecer.

Prova: Vá ao pgAdmin, clique com o botão direito na tabela levantamentos e clique em "Refresh". Depois, clique em "View/Edit Data" -> "All Rows". O registo que acabou de criar estará lá.

Passo 2: Testar RF01 e RF02 (Registo de Voluntário)

Aceda a http://localhost:5173.

No painel "Página de Registo (RF02)", crie dois utilizadores:

Utilizador 1 (Admin): Nome: Admin, Email: admin@email.com, Pass: 123456

Utilizador 2 (Professor): Nome: Prof, Email: prof@email.com, Pass: 123456

Verificação: Ambos os registos devem dar sucesso ("...criado com sucesso!").

Prova (O Passo do Coordenador):

Vá ao pgAdmin e abra a tabela users ("View/Edit Data").

Você verá os seus dois novos utilizadores. Ambos estarão com role: 'volunteer' e status: 'pending'.

Altere manually os dados para os nossos testes:

Na linha do admin@email.com: mude a role para admin e o status para approved.

Na linha do prof@email.com: mude a role para professor e o status para approved.

Clique no botão "Save Data Changes" (ícone de disquete) no pgAdmin.

Passo 3: Testar RF01 e RF02 (Login e Gestão de Coordenador)

Aceda a http://localhost:5173.

No painel "Entrar no Sistema (RF01)", faça login com a conta de Admin:

Email: admin@email.com, Pass: 123456.

Verificação: A mensagem "Login efetuado com sucesso!" deve aparecer.

Clique no botão "Aceder à Rota Protegida /profile".

Verificação: A mensagem "Sucesso! Você está autenticado." deve aparecer com os dados do utilizador Admin.

Navegue até ao "Painel do Coordenador (RF02)".

Clique em "Carregar Voluntários".

Verificação: A tabela deve mostrar os utilizadores volunteer (se tiver criado algum extra), mas não deve mostrar o admin ou o professor.

(Se tiver um utilizador pending de um teste anterior, pode testar o botão "Aprovar").

Passo 4: Testar RF04 (Gestão de Escolas - como Admin)

Ainda logado como admin@email.com.

Navegue até ao "Painel de Gestão de Escolas (RF04)".

Preencha o formulário para criar uma nova instituição (ex: Nome: "Escola Teste", Tipo: "ONG").

Clique em "Salvar Nova Instituição".

Verificação: A mensagem de sucesso deve aparecer, e a tabela "Instituições Cadastradas" (no próprio painel) deve ser atualizada com a "Escola Teste".

Prova: Verifique a tabela escolas no pgAdmin. A "Escola Teste" estará lá.

Passo 5: Testar RF03 (Gestão de Oficinas - como Professor)

Faça Logout (se necessário, atualize a página F5 para limpar o token e os painéis).

No painel "Entrar no Sistema (RF01)", faça login com a conta de Professor:

Email: prof@email.com, Pass: 123456.

Verificação: Login deve ter sucesso.

Navegue até ao "Painel do Professor (RF03)".

Preencha o formulário (ex: Tema: "Aula de Teste", Descrição: "Testando RF03", etc.) e escolha as datas.

Clique em "Criar Oficina".

Verificação: A mensagem de sucesso "Oficina "Aula de Teste" criada com sucesso!" deve aparecer.

Prova: Vá ao pgAdmin e verifique a tabela oficinas. A "Aula de Teste" estará lá, e a coluna tutorId terá o ID do seu utilizador "Prof".

👥 Equipa de Desenvolvimento (Grupo 1)

José Victor Garcia Zacarias

Lucas Nishimura Sato

Marcos Gustavo Lara
