import express from 'express';
import { CadastroUsuario } from '../src/CadastroUsuario'; // Importe a função CadastroUsuario
import { usuarioService } from '../services/usuario/usuarioService'; // Importe o serviço usuarioService

const router = express.Router();

// Rota POST para o cadastro de usuários
router.post('/cadastro', (req, res) => {
  // Obtenha os dados do usuário do corpo da requisição
  const userData = req.body;

  // Chame a função CadastroUsuario com os dados do usuário
  const newUser = CadastroUsuario(userData);

  // Chame o serviço usuarioService para validar os dados e interagir com o banco de dados
  usuarioService(newUser);

  // Envie uma resposta ao cliente
  res.status(200).send('Usuário cadastrado com sucesso!');
});

export default router;
