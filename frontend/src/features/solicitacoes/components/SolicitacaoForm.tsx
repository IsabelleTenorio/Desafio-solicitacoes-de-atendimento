import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/Button";
import { Select } from "../../../components/ui/Select";
import { CATEGORIAS, PRIORIDADES } from "../types";
import {
  novaSolicitacaoSchema,
  type NovaSolicitacaoFormValues,
} from "../novaSolicitacaoSchema";

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
  aoSubmeter: (valores: NovaSolicitacaoFormValues) => Promise<void>;
  enviando: boolean;
  erroDoServidor?: string | null;
}

export function SolicitacaoForm({
  aoSubmeter,
  enviando,
  erroDoServidor,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NovaSolicitacaoFormValues>({
    resolver: zodResolver(novaSolicitacaoSchema),
    defaultValues: {
      nome_solicitante: "",
      categoria: "CONSULTA",
      prioridade: "BAIXA",
      descricao: "",
      justificativa_prioridade: "",
    },
  });

  const prioridadeSelecionada = watch("prioridade");
  const ehUrgente = prioridadeSelecionada === "URGENTE";

  return (
    <form
      onSubmit={handleSubmit(aoSubmeter)}
      className="flex flex-col gap-4"
      noValidate
    >
      <div className="flex flex-col gap-1">
        <label
          htmlFor="nome_solicitante"
          className="text-sm font-medium text-ink-soft"
        >
          Nome do solicitante
        </label>
        <input
          id="nome_solicitante"
          type="text"
          aria-invalid={errors.nome_solicitante ? "true" : "false"}
          aria-describedby={
            errors.nome_solicitante ? "erro-nome_solicitante" : undefined
          }
          className="rounded-md border border-border px-3 py-2 text-sm focus-visible:outline focus-visible:outline-primary"
          {...register("nome_solicitante")}
        />
        {errors.nome_solicitante && (
          <p
            id="erro-nome_solicitante"
            className="text-sm text-status-cancelada"
          >
            {errors.nome_solicitante.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          label="Categoria"
          opcoes={CATEGORIAS.map((categoria) => ({
            value: categoria,
            label: rotuloCategoria[categoria],
          }))}
          {...register("categoria")}
        />

        <Select
          label="Prioridade"
          opcoes={PRIORIDADES.map((prioridade) => ({
            value: prioridade,
            label: rotuloPrioridade[prioridade],
          }))}
          {...register("prioridade")}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="descricao"
          className="text-sm font-medium text-ink-soft"
        >
          Descrição
        </label>
        <textarea
          id="descricao"
          rows={4}
          aria-invalid={errors.descricao ? "true" : "false"}
          aria-describedby={errors.descricao ? "erro-descricao" : undefined}
          className="rounded-md border border-border px-3 py-2 text-sm focus-visible:outline focus-visible:outline-primary"
          {...register("descricao")}
        />
        {errors.descricao && (
          <p id="erro-descricao" className="text-sm text-status-cancelada">
            {errors.descricao.message}
          </p>
        )}
      </div>

      {ehUrgente && (
        <div className="flex flex-col gap-1">
          <label
            htmlFor="justificativa_prioridade"
            className="text-sm font-medium text-ink-soft"
          >
            Justificativa da prioridade urgente
          </label>
          <textarea
            id="justificativa_prioridade"
            rows={3}
            aria-invalid={errors.justificativa_prioridade ? "true" : "false"}
            aria-describedby={
              errors.justificativa_prioridade
                ? "erro-justificativa_prioridade"
                : undefined
            }
            className="rounded-md border border-border px-3 py-2 text-sm focus-visible:outline focus-visible:outline-primary"
            {...register("justificativa_prioridade")}
          />
          {errors.justificativa_prioridade && (
            <p
              id="erro-justificativa_prioridade"
              role="alert"
              className="text-sm text-status-cancelada"
            >
              {errors.justificativa_prioridade.message}
            </p>
          )}
        </div>
      )}

      {erroDoServidor && (
        <p role="alert" className="text-sm text-status-cancelada">
          {erroDoServidor}
        </p>
      )}

      <Button type="submit" disabled={enviando} className="self-start">
        {enviando ? "Enviando…" : "Registrar solicitação"}
      </Button>
    </form>
  );
}
