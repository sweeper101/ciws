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

let workorder;
let saleorder;
let drawing;

app.get('/', (request, response) => {
    response.render('index');
});

app.post('/drawing', (request, response) => {
    //{ workorder, saleorder, drawing } = request.body;
    workorder = request.body.workorder;
    saleorder = request.body.saleorder;
    drawing = request.body.drawing;

    if ((workorder !== '' || saleorder !== '') && drawing !== 'Select drawing') {
        let filename = `./data/${workorder}_${saleorder}_${drawing}.txt`;

        if (!fs.existsSync(filename)) {
            response.render(`drawings/${drawing}`, {
                data: request.body
            });
        } else {
            let jsonData = JSON.parse(fs.readFileSync(filename, 'utf-8'));
            let data = Object.assign({}, request.body, jsonData);
            response.render(`drawings/${drawing}`, { data });
        }
    } else {
        response.render('index', {
            color: 'alert-primary',
            message: 'Please enter all the details'
        });
    }
});

app.post('/submit', (request, response) => {
    if (typeof(workorder) !== 'undefined' || typeof(saleorder) !== 'undefined' || typeof(drawing) !== 'undefined') {
        let jsonData = JSON.stringify(request.body);
        fs.writeFileSync(`./data/${workorder}_${saleorder}_${drawing}.txt`, jsonData, (error) => {
            if (error) {
                console.log(error);
            }
        });
        response.send('Successfully submitted');
    } else {
        response.render('index');
    }
});

app.listen(port, ip, () => {
    console.log(`listening on http://localhost:${port}/`);
});