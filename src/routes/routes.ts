import * as express from 'express';
import AdministradorController from '../controllers/admin.controller';
import EscolaController from '../controllers/escolas.controller';

const router = express.Router();
const adminController = new AdministradorController();
const escolaController = new EscolaController();

// Rota para criar uma nova escola
router.post('/escolas', escolaController.criarEscola);


// Rota para cadastrar admin
router.post('/admins', adminController.criarAdministrador); 


export default router;
