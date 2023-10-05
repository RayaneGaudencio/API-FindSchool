import * as express from 'express';
const swaggerUI = require('swagger-ui-express')
import swaggerSpec from './swaggerConfig';
import router from './routes/routes';

const app = express();

// Middleware para lidar com o corpo das requisições
app.use(express.json());

app.use('/api', router); 

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
