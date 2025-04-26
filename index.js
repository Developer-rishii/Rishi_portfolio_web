const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render("index")
})

app.get('/home', (req, res) => {
  res.render('home')
});

app.get('/about', (req, res) => res.render('about'));
app.get('/services', (req, res) => res.render('services'));
app.get('/projects', (req, res) => res.render('projects'));
app.get('./views/contact', (req, res) => res.render('contact'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})