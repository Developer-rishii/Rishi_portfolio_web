const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
  res.render("index")
})

app.get('/home', (req, res) => {
  res.render('home')
});

app.get('/about', (req, res) => res.render('about'));
app.get('/services', (req, res) => res.render('services'));
app.get('/projects', (req, res) => res.render('projects'));
app.get('/contact', (req, res) => res.render('contact'));

// Export for Vercel serverless
module.exports = app;

// Only listen locally (not on Vercel)
if (require.main === module) {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
}