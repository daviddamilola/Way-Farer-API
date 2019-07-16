import express from 'express';
import validator from 'express-validator';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import debug from 'debug';
import swaggerUI from 'swagger-ui-express';
import apiRoutes from './routes/api/routes';
import swaggerSpec from './config/swagger';
import Util from './utils/utils';

dotenv.config();

const { errResponse } = Util;

const app = express();
app.set('port', process.env.PORT || 2000);
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());
app.use(cors('*'));
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use(validator());
app.use('/api/v1', apiRoutes);

app.all('*', (req, res) => {
  errResponse(res, 404, 'this page does not exist');
});

app.listen(app.get('port'), () => {
  debug('server/debug')(`Express started on http://localhost:${app.get('port')}'; press Ctrl-C to terminate.`);
});

export default app;
