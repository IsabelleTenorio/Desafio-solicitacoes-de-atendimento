import { Link } from "react-router-dom";
import type { Solicitacao } from "../types";
import { StatusBadge } from "./StatusBadge";
import { PrioridadeBadge } from "./PrioridadeBadge";

const rotuloCategoria: Record<string, string> = {
  CONSULTA: "Consulta",
  EXAME: "Exame",
  VACINACAO: "Vacinação",
  OUTRO: "Outro",
};

function formatarData(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function SolicitacaoTable({
  solicitacoes,
}: {
  solicitacoes: Solicitacao[];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-white">
      {/* Tabela semântica para telas médias/grandes */}
      <table className="hidden w-full text-left text-sm md:table">
        <caption className="sr-only">
          Lista de solicitações de atendimento
        </caption>
        <thead className="border-b border-border bg-background text-xs uppercase tracking-wide text-ink-soft">
          <tr>
            <th scope="col" className="px-4 py-3 font-medium">
              Protocolo
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Solicitante
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Categoria
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Prioridade
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Status
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Criada em
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {solicitacoes.map((solicitacao) => (
            <tr key={solicitacao.id} className="hover:bg-background">
              <td className="px-4 py-3">
                <Link
                  to={`/solicitacoes/${solicitacao.id}`}
                  className="font-mono text-primary hover:underline focus-visible:outline focus-visible:outline-primary"
                >
                  {solicitacao.protocolo}
                </Link>
              </td>
              <td className="px-4 py-3 text-ink">
                {solicitacao.nome_solicitante}
              </td>
              <td className="px-4 py-3 text-ink-soft">
                {rotuloCategoria[solicitacao.categoria]}
              </td>
              <td className="px-4 py-3">
                <PrioridadeBadge prioridade={solicitacao.prioridade} />
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={solicitacao.status} />
              </td>
              <td className="px-4 py-3 text-ink-soft">
                {formatarData(solicitacao.data_criacao)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Lista em cards para mobile */}
      <ul className="divide-y divide-border md:hidden">
        {solicitacoes.map((solicitacao) => (
          <li key={solicitacao.id}>
            <Link
              to={`/solicitacoes/${solicitacao.id}`}
              className="flex flex-col gap-2 px-4 py-3 focus-visible:outline focus-visible:outline-primary"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-primary">
                  {solicitacao.protocolo}
                </span>
                <StatusBadge status={solicitacao.status} />
              </div>
              <span className="text-sm font-medium text-ink">
                {solicitacao.nome_solicitante}
              </span>
              <div className="flex items-center justify-between text-xs text-ink-soft">
                <span>{rotuloCategoria[solicitacao.categoria]}</span>
                <PrioridadeBadge prioridade={solicitacao.prioridade} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
