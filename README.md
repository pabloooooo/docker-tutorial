docker run -d -P --name cs320 traefik/whoami

docker build -t angular-frontend-image .
docker run -p 8085:4200 -d angular-frontend-image
