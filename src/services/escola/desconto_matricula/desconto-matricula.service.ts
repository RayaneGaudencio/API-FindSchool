import { QueryTypes } from "sequelize";
import DadosCupomCadastrado from "../../../dtos/escolas/cupom/dados-cupom-cadastrado";
import DadosCupom from "../../../dtos/escolas/cupom/dados-gerar-cupom.dto";
import CadastroDescontoMatricula from "../../../dtos/escolas/desconto_matricula/cadastro-desconto-matricula.dto";
import Admins from "../../../models/admin.model";
import Cupom from "../../../models/cupom.model";
import DescontoMatricula from "../../../models/escola.desconto_matricula.model";
import Escola from "../../../models/escola.model";
import Usuario from "../../../models/usuario.model.";
import ErrosCupom from "../../erros/erros-cupom";
import ErrosValidacao from "../../erros/erros-validacao-dados";
import sequelize from "../../../config/dtabase";
import { addDays, parse } from 'date-fns';

export default class DescontoMatriculaService {
    async adicionaDesconto(dadosCadastroDescontoDTO: CadastroDescontoMatricula): Promise<CadastroDescontoMatricula | string[]> {
        try {
            const { admin_cpf, escola_cnpj, porcentagem_desconto, data_inicio, data_expiracao } = dadosCadastroDescontoDTO;

            const erros: string[] = [];
            
            const adminExiste = await Admins.findOne({
                where: { cpf: admin_cpf }
            });

            const escolaExiste = await Escola.findOne({
                where: [{ cnpj: escola_cnpj }]
            })

            if (escolaExiste && adminExiste) {
                await DescontoMatricula.create({
                    admin_cpf, 
                    escola_cnpj, 
                    porcentagem_desconto, 
                    data_inicio, 
                    data_expiracao
                });
                return dadosCadastroDescontoDTO;
            } else if (!escolaExiste){
                erros.push(ErrosValidacao.EscolaNaoCadastrada)
            } else if (!adminExiste) {
                erros.push(ErrosValidacao.AdminNaoCadastrado)
            }
        
            return erros;
        } catch (error) {
            throw new Error('Erro ao adicionar desconto à matricula da escola.')
        }
    }

    async gerarCupom(dadosCupom: DadosCupom): Promise<DadosCupomCadastrado> {
      try {
        const { desconto_matricula_id, usuario_cpf, escola_cnpj } = dadosCupom;
        const erros: string[] = [];
    
        const descontoCadastrado = await DescontoMatricula.findOne({
          where: ({ id:desconto_matricula_id })
        });

    
        const usuarioCadastrado = await Usuario.findOne({
          where: { cpf: usuario_cpf }
        });
    
        const escolaCadastrada = await Escola.findOne({
          where: { cnpj: escola_cnpj }
        });
    
        if (!usuarioCadastrado) {
          erros.push(ErrosValidacao.UsuarioNaoCadastrado);
        }
        
        if (!descontoCadastrado) {
          erros.push(ErrosCupom.DescontoInexistente);
        }
        
        if (!escolaCadastrada) {
          erros.push(ErrosValidacao.EscolaNaoCadastrada);
        }
    
        let cupomExiste = true;
        let cupomGerado = '';
    
        while (cupomExiste) {
          cupomGerado = gerarCodigoAlfanumerico();
    
          cupomExiste = await Cupom.findOne({
            where: { codigo_cupom: cupomGerado }
          });
        }

        const status = 'ABERTO';
        const desconto_valido = await verificarExpiracaoDesconto(desconto_matricula_id)

        if (escolaCadastrada && usuarioCadastrado && descontoCadastrado && desconto_valido) {
          const validade = addDays(new Date(), 7);
          const dadosCupomCadastrado: DadosCupomCadastrado = await Cupom.create({
            usuario_cpf,
            escola_cnpj,
            desconto_matricula_id,
            codigo_cupom: cupomGerado,
            status,
            validade: validade
          });
    
          return dadosCupomCadastrado;
        } 
        
        if(!desconto_valido && descontoCadastrado) {
          erros.push(ErrosCupom.CupomExpirado)
        } 

        return Promise.reject(erros);
      } catch (error) {
        console.error('Erro ao gerar cupom:', error);
        return Promise.reject(ErrosCupom.CupomNaoGerado);
      }
    }
}
    

function gerarCodigoAlfanumerico(): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigo = '';
  
    for (let i = 0; i < 6; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres.charAt(indiceAleatorio);
    }
  
    return codigo;
}


async function verificarExpiracaoDesconto(desconto_matricula_id:number): Promise<boolean> {

  try {
    const descontoCadastrado = await DescontoMatricula.findOne({
      where: ({ id: desconto_matricula_id }),
    });
  
    if (!descontoCadastrado) {
      return false; 
    }
  
    const data_atual = new Date()
    const data_expiracao = descontoCadastrado.get("data_expiracao")

    console.log(data_expiracao)
    return data_atual.getTime() <= data_expiracao.getTime();
  } catch (error) {
    console.error('Erro ao buscar desconto:', error);
    return false;
  }
  
  
}


  