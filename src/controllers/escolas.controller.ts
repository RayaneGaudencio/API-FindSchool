import { Request, Response } from 'express';
import EscolaService from '../services/escola/escola.service';
import CadastroEscolaDTO from '../dtos/escolas/cadastro-escola.dto';
import { DadosCadastroEscolaDTO } from '../dtos/escolas/dados-cadastro-escola.dto'
import { DadosLoginEscolaDTO } from '../dtos/escolas/dados-login-escola.dto';
import ErrosValidacao from '../services/erros/erros-validacao-dados';
import DadosEnderecoService from '../services/escola/endereco/dados-endereco.service';
import { DadosEnderecoDTO } from '../dtos/escolas/endereco/dados-endereco.dto';

const escolaService = new EscolaService(); 
const dadosEnderecoService = new DadosEnderecoService();
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

            res.status(201).json({
                message: 'Escola cadastrada com sucesso!',
                data: respostaDTO
            });
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

    public async cadastrarEndereco(req: Request, res: Response): Promise<void> {
        try {
            const { cep, rua, bairro, cidade, uf, numero, cnpj }: DadosEnderecoDTO = req.body; 

            const dadosEndereco = await dadosEnderecoService.adicionarEndereco({ 
                cep,
                rua,
                bairro,
                cidade,
                uf,
                numero,
                cnpj
            })

            res.status(201).json({
                message: 'Endereço cadastrado com sucesso!',
                data: dadosEndereco
            });
        } catch (errors) {
            console.error(errors);
            res.status(500).json({
                status: 'error',
                message: 'Erro ao adicionar endereço à escola.',
                errors: errors
            });
        }
    }
}

export default EscolaController