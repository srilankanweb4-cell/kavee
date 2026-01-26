const express = require('express');
const app = express();
const path = require('path'); // ✅ MISSING
const bodyParser = require("body-parser");

__path = process.cwd();

const PORT = process.env.PORT || 8000;
let code = require('./start');

require('events').EventEmitter.defaultMaxListeners = 500;

/* ---------- MIDDLEWARES ---------- */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// public folder serve
app.use(express.static(path.join(__dirname, 'public')));

/* ---------- ROUTES ---------- */
app.use('/code', code);

// /pair → public/pair.html
app.get('/start', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pair.html'));
});

// / → public/main.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

/* ---------- SERVER ---------- */
app.listen(PORT, () => {
    console.log(`
Don't Forget To Give Star ‼️

Server running on http://localhost:${PORT}
`);
});

module.exports = app;
