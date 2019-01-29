// Loading modules
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// Making new express app
const app = express();


hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

// Register a new middleware
app.use((req, res, next) => {
  var now = new Date().toLocaleString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', `${log}\n`, error => {
    if (error) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express<h1>');
  // res.send({
  //   name: 'ahmed',
  //   age: 21
  // });
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    // currentYear: new Date().getFullYear(),
    welcome: 'Welcome to our website'
  })
});


app.get('/about', (req, res) => {
  // res.send('About Page.');
  res.render('about.hbs', {
    pageTitle: 'About Page',
    // currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'Unable to fulfill the request.'
  });
});


app.listen(3000, () => {
  console.log('Server is up on port 3000');
});


console.log('Hello Express.');