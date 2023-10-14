import { Request, Response } from 'express';
import AdminService from '../services/admin/admin.service';
import CadastroAdministradorDTO from '../dtos/admin/cadastro-admin.dto';
import { DadosCadastroAdministradorDTO } from '../dtos/admin/dados-cadastro-admin.dto';
import ErrosValidacao from '../services/erros/erros-validacao-dados';

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
        } catch (error) {
            console.error(error);
            
            let status = 500;
        
            if (Array.isArray(error) && error.includes('Já existe um administrador com este email ou CPF.')) {
                status = 409;
            }
        
            res.status(status).json({
                status: 'error',
                message: 'Erro ao criar administrador.',
                errors: error
            });

        }
        
    }
}

export default AdministradorController;
