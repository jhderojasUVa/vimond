// Exercise6
// Remember to use this using:
// node app.js

// We use the base of the exercise 4 and 5? :)

// First and always the require for the http server
const http = require('http');
// And, on this case for the https too
const https = require('https');
// Emitter and his instance (because we must do two http request)
const EventEmitter = require('events');
const emitter = new EventEmitter;

// Next, we create the base of the server object
const server = http.createServer((req, res) => {
  // Again I clean the mesh of the other exercises and some of
  // the comments because, I think, if you get here, you will know
  // what I have done before

  var usersRomaguera = [];
  var postFromRomaguera = [];

  // The solution of the second emition, what it must do
  emitter.on('secondPetition' ,(usersFromRomaguera) => {
    https.get('https://jsonplaceholder.typicode.com/posts', (response) => { // The http petition
      let allPosts = '';

      // When I get data let's add to the data :)
      response.on('data', (theResponseData) => {
        allPosts += theResponseData;
      });

      response.on('end', () => {
        // Well, we have finished the second petition and we have "usersFromRomaguera"
        // with the id of the users... lets filter the content

        // First, let do it in a bad way
        JSON.parse(allPosts).forEach((post) => { // walk trough all post
          usersFromRomaguera.forEach((user) => { // walk trough all user
            if (user.id == post.userId) { // if the post is from the user
              postFromRomaguera.push(post); // we add to the post from
            }
          });
        });
        // It can be refactored in a good way using "reduce"
        // and it will be a more elegant way (if you have time :) )

        console.log(postFromRomaguera); // Now to the console
        res.write(JSON.stringify(postFromRomaguera)); // and on the browser
        res.end();
      });
    });
  });

  if (req.url === '/Romaguera') {
    // We must find the users that have "Romaguera" in his company.name, I guess
    // so, let's work

    var allUsers = '';
    https.get('https://jsonplaceholder.typicode.com/users', (response) => {
      response.on('data', (theResponseData) => {
        allUsers += theResponseData; // All the user will be here
      });

      response.on('end', () => {
        // Filtering the users with company "Romaguera"
        usersRomaguera = JSON.parse(allUsers).filter((element) => {
          return element.company.name.includes('Romaguera');
        });
        emitter.emit('secondPetition', usersRomaguera);
      });
    });
  }

});

// And, at last, we "run" the server on the port 8040
server.listen(8040);

// And, (this is personal) let's indicate the user that the server is running
console.log('Server up! Listening on 8040');
console.log('You will find it open a browser and http://localhost:8040');

// So, as the exercise 5 there's many ways of doing it. For example as I say using
// reduce for recorring the "arrays", something like this
/*
allPost.reduce((postFromRomaguera, element) => {
  // We must walk into the users
  return usersFromRomaguera.forEach((user) => {
    return user.id = element.userId; // And only return where they are the same
  });
})
*/
// Of course this reduce is bad, it's an aproximation or the idea of
// how it can be done.
