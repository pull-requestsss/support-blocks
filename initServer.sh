#!/bin/sh
# handle backend-server dependencies
node ./server/eventListeners/transactions.js
printf "started resolving dependencies for backend server \n"
npm install --prefix ./server
printf "successfully resolved backend dependencies \n\n"
node ./server/server.js