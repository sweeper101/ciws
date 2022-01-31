import express from 'express';
import bodyParser from 'body-parser';
import fs from "fs"
import dotenv from "dotenv"
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.port || 8000;
const ip = process.env.ip;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path: './.env'});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname+ '/public')));

app.post('/submit', (request, response) => {

      let jsonData = JSON.stringify(request.body);
      fs.writeFileSync(`./data/${""}.json`, jsonData, (error) => {
          if (error) {
              console.log(error);
          }
      });
      response.json({
          color: 'alert-success',
          message: 'Sucessfully submitted.!!'
      });
      
});


app.listen(port, ip, () => {
  console.log(`listening on http://localhost:${port}`);
});