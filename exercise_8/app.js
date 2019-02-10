// Exercise 8
// Remember to use this using:
// node app.js

// We use the base of the exercise 4? :)

// First and always the require for the http server
const http = require('http');
// And, on this case for the https too
const https = require('https');

// Next, we create the base of the server object
const server = http.createServer((req, res) => {
  // Let's create the entry point
  if (req.url === '/sorted-users') {
    // Lets get all the users like in the older excersices (I think... 5)
    var allUsers = '';
    // The get!
    https.get('https://jsonplaceholder.typicode.com/users', (response) => {
      response.on('error', (error) => {
        console.log('There was an error! '+ error);
      })
      .on('data', (theData) => {
        allUsers += theData;
      })
      .on('end', () => {
        // First parse it as JSON
        allUsers = JSON.parse(allUsers);
        // Maybe the best it's to do it in only one "big" line but...
        let filteredUsers = allUsers.filter((element) => {
          return !element.website.includes('.com') && !element.website.includes('.net') && !element.website.includes('.org');
        });
        // And now, order them
        let filteredSortedUsers = filteredUsers.sort((elementA, elementB) => {
          if (elementA.website > elementB.website) return 1; // return true
          if (elementA.website < elementB.website) return -1; // false
          return 0; // return 0
        });
        console.log(filteredSortedUsers); // On the console
        res.write(JSON.stringify(filteredSortedUsers)); // On the browser
        res.end();
      });
    });
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
