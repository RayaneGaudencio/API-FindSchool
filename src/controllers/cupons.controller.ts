import { Request, Response } from 'express';
import CadastroDescontoMatricula from "../dtos/escolas/desconto_matricula/cadastro-desconto-matricula.dto";
import DescontoMatriculaService from "../services/escola/desconto_matricula/desconto-matricula.service";
import ErrosValidacao from '../services/erros/erros-validacao-dados';
import DadosCupom from '../dtos/escolas/cupom/dados-gerar-cupom.dto';
import DadosCupomCadastrado from '../dtos/escolas/cupom/dados-cupom-cadastrado';

const descontoMatriculaService = new DescontoMatriculaService();
class CuponsController {
    async adicionarDescontoMatricula(req: Request, res: Response): Promise<void> {
        try {
            const { admin_cpf, escola_cnpj, porcentagem_desconto, data_inicio, data_expiracao }: CadastroDescontoMatricula = req.body;

            if (!admin_cpf || !escola_cnpj || !porcentagem_desconto || !data_inicio || !data_expiracao) {
                res.status(400).json({
                    message: 'Todos os campos são obrigatórios. Certifique-se de fornecer todos os dados necessários.'
                });
                return;
            }

            const retorno = await descontoMatriculaService.adicionaDesconto({
                admin_cpf, 
                escola_cnpj,
                porcentagem_desconto, 
                data_inicio, 
                data_expiracao
            })

            if (Array.isArray(retorno)) {
                if (retorno.includes(ErrosValidacao.AdminNaoCadastrado)) {
                    res.status(404).json({
                        message: ErrosValidacao.AdminNaoCadastrado
                    });
                } else if (retorno.includes(ErrosValidacao.EscolaNaoCadastrada)) {
                    res.status(404).json({
                        message: ErrosValidacao.EscolaNaoCadastrada
                    });
                }
            } else {
                res.status(201).json(retorno);
            }
        } catch (errors) {
            console.error(errors);
            res.status(500).json({
                status: 'error',
                message: 'Erro ao acessar servidor.',
                errors: errors
            });
        }
    }

    async gerarCupom(req: Request, res: Response): Promise<void> {
        try {
            const { id_desconto, usuario_cpf }: DadosCupom = req.body;

            if (!id_desconto || !usuario_cpf) {
                res.status(400).json({
                    message: ErrosValidacao.DadosObrigatórios
                });
                return;
            }

            const retorno:DadosCupomCadastrado = await descontoMatriculaService.gerarCupom({
               id_desconto,
               usuario_cpf
            })
        } catch (error) {
            
        }
    }
}

export default CuponsController;