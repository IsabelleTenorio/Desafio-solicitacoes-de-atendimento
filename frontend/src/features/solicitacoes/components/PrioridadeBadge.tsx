import type { Prioridade } from "../types";

const rotulo: Record<Prioridade, string> = {
  BAIXA: "Baixa",
  MEDIA: "Média",
  ALTA: "Alta",
  URGENTE: "Urgente",
};

const corPorPrioridade: Record<Prioridade, string> = {
  BAIXA: "text-prioridade-baixa",
  MEDIA: "text-prioridade-media",
  ALTA: "text-prioridade-alta",
  URGENTE: "text-prioridade-urgente",
};

export function PrioridadeBadge({ prioridade }: { prioridade: Prioridade }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-sm font-medium ${corPorPrioridade[prioridade]}`}
    >
      <span
        className="h-1.5 w-1.5 rounded-full bg-current"
        aria-hidden="true"
      />
      {rotulo[prioridade]}
    </span>
  );
}
