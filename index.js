const express = require('express');
const axios = require('axios');

const app = express();

app.enable('trust proxy');

app.get('/', async (req, res) => {
  const { ip } = req;
  let headers = '';

  Object.keys(req.headers).forEach(header => {
    headers += `${header}: ${req.headers[header]}<br/>`;
  });

  let geolocation = '';

  try {
    const {
      data: { status, lat, lon, country, city, isp, org },
    } = await axios.get(`http://ip-api.com/json/${ip}`);

    if (status === 'success') {
      geolocation = `
      Latitude: ${lat}<br/>
      Longitude: ${lon}<br/>
      Country: ${country}<br/>
      City: ${city}<br/>
      ISP: ${isp}<br/>
      Organization: ${org}<br/>
      `;
    }
  } catch (error) {
    console.log(error);
  }

  res.send(`
  <h2>IP</h2>
  ${ip}<br/>
  <h2>Geolocation</h2>
  ${geolocation}
  <h2>Headers</h2>
  ${headers}
  `);
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));
