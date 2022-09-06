#!/bin/bash

set -e

name=test_db
export DATABASE_URL=postgresql://epdashboarduser:epdashboardpass@127.0.0.1:5433/epdashboarddb_test

set -x

docker run -d \
    --name $name \
    -p 5433:5432 \
    -e POSTGRES_USER=epdashboarduser \
    -e POSTGRES_PASSWORD=epdashboardpass \
    -e POSTGRES_DB=epdashboarddb_test \
    postgres:13.4

sleep 5
npx prisma migrate dev --name init

set +e
npx ts-node script.ts

set +x
hash=`docker ps | grep $name | awk '{ print $1 }'`
set -x

docker rm -f $hash
