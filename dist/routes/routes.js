"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const escolas_controller_1 = require("../controllers/escolas.controller");
const router = express.Router();
const escolaController = new escolas_controller_1.default();
// Rota para criar uma nova escola
router.post('/escolas', escolaController.criarEscola);
exports.default = router;
