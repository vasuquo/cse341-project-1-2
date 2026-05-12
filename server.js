const dns = require('node:dns/promises');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const express = require('express');
const routes = require('./routes');
const dotenv = require('dotenv');
dotenv.config();

const app = express();


const port = process.env.PORT || 3000;

app
.use(express.json())
.use(express.urlencoded({ extended: true }))
.use('/', routes)

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
