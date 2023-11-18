import { Request, Response } from 'express';
import CadastroUsuarioDTO from "../dtos/usuario/cadastro-usuario.dto";
import { DadosCadastroUsuarioDTO } from "../dtos/usuario/dados-cadastro-usuario.dto";
import UsuarioService from "../services/usuario/usuario.service";
import ErrosValidacao from '../services/erros/erros-validacao-dados';
import { DadosLoginEscolaDTO } from '../dtos/escolas/dados-login-escola.dto';

const usuarioService = new UsuarioService();
class UsuarioController {
    async criarUsuario(req: Request, res: Response) {
        try {
            const { nome, email, cpf, telefone, senha }: CadastroUsuarioDTO = req.body;
            
            if (!nome || !email || !cpf || !telefone || !senha) {
                res.status(400).json({
                    message: ErrosValidacao.DadosFaltantes
                });
                return;
            }
            
            const novoUsuario = await usuarioService.criarUsuario({
                nome,
                email,
                cpf,
                telefone,
                senha
            });

            const resposta: DadosCadastroUsuarioDTO = {
                nome: novoUsuario.nome,
                email: novoUsuario.email,
                cpf: novoUsuario.cpf,
                telefone: novoUsuario.telefone
            }
            res.status(201).json(resposta);
        } catch (error) {
            let status = 500;
            let mensagemDeErro = 'Erro ao acessar servidor';
            const erros:string[] = []

            if (Array.isArray(error)) {
                status = 422
                mensagemDeErro = 'Alguns dados estão preenchidos incorretamente.'

                if (error.includes(ErrosValidacao.CPFInvalido)) {
                    erros.push(ErrosValidacao.CPFInvalido)
                } 
                
                if (error.includes(ErrosValidacao.EmailInvalido)) {
                    erros.push(ErrosValidacao.EmailInvalido)
                } 
                
                if (error.includes(ErrosValidacao.SenhaFraca)) {
                    erros.push(ErrosValidacao.SenhaFraca)
                } 
                
                if (error.includes(ErrosValidacao.TelefoneInvalido)) {
                    erros.push(ErrosValidacao.TelefoneInvalido)
                } 
                
                if (error.includes(ErrosValidacao.EmailCadastrado)) {
                    mensagemDeErro = ErrosValidacao.EmailCadastrado;
                    status = 409;
                } 
                
                if (error.includes(ErrosValidacao.CPFCadastrado)) {
                    mensagemDeErro = ErrosValidacao.CPFCadastrado;
                    status = 409;
                }
            } 

            res.status(status).json({
                status: 'error',
                message: mensagemDeErro,
                errors: erros
            });
        }
    }

    async loginUsuario(req: Request, res: Response): Promise<void> {
        try {
                const { email, senha }: DadosLoginEscolaDTO = req.body;
    
                const retorno = await usuarioService.encontrarPorEmailESenha({
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
                    res.status(200).json(retorno);
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


export default UsuarioController;