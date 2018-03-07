
In terminal window two

Checkout the git repo

      git checkout ranch simple-categories

change to the simple-categories demo folder

      cd src/simple-categories

run the http server

      ../../node_modules/.bin/http-server .

Open two browsers/tabs here:

      http://127.0.0.1:8080/

Open the devtools in both

type

      list.newItem('test 2');

ItemList adds a new Item to its list, then fires off a message to the server, which relays the same to the 2nd client's ItemList which populates itself with the request.

The second iteration that moves ItemList onto the server as better / will have better support for hydrating full state between newly hooked up clients.


