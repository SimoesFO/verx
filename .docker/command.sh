#!/bin/bash

npm install
npx prisma migrate deploy
npx prisma db seed
npm run start:dev
# tail -f /dev/null