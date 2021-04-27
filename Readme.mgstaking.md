# Deploying the MGStaking website

NOTE: Before starting, make sure you have access to the ***Dockerhub*** repository here: https://hub.docker.com/r/clataret/delegationdashboard/

## Locally:
```
cd starter-dapp/react-delegationdashboard
docker build -t clataret/delegationdashboard:prod -f Dockerfile.prod .
docker push clataret/delegationdashboard:prod
```

## On server:
```
cd ~claudiu/mgstaking-docker
docker-compose stop   # website stops after this step
docker-compose rm
docker images
docker rmi <id_of_clataret/delegationdashboard_image>
docker-compose up -d   # website starts after this step
```