// Loading modules
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

// Making new express app
const app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

app.set('view engine', 'hbs');

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

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

app.get('/', (req, res) => {
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


app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
