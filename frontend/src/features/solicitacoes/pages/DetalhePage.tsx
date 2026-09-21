import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppShell } from '../../../components/layout/AppShell';
import { Spinner } from '../../../components/ui/Spinner';
import { ErrorState } from '../../../components/ui/ErrorState';
import { Button } from '../../../components/ui/Button';
import { SoAdmin } from '../../../components/auth/SoAdmin';
import { mensagemDeErro } from '../../../lib/http';
import { useSolicitacao } from '../hooks/useSolicitacao';
import { atualizarStatusSolicitacao } from '../api';
import { StatusBadge } from '../components/StatusBadge';
import { PrioridadeBadge } from '../components/PrioridadeBadge';
import type { Status } from '../types';

const rotuloCategoria: Record<string, string> = {
  CONSULTA: 'Consulta',
  EXAME: 'Exame',
  VACINACAO: 'Vacinação',
  OUTRO: 'Outro',
};

const rotuloStatus: Record<Status, string> = {
  RECEBIDA: 'Recebida',
  EM_ANALISE: 'Em análise',
  AGENDADA: 'Agendada',
  CONCLUIDA: 'Concluída',
  CANCELADA: 'Cancelada',
};

function formatarDataHora(iso: string): string {
  return new Date(iso).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
}

export function DetalhePage() {
  const { id } = useParams<{ id: string }>();
  const idNumerico = Number(id);
  const { solicitacao, carregando, erro, recarregar } = useSolicitacao(idNumerico);

  const [statusEmAndamento, setStatusEmAndamento] = useState<Status | null>(null);
  const [erroAcao, setErroAcao] = useState<string | null>(null);

  async function aoAtualizarStatus(novoStatus: Status) {
    setStatusEmAndamento(novoStatus);
    setErroAcao(null);

    try {
      await atualizarStatusSolicitacao(idNumerico, novoStatus);
      recarregar();
    } catch (erroCapturado) {
      setErroAcao(mensagemDeErro(erroCapturado));
    } finally {
      setStatusEmAndamento(null);
    }
  }

  return (
    <AppShell>
      <Link to="/" className="mb-4 inline-block text-sm text-primary hover:underline">
        ← Voltar para a lista
      </Link>

      {carregando && <Spinner label="Carregando solicitação…" />}

      {!carregando && erro && <ErrorState mensagem={erro} aoTentarNovamente={recarregar} />}

      {!carregando && !erro && solicitacao && (
        <div className="rounded-lg border border-border bg-white p-6">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono text-sm text-ink-soft">{solicitacao.protocolo}</p>
              <h1 className="text-xl font-semibold text-ink">{solicitacao.nome_solicitante}</h1>
            </div>
            <div className="flex items-center gap-3">
              <PrioridadeBadge prioridade={solicitacao.prioridade} />
              <StatusBadge status={solicitacao.status} />
            </div>
          </div>

          <dl className="grid grid-cols-1 gap-4 border-t border-border pt-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-ink-soft">Categoria</dt>
              <dd className="text-ink">{rotuloCategoria[solicitacao.categoria]}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Criada em</dt>
              <dd className="text-ink">{formatarDataHora(solicitacao.data_criacao)}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-ink-soft">Descrição</dt>
              <dd className="text-ink">{solicitacao.descricao}</dd>
            </div>
            {solicitacao.justificativa_prioridade && (
              <div className="sm:col-span-2">
                <dt className="text-ink-soft">Justificativa da prioridade</dt>
                <dd className="text-ink">{solicitacao.justificativa_prioridade}</dd>
              </div>
            )}
            <div>
              <dt className="text-ink-soft">Última atualização</dt>
              <dd className="text-ink">{formatarDataHora(solicitacao.data_atualizacao)}</dd>
            </div>
          </dl>

          {solicitacao.proximos_status_permitidos.length > 0 && (
            <div className="mt-6 border-t border-border pt-4">
              <p className="mb-2 text-sm font-medium text-ink-soft">Atualizar status para:</p>
              <div className="flex flex-wrap gap-2">
                {solicitacao.proximos_status_permitidos.map((proximo) => {
                  const botao = (
                    <Button
                      key={proximo}
                      variante={proximo === 'CANCELADA' ? 'perigo' : 'secundaria'}
                      disabled={statusEmAndamento !== null}
                      onClick={() => aoAtualizarStatus(proximo)}
                    >
                      {statusEmAndamento === proximo ? 'Atualizando…' : rotuloStatus[proximo]}
                    </Button>
                  );

                  // Cancelar é restrito a ADMINISTRADORES
                  return proximo === 'CANCELADA' ? (
                    <SoAdmin key={proximo}>{botao}</SoAdmin>
                  ) : (
                    botao
                  );
                })}
              </div>

              {erroAcao && (
                <p role="alert" className="mt-3 text-sm text-status-cancelada">
                  {erroAcao}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </AppShell>
  );
}