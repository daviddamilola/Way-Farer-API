import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  swagger: '2.0',
  info: {
    description: 'Wayfarer is a public transportation booking server',
    version: '1.0.0',
    title: 'WAY FARER',
    termsOfService: 'http://swagger.io/terms/',
    contact: {
      email: 'daviddamilola20@gmail.com',
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  host: 'wayfarer-app-proj.herokuapp.com', // app host
  basePath: '/api/v1', // app base path
  tags: [{
    name: 'authentication',
  }, {
    name: 'user',
  }, {
    name: 'admin',
  }],
  schemes: ['https', 'http'],
  consumes: ['application/json', 'application/x-www-form-urlencoded'],
  produces: ['application/json'],
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'token',
      in: 'header',
    },
  },
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./docs/**/*.yaml'],
};
// initialize swagger-jsdoc
export default swaggerJSDoc(options);
