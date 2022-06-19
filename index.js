const express = require('express');

const app = express();

app.enable('trust proxy');

app.get('/', (req, res) => {
  let headers = '';

  Object.keys(req.headers).forEach(header => {
    headers += `${header}: ${req.headers[header]}<br/>`;
  });

  res.send(`
  <h2>IP</h2>
  ${req.ip}<br/>
  <h2>Headers</h2>
  ${headers}
  `);
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));
