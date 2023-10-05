import { Request, Response } from 'express';
import EscolaService from '../services/escola/escola.service';
import CadastroEscolaDTO from '../dtos/escolas/cadastro-escola.dto';
import { DadosCadastroEscolaDTO } from '../dtos/escolas/dados-cadastro-escola.dto'

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
}

export default EscolaController;
