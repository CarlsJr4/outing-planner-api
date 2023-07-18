const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`It's alive on http://localhost:${PORT}`));
app.use(express.json());
app.get('/locations', (req, res) => {
  res.status(200).send({
    tshirt: '',
    size: '',
  });
});

app.get('/coordinates', (req, res) => {
  res.status(200).send({
    tshirt: '',
    size: '',
  });
});
