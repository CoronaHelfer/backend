# Coronahelfer-Hackathon

## First Steps

1. Clone the Project from `git clone https://github.com/n1ghty1993/Coronahelfer-Hackathon.git`
2. Clone the Frontend project `git clone https://github.com/n1ghty1993/Coronahelfer-Hackathon-Frontend.git`

### build the application
`docker-compose build`

### start the application 
`docker-compose up`

### try again
`docker-compose rm`  

# MongoDB persistent storage
### create backup
`docker-compose exec -T mongo mongodump --archive --gzip  > backup.gz`
### restart stack 
be sure to use the latest version of `docker-compose.yml`
`docker-compose up --build`
### restore backup
`docker-compose exec -T db mongorestore --archive --gzip < dump.gz`

# Letsencrypt
The `certbot` container will try to automatically renew the cert after `85` days

!!DOWNTIMEWARNING!!
================
With the current configuration the default nginx will not work until the certificate was successfully created. 

### initialization
`sudo ./certbot-init.sh` 
follow the instructions

Please note that the database volume will be managed via docker volume. A restart of the docker daemon can lead to data loss.

Your local repository folders will be mounted into the running docker container on `/app` 

## local testing
the webserver will be served at `localhost:80` the backend is available at `localhost:3000`
