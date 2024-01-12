# Usage: bash build-and-push-image.sh 1.0.6
docker build --tag recipe-backend --platform=linux/amd64 .

docker tag recipe-backend:latest assensam/recipe-backend:$1
docker tag recipe-backend:latest assensam/recipe-backend:latest
docker push assensam/recipe-backend:$1
docker push assensam/recipe-backend:latest