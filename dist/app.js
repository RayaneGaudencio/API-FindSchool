"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const swaggerUI = require('swagger-ui-express');
const swaggerConfig_1 = require("./swaggerConfig");
const routes_1 = require("./routes/routes");
const app = express();
// Middleware para lidar com o corpo das requisições
app.use(express.json());
app.use('/api', routes_1.default);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerConfig_1.default));
// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});
