import type { Status } from "../types";

const rotulo: Record<Status, string> = {
  RECEBIDA: "Recebida",
  EM_ANALISE: "Em análise",
  AGENDADA: "Agendada",
  CONCLUIDA: "Concluída",
  CANCELADA: "Cancelada",
};

const classesPorStatus: Record<Status, string> = {
  RECEBIDA: "text-status-recebida bg-status-recebida-bg",
  EM_ANALISE: "text-status-em-analise bg-status-em-analise-bg",
  AGENDADA: "text-status-agendada bg-status-agendada-bg",
  CONCLUIDA: "text-status-concluida bg-status-concluida-bg",
  CANCELADA: "text-status-cancelada bg-status-cancelada-bg",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${classesPorStatus[status]}`}
    >
      {rotulo[status]}
    </span>
  );
}
