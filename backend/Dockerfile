# Etapa de build: usa uma imagem do Gradle para compilar a aplicação
FROM gradle:8.11.1-jdk17 AS build

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de build do Gradle (build.gradle, settings.gradle, etc.)
COPY build.gradle .
COPY gradle ./gradle 
COPY ./gradlew gradlew
COPY settings.gradle .
COPY src ./src

# Baixa as dependências e constrói o projeto (ignorando os testes)
RUN ./gradlew build -x test --no-daemon

# Etapa de execução: usa uma imagem leve do OpenJDK para rodar a aplicação
FROM openjdk:17-jdk-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o arquivo JAR gerado na etapa de build
COPY --from=build /app/build/libs/EncontreMeuPet-0.0.1-SNAPSHOT.jar app.jar

# Expõe a porta que a aplicação Spring Boot vai usar
EXPOSE 8080

# Comando para executar a aplicação
ENTRYPOINT ["java", "-Duser.timezone=America/Santarem" , "-jar", "app.jar"]