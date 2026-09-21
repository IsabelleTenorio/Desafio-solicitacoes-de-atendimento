import { useParams, Link } from 'react-router-dom';
import { AppShell } from '../../../components/layout/AppShell';
import { Spinner } from '../../../components/ui/Spinner';
import { ErrorState } from '../../../components/ui/ErrorState';
import { Button } from '../../../components/ui/Button';
import { useSolicitacao } from '../hooks/useSolicitacao';
import { StatusBadge } from '../components/StatusBadge';
import { PrioridadeBadge } from '../components/PrioridadeBadge';

const rotuloCategoria: Record<string, string> = {
  CONSULTA: 'Consulta',
  EXAME: 'Exame',
  VACINACAO: 'Vacinação',
  OUTRO: 'Outro',
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
                {solicitacao.proximos_status_permitidos.map((proximo) => (
                  <Button key={proximo} variante="secundaria" disabled>
                    {proximo}
                  </Button>
                ))}
              </div>
              <p className="mt-2 text-xs text-ink-soft">
                A ação de atualizar status será habilitada no Dia 4, junto com a autenticação.
              </p>
            </div>
          )}
        </div>
      )}
    </AppShell>
  );
}