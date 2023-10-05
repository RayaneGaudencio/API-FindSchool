"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'API FindSchool',
            version: '1.0.0',
            description: 'API Rest do sistema FindSchool',
        },
        basePath: '/',
    },
    apis: ['./src/routes/*.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
exports.default = swaggerSpec;
