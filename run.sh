#!/bin/bash

set -e

name=prismadb
export DATABASE_URL=postgresql://prismauser:prismapass@127.0.0.1:5555/prismadb

set -x

# docker run -d \
#     --name $name \
#     -p 5555:5432 \
#     -e POSTGRES_USER=prismauser \
#     -e POSTGRES_PASSWORD=prismapass \
#     -e POSTGRES_DB=prismadb \
#     postgres:13.4
docker-compose run -p 5555:5432 --name $name -d postgres

sleep 5
npx prisma migrate dev --name init

set +e
npx ts-node script.ts

set +x
hash=`docker ps | grep $name | awk '{ print $1 }'`
set -x

docker rm -f $hash
