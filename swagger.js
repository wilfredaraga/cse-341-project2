const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Cars and Buyers',
    description: 'Project 2'
  },
  host: 'cse-341-project2-xphy.onrender.com',
  schemes: ['https'] 
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);