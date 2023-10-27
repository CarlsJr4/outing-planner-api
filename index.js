var express = require('express');
var app = express();
require('dotenv').config();
var cors = require('cors');
var fetch = require('node-fetch');
var axios = require('axios');

var PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('hello world');
});

app.get('/recommendations/:location', (req, res) => {
  fetch(
    `https://api.yelp.com/v3/businesses/search?location=${req.params.location}&term=bars%2Caquariums%2Cfood%2Cmuseums&categories=&limit=50`,
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

// Keeps the app from going to sleep
setInterval(() => {
  console.log('interval is active');
  const hour = new Date().getHours();
  // Only sends a get request if between 10am and 8pm to save on uptime hours for render.com
  if (hour >= 10 && hour < 20) {
    axios
      .get('https://outing-planner-api.onrender.com/')
      .then(() => console.log('home page called'));
  }
}, 14 * 60 * 1000); // Sends a ping every 14 minutes

app.listen(PORT, () => console.log(`It's alive on http://localhost:${PORT}`));
