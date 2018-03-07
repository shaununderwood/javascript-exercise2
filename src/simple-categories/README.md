
# run and install instructions for Simple-Categories

Checkout the git repo

      git checkout master

Install dependancies

      npm i

Branch over to the simple-categories code

      git checkout simple-categories

change to the simple-categories demo folder

      cd src/simple-categories

start the client http-server

      npm run client

Open a new terminal window and start the websocket server

      npm run server

Open two browsers/tabs here:

      http://127.0.0.1:8080/

Open the devtools in both

type the following in one of them

      list.newItem('test 2');

ItemList adds a new Item to its list, then fires off a message to the server, which relays the same to the 2nd client's ItemList which populates itself with the request.

The second iteration of this (branch 03-moving-state-to-server) moves ItemList onto the server as better / will have better support for hydrating full state between newly hooked up clients.


