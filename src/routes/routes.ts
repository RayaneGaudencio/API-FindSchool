import * as express from 'express';
import AdministradorController from '../controllers/admin.controller';
import EscolaController from '../controllers/escolas.controller';
import CuponsController from '../controllers/cupons.controller';
import UsuarioController from '../controllers/usuario.controller';

const router = express.Router();
const adminController = new AdministradorController();
const escolaController = new EscolaController();
const usuarioController = new UsuarioController();
const cuponsController = new CuponsController();

// rotas de escola
router.post('/escolas', escolaController.criarEscola);
router.post('/login_escola', escolaController.fazerLogin)
router.post('/cadastrar_endereco', escolaController.cadastrarEndereco)

// rotas de cupons 
router.post('/adicionar_desconto-matricula', cuponsController.adicionarDescontoMatricula)
router.post('/gerar_cupom', cuponsController.gerarCupom)


// rotas de admin
router.post('/admins', adminController.criarAdministrador); 
router.post('/login_admin', adminController.fazerLogin)



// rotas de usuario 
router.post('/usuarios', usuarioController.criarUsuario)
router.post('/login_usuario', usuarioController.loginUsuario)

export default router;
