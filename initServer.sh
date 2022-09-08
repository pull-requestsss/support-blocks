#!/bin/sh
# handle backend-server dependencies
printf "started resolving dependencies for backend server \n"
npm install --prefix ./server
printf "successfully resolved backend dependencies \n\n"
node ./server/server.js