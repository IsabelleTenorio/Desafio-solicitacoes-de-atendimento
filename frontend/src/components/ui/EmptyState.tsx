import type { ReactNode } from "react";

interface Props {
  titulo: string;
  descricao: string;
  acao?: ReactNode;
}

export function EmptyState({ titulo, descricao, acao }: Props) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border py-16 text-center">
      <p className="text-sm font-medium text-ink">{titulo}</p>
      <p className="max-w-sm text-sm text-ink-soft">{descricao}</p>
      {acao}
    </div>
  );
}
