// Excercise 8
// Remember to use this using:
// node app.js

// We use the base of the exercise 2? :)

// First and always the require for the http server
const http = require('http');

// Next, we create the base of the server object
const server = http.createServer((req, res) => {
  // Because it's not time to put all the code from the other exercises and
  // create something biiiiiiiiig where you will get loose, let's not put
  // the logic on every "mount point" but the error

  // Remember that it can be done with a case BUT, and there's allways a but
  // the case for the excercise 4 will be "nice", so, using if else like
  // it will be easer... or not
  if (req.url === '/ping') {
    // The Pong exercise (2)
    console.log('Pong!')
    res.end();
  } else if (req.url === '/version') {
    // The version excercise (3)
    console.log('The version of node excercise 3');
    res.end();
  } else if (req.url.includes('/images')) {
    console.log('Excercises 4, 4.1 and 4.2');
    res.end();
  } else if (req.url === '/Nicholas') {
    console.log('Excercise 5');
    res.end();
  } else if (req.url === '/Romaguera') {
    console.log('Excercise 6');
    res.end();
  } else if (req.url === '/todo') {
    console.log('Excercise 7');
    res.end();
  } else if (req.url === '/sorted-users') {
    console.log('Excercise 8');
    res.end
  } else {
    // If you put something that it's not in the API
    console.log('Someone has tried to enter in: ' +req.url);
    res.statusCode = 404;
    res.statusMessage = 'Not Found';
    res.end(`<!DOCTYPE html>
    <html lang="en" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>Error 404. Page not found</title>
        <style>
          html {
            font-family: Arial;
            text-align: center;
            background-color: rgba(0, 0, 0, 0.7);
          }
          body {
            margin: 3em;
          }
          h1 {
            font-size: 4em;
            color: white;
            margin: 0 0.5em;
          }
          p {
            font-size: 0.8em;
            color: red;
          }
        </style>
      </head>
      <body>
        <h1>Error404!</h1>
        <p>Page not found, sorry.</p>
      </body>
    </html>`);
  }
});

// And, at last, we "run" the server on the port 8040
server.listen(8040);

// And, (this is personal) let's indicate the user that the server is running
console.log('Server up! Listening on 8040');
console.log('You will find it open a browser and http://localhost:8040');

// Other ways to do this.
// You can use reduce because it's the swish army knife for doing what ever you
// want or, maybe, I haven't tried, on the sort, on the callbackfuncion do the
// filter and then return the sort... but on this way you can see the steps
// more easy
