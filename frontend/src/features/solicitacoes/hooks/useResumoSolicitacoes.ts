import { useCallback, useEffect, useState } from "react";
import { buscarResumoSolicitacoes } from "../api";
import { mensagemDeErro } from "../../../lib/http";
import type { ResumoSolicitacoes } from "../types";

interface EstadoResumo {
  dados: ResumoSolicitacoes | null;
  carregando: boolean;
  erro: string | null;
}

export function useResumoSolicitacoes() {
  const [estado, setEstado] = useState<EstadoResumo>({
    dados: null,
    carregando: true,
    erro: null,
  });

  const carregar = useCallback(() => {
    let cancelado = false;
    setEstado((atual) => ({ ...atual, carregando: true, erro: null }));

    buscarResumoSolicitacoes()
      .then((dados) => {
        if (!cancelado) {
          setEstado({ dados, carregando: false, erro: null });
        }
      })
      .catch((erro: unknown) => {
        if (!cancelado) {
          setEstado({
            dados: null,
            carregando: false,
            erro: mensagemDeErro(erro),
          });
        }
      });

    return () => {
      cancelado = true;
    };
  }, []);

  useEffect(() => carregar(), [carregar]);

  return { ...estado, recarregar: carregar };
}