// Exercise 2
// Remember to use this using:
// node app.js

// We use the base of the exercise 1

// First and always the require for the http server
const http = require('http');

// Next, we create the base of the server object
const server = http.createServer((req, res) => {
  // So, let's create a request, an easy one :)
  if (req.url === '/ping') { // If they put /ping ...
    // I don't know if the response must be on the console or in the browser
    // so... why not doing both? :)
    console.log('Pong!'); // On the console
    res.write(`<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title>Pong response</title>
</head>
<body>
  <h1>Pong!</h1>
</body>
</html>`); // On the web browser, client or whatever you want
    // Because it's on the client and it must be (usually) an HTML
    // it will be perfect if it's well formed (HTML well formed)
    res.end(); // And, at last, close the response 'Don't forget to do it!''
  }
});

// And, at last, we "run" the server on the port 8040
server.listen(8040);

// And, (this is personal) let's indicate the user that the server is running
console.log('Server up! Listening on 8040');
console.log('You will find it open a browser and http://localhost:8040');

// There's other way to do this and it's listening to the "event" of the server
// What it means:
/*
const server = http.createServer();
server.on('request', (req, res) => {
  .... do the things here ....
});
*/
