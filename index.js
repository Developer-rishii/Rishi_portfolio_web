require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// ─── Middleware ────────────────────────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Dynamically pass BACKEND_URL to EJS templates (defaults to localhost:4000 locally)
app.locals.BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000';

// ─── Page Routes ──────────────────────────────────────────────────────────────
app.get('/', (req, res) => res.render('index'));
app.get('/home', (req, res) => res.render('home'));
app.get('/about', (req, res) => res.render('about'));
app.get('/services', (req, res) => res.render('services'));
app.get('/projects', (req, res) => res.render('projects'));
app.get('/contact', (req, res) => res.render('contact'));

// ─── Server ────────────────────────────────────────────────────────────────────
module.exports = app;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Frontend server listening on port ${port}`);
  });
}