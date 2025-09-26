Deno.serve(async (req, info) => {
  let headers = '';

  req.headers.forEach((value, key) => {
    headers += `${key}: ${value}<br/>`;
  });

  const ip = info.remoteAddr.hostname;
  let geolocation = '';

  const { status, lat, lon, country, city, isp, org } = await fetch(
    `http://ip-api.com/json/${ip}`
  ).then(res => res.json());

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

  return new Response(
    `
  <h2>IP</h2>
  ${ip}<br/>
  <h2>Geolocation</h2>
  ${geolocation}
  <h2>Headers</h2>
  ${headers}
  `,
    {
      headers: {
        'Content-Type': 'text/html',
      },
    }
  );
});
