# Docker Intro Tutorial

The purpose of this project is to demonstrate how your project can be made into a Docker container. The project consists of an Angular frontend where users can create, view, and delete a person object. This user object is passed to a Spring Boot backend and saved to a MongoDB document. Angular, Spring Boot, and MongoDB are not commonly used together; this was chosen purposefully to demonstrate the versatility of Docker containers.

## Getting Started

The first step in learning Docker is to download Docker for Desktop from the official Docker website. This will download the Docker Engine as well as the Desktop UI. You can find it [here](https://www.docker.com/get-started/).

## Running the Image

Although you can individually build the images and run them through the command line, I recommend using the `docker-compose.yml` file as this stack is meant to run together, with the frontend relying on the backend and the backend relying on the database. There are also environmental variables that change depending on whether the app is running in a Docker environment or on a physical system.

Below are the files where the variables change depending on the environment:

Frontend:
- [environment.development.ts](angular-frontend/src/environments/environment.development.ts)
- [environment.ts](angular-frontend/src/environments/environment.ts)

Backend:
- [application.yml](spring-backend/src/main/resources/application.yml)

## Usage

The first time you run the `docker-compose up` command in the root directory, it may take a while for the containers to build as your system caches and builds the containers. After this, subsequent runs will be much quicker.

Once the Docker stack is running, you can access the Angular frontend application by opening your web browser and navigating to `http://localhost:8085`.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

