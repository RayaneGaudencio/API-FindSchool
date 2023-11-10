import * as express from 'express';
import AdministradorController from '../controllers/admin.controller';
import EscolaController from '../controllers/escolas.controller';

const router = express.Router();
const adminController = new AdministradorController();
const escolaController = new EscolaController();

// rotas de escola
router.post('/escolas', escolaController.criarEscola);
router.post('/login_escola', escolaController.fazerLogin)


// rotas de admin
router.post('/admins', adminController.criarAdministrador); 
router.post('/login_admin', adminController.fazerLogin)


export default router;
