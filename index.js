var express = require('express');
var app = express();
require('dotenv').config();
var cors = require('cors');
var fetch = require('node-fetch');

var PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`It's alive on http://localhost:${PORT}`));
app.use(cors());
app.use(express.json());
app.get('/recommendations/:location', (req, res) => {
  fetch(
    `https://api.yelp.com/v3/businesses/search?location=${req.params.location}&term=clubs%2Cbookstore%2Cfood&categories=&limit=50`,
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

app.get('/coordinates/:maxboxLinePathData', (req, res) => {
  fetch(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${req.params.maxboxLinePathData}?geometries=geojson&access_token=${process.env.MAPBOX_SECRET_KEY}`,
    {
      method: 'get',
      headers: {
        accept: 'application/json',
      },
    }
  )
    .then(res => res.json())
    .then(json => res.status(200).send(json));
});
