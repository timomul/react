const express = require('express');
const app = express();
// const port = process.env.PORT || 5000;

// console.log that your server is up and running
// app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
const data = [{
  "id": 1,
  "category_name": "Documents importants",
  "name": "Carte d'identité",
  "category": 1
},
{
  "id": 2,
  "category_name": "Documents importants",
  "name": "Passeport",
  "category": 1
},
{
  "id": 3,
  "category_name": "Documents importants",
  "name": "Visa",
  "category": 1
},
{
  "id": 4,
  "category_name": "Documents importants",
  "name": "Carnet de vaccination",
  "category": 1
} ]

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