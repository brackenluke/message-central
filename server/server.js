// Import required modules
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

// Initialize Express app
const app = express();

// Set up Handlebars as the view engine without default layouts
app.engine('handlebars', engine({
    defaultLayout: null // Disable default layout
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '..', 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Define routes
app.get('/', (req, res) => {
    res.render('index', { layout: false }); // Specify no layout for this view
});

// Route for the convo page
app.get('/convo', (req, res) => {
    res.render('convo', { layout: false }); // Specify no layout for this view
});

// Route for the messaging page
app.get('/messaging', (req, res) => {
    res.render('messaging', { layout: false }); // Specify no layout for this view
});

// Route for the profile page
app.get('/profile', (req, res) => {
    res.render('profile', { layout: false }); // Specify no layout for this view
});

// Route to display static src images
app.get("/static", (req, res) => {
    res.render("static");
});

// Start the server
app.listen(8080, () => {
    console.log('Server is starting at port 8080');
});

