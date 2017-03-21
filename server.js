const express = require('express');
const hbs = require ('hbs');
const fs = require('fs')

const port = process.env.PORT || 3000;

console.log('dir: ', __dirname);
console.log('dir: ', __dirname + '/views/partials');
var footerTemplate = fs.readFileSync(__dirname + '/views/partials/footer.hbs', 'utf8');
var app = express();

hbs.registerPartial('footer', footerTemplate);
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');


app.use( (req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
})

//app.use( (req, res, next) => {
//  res.render('maint.hbs');
//})

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  //res.send("<h1>hello express</h1>");
  res.render('home.hbs', {
//    pageTitle: 'About Page',
    welcomeMessage: "Hi",
    currentYear: new Date().getFullYear()
  });
});

app.use(express.static(__dirname + '/public'));

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
