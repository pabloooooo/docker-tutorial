# Stage 1: Build the application
FROM eclipse-temurin:21-jdk-jammy as build

# Set the working directory in the Docker image
WORKDIR /app

# Copy the Gradle configuration files separately to leverage Docker cache
COPY gradlew /app/
COPY gradle /app/gradle
COPY build.gradle /app/
COPY settings.gradle /app/

# Grant execution permissions on the Gradle wrapper
RUN chmod +x ./gradlew

# Copy the rest of your application code
COPY src /app/src

# Build the application using Gradle
RUN ./gradlew build --no-daemon

# Stage 2: Run the application
FROM eclipse-temurin:21-jre-jammy

# Copy the built artifact from the build stage
COPY --from=build /app/build/libs/*.jar /app/spring-boot-application.jar

# Expose the port on which your application will run
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "/app/spring-boot-application.jar"]
