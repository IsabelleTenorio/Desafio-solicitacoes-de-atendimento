import { useState } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "../../../components/layout/AppShell";
import { Button } from "../../../components/ui/Button";
import { Spinner } from "../../../components/ui/Spinner";
import { EmptyState } from "../../../components/ui/EmptyState";
import { ErrorState } from "../../../components/ui/ErrorState";
import { useSolicitacoes } from "../hooks/useSolicitacoes";
import { FiltrosSolicitacoesForm } from "../components/FiltrosSolicitacoesForm";
import { SolicitacaoTable } from "../components/SolicitacaoTable";
import { Paginacao } from "../components/Paginacao";
import type { FiltrosSolicitacoes } from "../types";
import { Plus } from "lucide-react";

const FILTROS_INICIAIS: FiltrosSolicitacoes = { page: 1, per_page: 6 };

export function ListaPage() {
  const [filtros, setFiltros] = useState<FiltrosSolicitacoes>(FILTROS_INICIAIS);
  const { dados, carregando, erro, vazio, recarregar } =
    useSolicitacoes(filtros);

  const semFiltroAplicado =
    !filtros.status && !filtros.categoria && !filtros.prioridade;

  return (
    <AppShell>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-lg font-semibold text-ink">Solicitações</h1>
        <Link to="/solicitacoes/nova">
          <Button>
            <Plus className="size-5"/>
            Nova solicitação
          </Button>
        </Link>
      </div>

      <div className="mb-6 rounded-lg border border-border bg-white p-4">
        <FiltrosSolicitacoesForm filtros={filtros} aoMudar={setFiltros} />
      </div>

      {carregando && <Spinner label="Carregando solicitações…" />}

      {!carregando && erro && (
        <ErrorState mensagem={erro} aoTentarNovamente={recarregar} />
      )}

      {!carregando && !erro && vazio && (
        <EmptyState
          titulo={
            semFiltroAplicado
              ? "Nenhuma solicitação cadastrada"
              : "Nenhum resultado para esses filtros"
          }
          descricao={
            semFiltroAplicado
              ? "Comece registrando a primeira solicitação de atendimento."
              : "Tente ajustar ou limpar os filtros aplicados."
          }
          acao={
            semFiltroAplicado ? (
              <Link to="/solicitacoes/nova">
                <Button>Nova solicitação</Button>
              </Link>
            ) : (
              <Button
                variante="secundaria"
                onClick={() => setFiltros(FILTROS_INICIAIS)}
              >
                Limpar filtros
              </Button>
            )
          }
        />
      )}

      {!carregando && !erro && dados && !vazio && (
        <>
          <SolicitacaoTable solicitacoes={dados.data} />
          <Paginacao
            meta={dados.meta}
            aoMudarPagina={(page) => setFiltros((f) => ({ ...f, page }))}
          />
        </>
      )}
    </AppShell>
  );
}
