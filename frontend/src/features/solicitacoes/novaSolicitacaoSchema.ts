import { z } from 'zod';
import { CATEGORIAS, PRIORIDADES } from './types';

export const novaSolicitacaoSchema = z
  .object({
    nome_solicitante: z
      .string()
      .trim()
      .min(3, 'Informe ao menos 3 caracteres.')
      .max(150, 'Máximo de 150 caracteres.'),
    categoria: z.enum(CATEGORIAS, { message: 'Selecione uma categoria.' }),
    prioridade: z.enum(PRIORIDADES, { message: 'Selecione uma prioridade.' }),
    descricao: z
      .string()
      .trim()
      .min(10, 'Descreva com ao menos 10 caracteres.')
      .max(2000, 'Máximo de 2000 caracteres.'),
    justificativa_prioridade: z
      .string()
      .trim()
      .max(1000, 'Máximo de 1000 caracteres.')
      .optional()
      .or(z.literal('')),
  })
  .superRefine((dados, ctx) => {
    const exigeJustificativa = dados.prioridade === 'URGENTE';
    const justificativa = dados.justificativa_prioridade?.trim() ?? '';

    if (exigeJustificativa && justificativa.length < 10) {
      ctx.addIssue({
        code: 'custom',
        path: ['justificativa_prioridade'],
        message: 'A justificativa de prioridade é obrigatória quando a prioridade é URGENTE.',
      });
    }
  });

export type NovaSolicitacaoFormValues = z.infer<typeof novaSolicitacaoSchema>;