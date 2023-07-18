FROM eclipse-temurin:17-jdk-alpine
ARG JAR_FILE
WORKDIR /app
COPY application.properties /app/application.properties
ADD mozart-portal-backend-0.0.1-SNAPSHOT.jar /app.jar
EXPOSE 8085
ENTRYPOINT ["java","-jar","/app.jar"]