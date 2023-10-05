import * as express from 'express';
import EscolaController from '../controllers/escolas.controller';

const router = express.Router();
const escolaController = new EscolaController();

// Rota para criar uma nova escola
router.post('/escolas', escolaController.criarEscola);

export default router;
