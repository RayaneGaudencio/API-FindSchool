import { Request, Response } from 'express';
import EscolaService from '../services/escola/escola.service';
import CadastroEscolaDTO from '../dtos/escolas/cadastro-escola.dto';
import { DadosCadastroEscolaDTO } from '../dtos/escolas/dados-cadastro-escola.dto'
import { DadosLoginEscolaDTO } from '../dtos/escolas/dados-login-escola.dto';
import ErrosValidacao from '../services/erros/erros-validacao-dados';

const escolaService = new EscolaService(); 
class EscolaController {

    async criarEscola(req: Request, res: Response): Promise<void> {
        try {
            const { nome, email, cnpj, senha }: CadastroEscolaDTO = req.body;

            const novaEscola = await escolaService.criarEscola({
                nome,
                email,
                cnpj,
                senha
            }); 

            const respostaDTO: DadosCadastroEscolaDTO = {
                nome: novaEscola.nome,
                email: novaEscola.email,
                cnpj: novaEscola.cnpj
            }; 

            res.status(201).json(respostaDTO);
        } catch (errors) {
            console.error(errors);
            res.status(500).json({
                status: 'error',
                message: 'Erro ao criar escola.',
                errors: errors
            });
        }
        
    }

    public async fazerLogin(req: Request, res: Response): Promise<void> {
    try {
        const { email, senha }: DadosLoginEscolaDTO = req.body;

        const retorno = await escolaService.encontrarPorEmailESenha({
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

export default EscolaController