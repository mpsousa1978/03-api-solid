# App

Gympass style app.

## RFs (Requisitos funcionais)

- [ ] Deve ser possivel se cadastrar
- [ ] Deve ser possível se autenticar
- [ ] Deve ser possível obter o prfil de um usuario logado
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuario logado;
- [ ] Deve ser ppssível o usuario obter seu hist´rico de check-in
- [ ] Deve ser ppssível o usuário buscar academis próximas
- [ ] Deve ser ppssível o usuário buscar academias pelo nome
- [ ] Deve ser ppssível o usuário realizar check-in em uma academia
- [ ] Deve ser ppssível validar o check-in de um usuário
- [ ] Deve ser ppssível cadastrar uma academia

## RNs(Regras de negócios)

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] o usuário nao pode fazer 2 check-in no mesmo dia;
- [ ] o usuário não pode fazer check-in se não estiver perto (100M) da academias;
- [ ] o check-in só pode ser validado até 20 minutos após criado;
- [ ] o check-in só pode ser validado por administradores;
- [ ] a academia só pode ser cadastrada por administradores;


## RNFs (Requisitos não-funcionais)

- [ ] a senha do usuário precisa estar criptografada
- [ ] os dados da aplicação precisam estar persistidos em um banco PostgreSql
- [ ] todas a listas de dados precisam estar paginadas com 20 itens por pagica
- [ ] o usuário deve ser idenficado por um JWT(Json Web Token)
- [ ] 
- [ ] 



