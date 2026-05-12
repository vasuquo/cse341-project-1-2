const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'Auto-generated API documentation',
  },
  host: 'cse341-project-1-2.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger-output.json';
// Path to the files containing your routes (e.g., app.js, routes.js, or index.js)
const endpointsFiles = ['./routes/index.js']; 

/* Generate the documentation */
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
//    require('./index.js'); // Optional: start the server after generating
});