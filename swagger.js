const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE341 API',
    description: 'CSE341 backend project API documentation',
  },
  host: 'https://cse341-rtep.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./src/routes/*.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated successfully!');
});
