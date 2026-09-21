import { http } from '../../lib/http';
import type {
  FiltrosSolicitacoes,
  NovaSolicitacaoPayload,
  Paginado,
  Solicitacao,
  Status,
} from './types';

export async function listarSolicitacoes(
  filtros: FiltrosSolicitacoes,
): Promise<Paginado<Solicitacao>> {
  const { data } = await http.get<Paginado<Solicitacao>>('/solicitacoes', {
    params: filtros,
  });
  return data;
}

export async function buscarSolicitacao(id: number): Promise<Solicitacao> {
  const { data } = await http.get<{ data: Solicitacao }>(`/solicitacoes/${id}`);
  return data.data;
}

export async function criarSolicitacao(
  payload: NovaSolicitacaoPayload,
): Promise<Solicitacao> {
  const { data } = await http.post<{ data: Solicitacao }>('/solicitacoes', payload);
  return data.data;
}

export async function atualizarStatusSolicitacao(
  id: number,
  status: Status,
): Promise<Solicitacao> {
  const { data } = await http.patch<{ data: Solicitacao }>(
    `/solicitacoes/${id}/status`,
    { status },
  );
  return data.data;
}