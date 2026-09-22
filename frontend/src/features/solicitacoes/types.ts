export const STATUS = [
  "RECEBIDA",
  "EM_ANALISE",
  "AGENDADA",
  "CONCLUIDA",
  "CANCELADA",
] as const;
export type Status = (typeof STATUS)[number];

export const CATEGORIAS = ["CONSULTA", "EXAME", "VACINACAO", "OUTRO"] as const;
export type Categoria = (typeof CATEGORIAS)[number];

export const PRIORIDADES = ["BAIXA", "MEDIA", "ALTA", "URGENTE"] as const;
export type Prioridade = (typeof PRIORIDADES)[number];

/**
 * Espelha exatamente o SolicitacaoResource do backend, então qualquer mudança no contrato da API deve ser
 * refletida aqui primeiro.
 */
export interface Solicitacao {
  id: number;
  protocolo: string;
  nome_solicitante: string;
  categoria: Categoria;
  prioridade: Prioridade;
  status: Status;
  descricao: string;
  justificativa_prioridade: string | null;
  proximos_status_permitidos: Status[];
  data_criacao: string;
  data_atualizacao: string;
}

export interface NovaSolicitacaoPayload {
  nome_solicitante: string;
  categoria: Categoria;
  prioridade: Prioridade;
  descricao: string;
  justificativa_prioridade?: string;
}

export interface FiltrosSolicitacoes {
  status?: Status;
  categoria?: Categoria;
  prioridade?: Prioridade;
  page?: number;
  per_page?: number;
}

export interface PaginacaoMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface PaginacaoLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

/** Espelha o envelope padrão de paginação do Laravel (ResourceCollection). */
export interface Paginado<T> {
  data: T[];
  meta: PaginacaoMeta;
  links: PaginacaoLinks;
}

/** Erro de validação 422 */
export interface ErroValidacao {
  message: string;
  errors: Record<string, string[]>;
}
