const express = require('express');
const app = express();
require('dotenv').config();
const fetch = require('node-fetch');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`It's alive on http://localhost:${PORT}`));
app.use(express.json());
app.get('/recommendations/:location', (req, res) => {
  fetch(
    `https://api.yelp.com/v3/businesses/search?location=${req.params.location}&term=food%2Cbeach%2Cdrinks&categories=&limit=50`,
    {
      method: 'get',
      headers: {
        accept: 'application/json',
        Authorization: `bearer ${process.env.YELP_SECRET_KEY}`,
      },
    }
  )
    .then(res => res.json())
    .then(json => res.status(200).send(json));
});

app.get('/coordinates', (req, res) => {
  res.status(200).send({
    tshirt: '',
    size: '',
  });
});
