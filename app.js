const express = require('express');
const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path: './.env'});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'hbs');

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

const port = process.env.port;
const ip = process.env.ip;

app.get('/', (request, response) => {
    response.render('index');
});

app.post('/drawing', (request, response) => {
    console.log(request.body);
    response.render("drawing", {
        data: request.body
    });
});

app.listen(port, ip, () => {
    console.log(`listening on http://localhost:${port}/`);
});