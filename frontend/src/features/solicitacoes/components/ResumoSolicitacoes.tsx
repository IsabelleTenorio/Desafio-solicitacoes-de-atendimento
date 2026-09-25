import type { Prioridade, ResumoSolicitacoes as ResumoDados, Status } from "../types";
import { STATUS, PRIORIDADES } from "../types";

const rotuloStatus: Record<Status, string> = {
  RECEBIDA: "Recebida",
  EM_ANALISE: "Em análise",
  AGENDADA: "Agendada",
  CONCLUIDA: "Concluída",
  CANCELADA: "Cancelada",
};

const classesStatus: Record<Status, string> = {
  RECEBIDA: "text-status-recebida bg-status-recebida-bg",
  EM_ANALISE: "text-status-em-analise bg-status-em-analise-bg",
  AGENDADA: "text-status-agendada bg-status-agendada-bg",
  CONCLUIDA: "text-status-concluida bg-status-concluida-bg",
  CANCELADA: "text-status-cancelada bg-status-cancelada-bg",
};

const rotuloPrioridade: Record<Prioridade, string> = {
  BAIXA: "Baixa",
  MEDIA: "Média",
  ALTA: "Alta",
  URGENTE: "Urgente",
};

const corPrioridade: Record<Prioridade, string> = {
  BAIXA: "text-prioridade-baixa",
  MEDIA: "text-prioridade-media",
  ALTA: "text-prioridade-alta",
  URGENTE: "text-prioridade-urgente",
};

export function ResumoSolicitacoes({ resumo }: { resumo: ResumoDados }) {
  return (
    <div className="mb-6 rounded-lg border border-border bg-white p-4">
      <h2 className="mb-3 text-sm font-semibold text-ink-soft">
        Resumo das solicitações
      </h2>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6">
        <div className="flex flex-wrap gap-2">
          {STATUS.map((status) => (
            <span
              key={status}
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${classesStatus[status]}`}
            >
              {rotuloStatus[status]}
              <span className="font-semibold">{resumo.por_status[status]}</span>
            </span>
          ))}
        </div>

        <div className="hidden w-px self-stretch bg-border sm:block" />

        <div className="flex flex-wrap gap-3">
          {PRIORIDADES.map((prioridade) => (
            <span
              key={prioridade}
              className={`inline-flex items-center gap-1.5 text-sm font-medium ${corPrioridade[prioridade]}`}
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-current"
                aria-hidden="true"
              />
              {rotuloPrioridade[prioridade]}
              <span className="font-semibold">
                {resumo.por_prioridade[prioridade]}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}