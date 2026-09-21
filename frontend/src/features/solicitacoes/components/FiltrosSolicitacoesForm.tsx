import { Select } from "../../../components/ui/Select";
import { CATEGORIAS, PRIORIDADES, STATUS } from "../types";
import type {
  Categoria,
  FiltrosSolicitacoes,
  Prioridade,
  Status,
} from "../types";

const rotuloStatus: Record<string, string> = {
  RECEBIDA: "Recebida",
  EM_ANALISE: "Em análise",
  AGENDADA: "Agendada",
  CONCLUIDA: "Concluída",
  CANCELADA: "Cancelada",
};

const rotuloCategoria: Record<string, string> = {
  CONSULTA: "Consulta",
  EXAME: "Exame",
  VACINACAO: "Vacinação",
  OUTRO: "Outro",
};

const rotuloPrioridade: Record<string, string> = {
  BAIXA: "Baixa",
  MEDIA: "Média",
  ALTA: "Alta",
  URGENTE: "Urgente",
};

interface Props {
  filtros: FiltrosSolicitacoes;
  aoMudar: (filtros: FiltrosSolicitacoes) => void;
}

export function FiltrosSolicitacoesForm({ filtros, aoMudar }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <Select
        label="Status"
        opcaoVazia="Todos os status"
        value={filtros.status ?? ""}
        onChange={(evento) =>
          aoMudar({
            ...filtros,
            status: (evento.target.value || undefined) as Status | undefined,
            page: 1,
          })
        }
        opcoes={STATUS.map((status) => ({
          value: status,
          label: rotuloStatus[status],
        }))}
      />

      <Select
        label="Categoria"
        opcaoVazia="Todas as categorias"
        value={filtros.categoria ?? ""}
        onChange={(evento) =>
          aoMudar({
            ...filtros,
            categoria: (evento.target.value || undefined) as
              Categoria | undefined,
            page: 1,
          })
        }
        opcoes={CATEGORIAS.map((categoria) => ({
          value: categoria,
          label: rotuloCategoria[categoria],
        }))}
      />

      <Select
        label="Prioridade"
        opcaoVazia="Todas as prioridades"
        value={filtros.prioridade ?? ""}
        onChange={(evento) =>
          aoMudar({
            ...filtros,
            prioridade: (evento.target.value || undefined) as
              Prioridade | undefined,
            page: 1,
          })
        }
        opcoes={PRIORIDADES.map((prioridade) => ({
          value: prioridade,
          label: rotuloPrioridade[prioridade],
        }))}
      />
    </div>
  );
}
