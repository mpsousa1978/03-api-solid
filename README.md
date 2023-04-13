# App

Gympass style app.

## RFs (Requisitos funcionais)

- [x] Deve ser possivel se cadastrar
- [x] Deve ser possível se autenticar
- [x] Deve ser possível obter o perfil de um usuario logado
- [x] Deve ser possível obter o número de check-ins realizados pelo usuario logado;
- [x] Deve ser possível o usuario obter seu histórico de check-in
- [x] Deve ser possível o usuário buscar academias próximas até 10km
- [x] Deve ser possível o usuário buscar academias pelo nome
- [x] Deve ser possível o usuário realizar check-in em uma academia
- [x] Deve ser possível validar o check-in de um usuário
- [x] Deve ser possível cadastrar uma academia

## RNs(Regras de negócios)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] o usuário nao pode fazer 2 check-in no mesmo dia;
- [x] o usuário não pode fazer check-in se não estiver perto (100M) da academias;
- [x] o check-in só pode ser validado até 20 minutos após criado;
- [] o check-in só pode ser validado por administradores;
- [] a academia só pode ser cadastrada por administradores;


## RNFs (Requisitos não-funcionais)

- [x] a senha do usuário precisa estar criptografada
- [x] os dados da aplicação precisam estar persistidos em um banco PostgreSql
- [x] todas a listas de dados precisam estar paginadas com 20 itens por pagica
- [] o usuário deve ser idenficado por um JWT(Json Web Token)



