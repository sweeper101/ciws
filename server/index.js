import express from 'express';
import bodyParser from 'body-parser';
import fs from "fs"
import dotenv from "dotenv"
import DbConnect from './DbConnect.js';
import path from 'path';
import { fileURLToPath } from 'url';



const app = express();
const port = process.env.port || 8000;
const ip = process.env.ip;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

DbConnect();

dotenv.config({path: './.env'});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname+ '/public')));



app.use(require("./routes/form"));







app.listen(port, ip, () => {
  console.log(`listening on http://localhost:${port}`);
});