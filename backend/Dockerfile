# Etapa de execução: usa uma imagem leve do OpenJDK para rodar a aplicação
FROM openjdk:17-jdk-alpine
COPY . .
# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o arquivo JAR gerado na etapa de build
COPY --from=build /app/build/libs/EncontreMeuPet-0.0.1-SNAPSHOT.jar app.jar

# Expõe a porta que a aplicação Spring Boot vai usar
EXPOSE 8080

# Comando para executar a aplicação
ENTRYPOINT ["java", "-Duser.timezone=America/Santarem" , "-jar", "app.jar"]