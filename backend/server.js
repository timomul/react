const express = require('express');
const app = express();
// const port = process.env.PORT || 5000;

// console.log that your server is up and running
// app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
const data = {items : [
  {
    "id": 1,
    "name": "chaussettes"
  },
  {
    "id": 2,
    "name": "slip"
  },
  {
    "id": 3,
    "name": "brosse à dents"
  },
  {
    "id": 4,
    "name": "cape de pluie"
  }
  ]}
app.get('/data', (req, res) => {
  let now = new Date();
  console.log("Data has been sent !", now);
  res.send(data)
})

const server = app.listen(5000, function() {
    const host = server.address().address
    const port = server.address().port

    console.log('Backend server listening at http://%s:%s', host, port)
})