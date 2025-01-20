# Backend

## Dependências
### Pacotes do Projetos
- Spring WEB
- Spring Data JPA
- Validation
- Spring Security
- PostgreSQL Driver

### Banco de Dados
- Postgres

Verifique o arquivo application.properties no caminho:

    backend/src/main/resources/application.properties

E troque as credenciais abaixo com as credenciais do seu banco de dados
```sh
#O "encontre_pet" é o nome do seu banco de dados
spring.jpa.properties.hibernate.connection.url=jdbc:postgresql://localhost:5432/encontre_pet
spring.jpa.database=postgresql # Conector do Banco de Dados, mysql, sqlserver, postgres
spring.jpa.properties.hibernate.connection.password=postgres # Senha do banco
spring.jpa.properties.hibernate.connection.username=postgres # Usuário do banco
```
## Rotas
### Swagger
| Método | Rotas                 |
|--------|-----------------------|
| GET    | swagger-ui/index.html |

### Autenticação
| Método | Rotas    | Descrição           |
|--------|----------|---------------------|
| POST   | register | Cadastro de usuário |
| POST   | login    | Login de Usuário    |
