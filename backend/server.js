const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());

app.get('/emoji', async (req, res) => {
  try {
    const response = await axios.get(`https://emojihub.yurace.pro/api/all`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка получения данных с API');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
