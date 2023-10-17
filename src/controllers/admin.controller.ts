import { Request, Response } from 'express';
import AdminService from '../services/admin/admin.service';
import CadastroAdministradorDTO from '../dtos/admin/cadastro-admin.dto';
import { DadosCadastroAdministradorDTO } from '../dtos/admin/dados-cadastro-admin.dto';
import ErrosValidacao from '../services/erros/erros-validacao-dados';
import { DadosLoginAdminDTO } from '../dtos/admin/dados-login-admin.dto';

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
            let mensagemDeErro = 'Erro ao criar administrador.';
        
            if (Array.isArray(error) && error.includes(ErrosValidacao.AdminExistente)) {
                status = 409;
                mensagemDeErro = ErrosValidacao.AdminExistente;
            }
        
            res.status(status).json({
                status: 'error',
                message: mensagemDeErro
            });
        }
    }

    async fazerLogin(req: Request, res: Response): Promise<void> {
       try {
            const { email, senha }: DadosLoginAdminDTO = req.body;

            const retorno = await administradorService.encontrarPorEmailESenha({
                email,
                senha
            });

            if (Array.isArray(retorno)) {
                if (retorno.includes(ErrosValidacao.EmailNaoCadastrado)) {
                    res.status(401).json({
                        status: 'error',
                        message: ErrosValidacao.EmailNaoCadastrado
                    });
                } else if (retorno.includes(ErrosValidacao.SenhaIncorreta)) {
                    res.status(401).json({
                        status: 'error',
                        message: ErrosValidacao.SenhaIncorreta
                    });
                }
            } else {
                res.status(200).json({
                    status: 'success',
                    message: 'Login efetuado.'
                });
            }
       } catch (error) {
            console.error(error);
            res.status(500).json({
                status: 'error',
                message: 'Erro ao fazer login.'
            });
        }   
    }
}

export default AdministradorController;
