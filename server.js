const dns = require('node:dns/promises')
dns.setServers(['8.8.8.8', '1.1.1.1']) 
const express = require('express');
const baseRoute = require('./routes/base');
const contactsRoute = require('./routes/contacts');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use('/', baseRoute);
app.use('/contacts', contactsRoute);

app.listen(port, () => {
        console.log(`app listening on port ${port}`)
    });
 



