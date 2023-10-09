import { Request, Response } from 'express';
import AdminService from '../services/admin/admin.service';
import CadastroAdministradorDTO from '../dtos/admin/cadastro-admin.dto';
import { DadosCadastroAdministradorDTO } from '../dtos/admin/dados-cadastro-admin.dto';

const administradorService = new AdminService();

class AdministradorController {

    async criarAdministrador(req: Request, res: Response): Promise<void> {
        try {
            const { nome, email, cpf, senha }: CadastroAdministradorDTO = req.body;

            console.log("REcebeu os dados no controller")
            const novoAdministrador = await administradorService.criarAdmin({
                nome,
                email,
                cpf,
                senha
            }); 

            const respostaDTO: DadosCadastroAdministradorDTO = {
                nome: novoAdministrador.nome,
                email: novoAdministrador.email,
                cpf: novoAdministrador.cpf
            }; 

            res.status(201).json(respostaDTO);
        } catch (errors) {
            console.error(errors);
            res.status(500).json({
                status: 'error',
                message: 'Erro ao criar administrador.',
                errors: errors
            });
        }
    }
}

export default AdministradorController;
