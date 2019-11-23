//Importing Config

const config = require('config');

//Importing express

const express = require('express');
const app = express();

//Third party middleware

const helmet = require('helmet');
const morgan = require('morgan');

//Custom Middleware

const logger = require('./logger');
const auth = require('./auth');

const testData = [{id: 1, name: 'asd'}];

// console.log(`Production or dev????? ${process.env.NODE_ENV}`)

// console.log(`Environment ${app.get('env')}`)

//Using middlewares

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

app.use(helmet());

//to check development or production environment

let environment = app.get('env');

if (environment === 'development') {
  app.use(morgan('tiny'));
  console.log('Using Morgan...');
}

//Using configurations

console.log(`Application Name: ${config.get('name')}`);

console.log(`Mail Server: ${config.get('mail.host')}`);

//console.log(`Mail password: ${config.get('mail.password')}`);

app.use(logger);

app.use(auth);

//Hitting the apis

app.get('/api/test', (req, res) => {
  res.send(testData);
});

app.post('/api/test', (req, res) => {
  const data = {
    id: testData.length + 1,
    name: req.body.name,
  };
  testData.push(data);
  console.log(req.query);
  res.send(data);
});

//Port related operations

const port = process.env.port || 3000;

app.listen(port, () => console.log('Listening....'));
