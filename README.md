# Prove.it - Sistema Avaliativo - Front-end

O front-end do projeto Prove.it foi desenvolvido utilizando Vue.js 2.6. A escolha desta versão atendeu a uma necessidade específica, apesar das ressalvas quanto ao uso do Vue 2 em novos projetos devido ao seu futuro suporte limitado e à melhor integração do Vue 3 com TypeScript. 

Aqui há o link para o front-end hospedado na Netlify: https://demarco-avaliacao.netlify.app/login 

O front está conectado ao back-end na Railway dockerizado em https://proveit-server-production.up.railway.app/

## 🚀 Tecnologias e ferramentas utilizadas

- **Vue.js 2.6**: Um framework progressivo para construir interfaces de usuário.
- **Vue Router**: Gerenciamento de rotas, com suporte a `Roles` para diferentes níveis de acesso.
- **Vuex**: Gerenciamento de estado, usado principalmente para controle de autenticação, gerenciamento de usuário e listagem de avaliações.
- **Vuetify**: Framework de componentes para um rápido desenvolvimento de interfaces ricas.

## 🛠️ Instalação e Uso

### Pré-requisitos

- Node.js
- npm/Yarn

### Configuração

1. Clone este repositório.
2. Na raiz do projeto, instale as dependências:
   ```bash
   npm install
   ```

3. Execute o projeto:
   ```bash
   npm run serve
   ```

4. Acesse a interface e faça login:

   Há duas opções de login disponíveis, sendo elas para o perfil `ALUNO` e para o perfil `ADMIN` (professor). É possível criar novos alunos através da API, porém, nenhuma interface foi desenvolvida no front-end para tal finalidade.

   **Logins disponíveis**:

   - **Admin (professor)**:
     ```
     Matrícula: PROFESSOR
     Senha: SENHAPROFESSOR
     Role: ADMIN
     ```

   - **Aluno**:
     ```
     Matrícula: ALUNO2
     Senha: SENHAALUNO2
     Role: ALUNO
     ```

## 📁 Estrutura do Projeto

O projeto é dividido em dois módulos principais:

- **Autenticação**: Contém funcionalidades relacionadas ao login.
- **Exams**: Engloba tudo relacionado a exames.

A modularização facilita o crescimento do projeto, permitindo a futura adição de módulos como 'curso', 'turma', entre outros.

## 📝 Observações

- O sistema de rotas considera as `Roles` para acesso. Um usuário `ADMIN` tem visibilidade completa, enquanto um `ALUNO` possui visibilidade restrita.
- Optou-se por manter informações localmente ao invés de usar Vuex extensivamente, devido à pouca repetição de estados entre as views.
- A escolha do Vuetify visou acelerar o desenvolvimento. Outras soluções como TailwindCSS poderiam ser usadas para criar componentes personalizados, mas o Vuetify mostrou-se adequado para este projeto.
- TypeScript não foi utilizado devido às limitações de integração com Vue 2.

