
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

app.delete('/characters/:id', (req, res) => {
  const filePath = path.join(__dirname, 'characters.json');
  const id = req.params.id;

  fs.readFile(filePath, (err, data) => {
    if (err) return res.status(500).json({ error: 'Error reading file' });

    let charactersData = JSON.parse(data);
    charactersData.characters = charactersData.characters.filter(c => c.id != id);

    fs.writeFile(filePath, JSON.stringify(charactersData, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Error writing file' });
      res.json({ success: true });
    });
  });
});

app.post('/characters', (req, res) => {
  const filePath = path.join(__dirname, 'characters.json');
  const newCharacter = req.body;

  fs.readFile(filePath, (err, data) => {
    if (err) return res.status(500).json({ error: 'Erreur lecture fichier' });

    let charactersData = JSON.parse(data);

    if (charactersData.characters.find(c => c.id == newCharacter.id)) {
      return res.status(400).json({ error: 'ID déjà existant' });
    }

    charactersData.characters.push(newCharacter);

    fs.writeFile(filePath, JSON.stringify(charactersData, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Erreur écriture fichier' });
      res.status(201).json({ success: true, character: newCharacter });
    });
  });
});

app.put('/characters/:id', (req, res) => {
  const filePath = path.join(__dirname, 'characters.json');
  const id = req.params.id;
  const updatedCharacter = req.body
  updatedCharacter.id = id;

  fs.readFile(filePath, (err, data) => {
    if (err) return res.status(500).json({ error: 'Erreur lecture fichier' });

    let charactersData = JSON.parse(data);
    charactersData.characters = charactersData.characters.map(c => c.id == id ? updatedCharacter : c);

    fs.writeFile(filePath, JSON.stringify(charactersData, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Erreur écriture fichier' });
      res.json({ success: true, character: updatedCharacter });
    });
  });
});
