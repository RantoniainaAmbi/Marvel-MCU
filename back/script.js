// backend/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '../front/dist')));

app.get('/characters', (req, res) => {
    const filePath = path.join(__dirname, 'characters.json');

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error('Error reading characters.json:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const characters = JSON.parse(data);
        res.json(characters.characters);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
