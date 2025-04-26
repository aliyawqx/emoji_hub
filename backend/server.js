const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let userFavorites = {}; 


app.get('/emoji', async (req, res) => {
  try {
    const response = await axios.get('https://emojihub.yurace.pro/api/all');
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка получения данных с API');
  }
});


app.get('/favorites/:userId', (req, res) => {
  const { userId } = req.params;
  res.json(userFavorites[userId] || []);
});


app.post('/favorites', (req, res) => {
  const { userId, emoji } = req.body;

  if (!userFavorites[userId]) {
    userFavorites[userId] = [];
  }

  if (userFavorites[userId].includes(emoji)) {
    userFavorites[userId] = userFavorites[userId].filter((fav) => fav !== emoji);
  } else {
    userFavorites[userId].push(emoji);
  }

  res.status(200).json({ message: 'Favorites updated!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
