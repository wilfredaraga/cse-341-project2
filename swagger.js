const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Cars and Buyers',
    description: 'Project 2'
  },
  host: 'localhost:3000',
  schemes: ['http', 'https'] 
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);