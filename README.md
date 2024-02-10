# Object-Management-Locations-Back
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

docker exec -it kibbutzil-back-mongo-1 mongosh
use admin
db.createUser({ user: "1223d", pwd: "1223d", roles: ["root"] })
