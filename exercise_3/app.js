// Exercise 3
// Remember to use this using:
// node app.js

// We use the base of the exercise 2

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
    res.end(); // Closing
    // Because it's on the client and it must be (usually) an HTML
    // it will be perfect if it's well formed (HTML well formed)
  } else if (req.url === '/version'){
    // The same as before, first on the console, second on the browser
    console.log('The node version is: ' + global.process.version);
    res.write(`<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title>Node version response</title>
  <style>
  h1 {
    text-align: center;
    font-size: 3em;
    color: rgba(12, 12, 12, 0.9);
    margin: 0.5em;
  }
  p {
    text-align: center;
    color: red;
  }
  </style>
</head>
<body>
  <h1>Node version</h1>
  <p>${global.process.version}</p>
</body>
</html>`); // To the browser and beyond!
    res.end(); // Closing
  }
});

// And, at last, we "run" the server on the port 8040
server.listen(8040);

// And, (this is personal) let's indicate the user that the server is running
console.log('Server up! Listening on 8040');
console.log('You will find it open a browser and http://localhost:8040');

// Other ways to do this.
// I use if, but can be done by a case, it will be more elegant, but it will
// deppend of the person who will see it.
// And yes, the "HTML" verion of the response can be better if we add some
// styling and so on
