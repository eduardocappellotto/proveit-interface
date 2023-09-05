# Prove.it - Sistema Avaliativo - Front-end

O front-end do projeto Prove.it foi desenvolvido utilizando Vue.js 2.6. A escolha desta versão foi uma necessidade, apesar das ressalvas sobre o uso do Vue 2 em novos projetos devido ao seu futuro suporte descontinuado e melhor integração do Vue 3 com TypeScript.

## 🚀 Tecnologias e ferramentas utilizadas

- **Vue.js 2.6**: Framework progressivo para a construção de interfaces de usuário.
- **Vue Router**: Para gerenciamento de rotas, considerando Roles para acesso.
- **Vuex**: Utilizado principalmente para controle de autenticação e gerenciamento de estado de usuário e listagem de avaliações.
- **Vuetify**: Framework de componentes Vue para um rápido desenvolvimento de interfaces ricas.

## 🛠️ Instalação e Uso

### Pré-requisitos

- Node.js
- npm/Yarn

### Configuração

1. Clone este repositório.

2. Na raiz do projeto, instale as dependências:
   ```
   npm install
   ```

3. Execute o projeto:
   ```
   npm run serve
   ```

4. Faça o login na interface:

Você terá 2 opções de login, o login ALUNO e o login ADMIN (professor). 

É possível criar novos alunos á partir da API, mas não criei nenhuma interface no front-end para que isso fosse realizado (a administração do curso subiria um Excel de matrículas por exemplo e faria um inserção em massa)

Segue abaixo os logins criados:

Login Admin (professor)

    ```
    Matrícula: PROFESSOR,
    Senha: SENHAPROFESSOR
    (Role ADMIN)
    ```

Login Aluno (usuário)

    ```
    Matrícula: ALUNO2,
    Senha: SENHAALUNO2
    (Role ALUNO)
    ```
 
## 📁 Estrutura do Projeto

O projeto é dividido em dois módulos principais:

- **Autenticação**: Focado em funcionalidades relacionadas ao login.
- **Exams**: Relacionado a tudo sobre exames.

A estrutura modular do projeto sugere um fácil crescimento, com a adição de módulos como 'curso', 'turma', etc. Esta modularização abrange componentes, store e serviços.

## 📝 Observações

- O sistema de rotas considera as Roles para determinar acessos. Por exemplo, um usuário com role de 'admin' tem visibilidade completa, enquanto um 'aluno' tem visibilidade restrita.
- Muitas das informações foram mantidas localmente, em vez de utilizar o Vuex, devido à falta de repetição de estado entre as views.
- A escolha do Vuetify foi feita para acelerar o desenvolvimento. Embora seja possível utilizar outras soluções, como TailwindCSS, para criar componentes personalizados, o Vuetify foi adequado para este projeto.
- Não foi utilizado TypeScript, já que Vue 2 não foi originalmente projetado para ele, e as implementações são adaptações.

 