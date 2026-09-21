import { useCallback, useEffect, useState } from 'react';
import { listarSolicitacoes } from '../api';
import { mensagemDeErro } from '../../../lib/http';
import type { FiltrosSolicitacoes, Paginado, Solicitacao } from '../types';

interface EstadoListagem {
  dados: Paginado<Solicitacao> | null;
  carregando: boolean;
  erro: string | null;
}

/** Concentra os quatro estados assíncronos (carregamento, sucesso, vazio, erro) em um único hook reutilizável */
export function useSolicitacoes(filtros: FiltrosSolicitacoes) {
  const [estado, setEstado] = useState<EstadoListagem>({
    dados: null,
    carregando: true,
    erro: null,
  });

  const carregar = useCallback(() => {
    let cancelado = false;
    setEstado((atual) => ({ ...atual, carregando: true, erro: null }));

    listarSolicitacoes(filtros)
      .then((dados) => {
        if (!cancelado) {
          setEstado({ dados, carregando: false, erro: null });
        }
      })
      .catch((erro: unknown) => {
        if (!cancelado) {
          setEstado({ dados: null, carregando: false, erro: mensagemDeErro(erro) });
        }
      });

    return () => {
      cancelado = true;
    };
  }, [filtros.status, filtros.categoria, filtros.prioridade, filtros.page, filtros.per_page]);

  useEffect(() => carregar(), [carregar]);

  const vazio = estado.dados !== null && estado.dados.data.length === 0;

  return { ...estado, vazio, recarregar: carregar };
}