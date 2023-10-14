import * as express from 'express';
const swaggerUI = require('swagger-ui-express')
import swaggerSpec from './swaggerConfig';
import router from './routes/routes';
const cors = require('cors')

const app = express();

// Middleware para lidar com o corpo das requisições
app.use(express.json());

const corsOptions = {
  origin: [ 'http://localhost:3001', 'http://localhost:3000' ], // permite qualquer origem
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use('/api', router); 

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
