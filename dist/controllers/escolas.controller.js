"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const escola_service_1 = require("../services/escola/escola.service");
const escolaService = new escola_service_1.default();
class EscolaController {
    /**
   * @swagger
   * /api/escolas:
   *   post:
   *     summary: Cria uma nova escola
   *     parameters:
   *       - in: body
   *         name: body
   *         required: true
   *         cnpj: body
   *         required: true
   *         email: body
   *         required: true
   *         senha: body
   *         required: true
   *     responses:
   *       201:
   *         description: Escola criada com sucesso
   *         schema:
   *       500:
   *         description: Erro ao criar escola
   */
    async criarEscola(req, res) {
        try {
            const { nome, email, cnpj, senha } = req.body;
            const novaEscola = await escolaService.criarEscola({
                nome,
                email,
                cnpj,
                senha
            });
            const respostaDTO = {
                nome: novaEscola.nome,
                email: novaEscola.email,
                cnpj: novaEscola.cnpj
            };
            res.status(201).json(respostaDTO);
        }
        catch (errors) {
            console.error(errors);
            res.status(500).json({
                status: 'error',
                message: 'Erro ao criar escola.',
                errors: errors
            });
        }
    }
}
exports.default = EscolaController;
