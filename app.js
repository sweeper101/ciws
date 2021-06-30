const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

const port = process.env.port || 8080;
const ip = process.env.ip || "0.0.0.0";

app.get('/', (request, response) => {
    response.send('Hello');
});

app.listen(port, ip, () => {
    console.log(`listening on http://localhost:${port}/`);
});