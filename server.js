const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

//register partials(include files)
hbs.registerPartials(__dirname + '/views/partials');
//adding handlebars related functionality
app.set('view engine', 'hbs');
//adding middleware


app.use((req, res, next) => {
   var now = new Date().toString();
   var log = `${now}: ${req.method} ${req.url}`;
   console.log(log);
   fs.appendFile('server.log', log + '\n', (err) => {
      if (err) {
         console.log('Unable to append to server.log');
      }
   });
   next();
});
//when uncommented this sets site into maintenance mode
//
// app.use((req, res, next) => {
//    res.render('maintenance.hbs');
// });


//this sets up static directory for public access
app.use(express.static(__dirname + '/public'));
//adding function helpers
hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
   return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
   //  res.send({
   //      name: 'OWL',
   //      likes: [
   //          'Grand Theft Auto',
   //          'Sims',
   //          'Media Communications'
   //      ]
   //  });
   res.render('home.hbs', {
      pageTitle: 'Home Page',
      // currentYear: new Date().getFullYear(),
      welcomeMessage: 'This is a welcome message, though'
   })
});

app.get('/about', (req, res) => {
    //res.send will "send" what is inside quoted parameter
    //res.send('About Page');
    //res.render will render template
    res.render('about.hbs', {
      pageTitle: 'About Page',
      // currentYear: new Date().getFullYear()
   });
});

app.get('/project', (req, res) => {
   res.render('project.hbs', {
      pageTitle: 'Projects Page'
   });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Bad Gateway Or Some Shyt Like That...'
    });
});

app.listen(port, () => {
   console.log(`Server is up on port ${port}`);
});
