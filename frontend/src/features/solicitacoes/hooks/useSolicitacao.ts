import { useCallback, useEffect, useState } from 'react';
import { buscarSolicitacao } from '../api';
import { mensagemDeErro } from '../../../lib/http';
import type { Solicitacao } from '../types';

interface EstadoDetalhe {
  solicitacao: Solicitacao | null;
  carregando: boolean;
  erro: string | null;
}

export function useSolicitacao(id: number) {
  const [estado, setEstado] = useState<EstadoDetalhe>({
    solicitacao: null,
    carregando: true,
    erro: null,
  });

  const carregar = useCallback(() => {
    let cancelado = false;
    setEstado((atual) => ({ ...atual, carregando: true, erro: null }));

    buscarSolicitacao(id)
      .then((solicitacao) => {
        if (!cancelado) {
          setEstado({ solicitacao, carregando: false, erro: null });
        }
      })
      .catch((erro: unknown) => {
        if (!cancelado) {
          setEstado({ solicitacao: null, carregando: false, erro: mensagemDeErro(erro) });
        }
      });

    return () => {
      cancelado = true;
    };
  }, [id]);

  useEffect(() => carregar(), [carregar]);

  return { ...estado, recarregar: carregar };
}