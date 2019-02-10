// Exercise 1
// Remember to use this using:
// node app.js

// First and always the require for the http server
const http = require('http');

// Next, we create the base of the server object
const server = http.createServer((req, res) => {
  // This will be empty because, exercise 1 want... nothing
});

// And, at last, we "run" the server on the port 8040
server.listen(8040);

// And, (this is personal) let's indicate the user that the server is running
console.log('Server up! Listening on 8040');
console.log('You will find it open a browser and http://localhost:8040');

// I usually put on the comments other ways to do the same and, it can be:
// http.createServer().listen(8040);
