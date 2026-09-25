import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/Button";
import { Select } from "../../../components/ui/Select";
import { PERFIS } from "../types";
import {
  registrarUsuarioSchema,
  type RegistrarUsuarioFormValues,
} from "../registrarUsuarioSchema";

const rotuloPerfil: Record<string, string> = {
  OPERADOR: "Operador",
  ADMINISTRADOR: "Administrador",
};

interface Props {
  aoSubmeter: (valores: RegistrarUsuarioFormValues) => Promise<void>;
  enviando: boolean;
  erroDoServidor?: string | null;
}

export function RegistrarUsuarioForm({
  aoSubmeter,
  enviando,
  erroDoServidor,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrarUsuarioFormValues>({
    resolver: zodResolver(registrarUsuarioSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      perfil: "OPERADOR",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(aoSubmeter)}
      className="flex flex-col gap-4"
      noValidate
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium text-ink-soft">
          Nome
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "erro-name" : undefined}
          className="rounded-md border border-border px-3 py-2 text-sm focus-visible:outline focus-visible:outline-primary"
          {...register("name")}
        />
        {errors.name && (
          <p id="erro-name" className="text-sm text-status-cancelada">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-ink-soft">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "erro-email" : undefined}
          className="rounded-md border border-border px-3 py-2 text-sm focus-visible:outline focus-visible:outline-primary"
          {...register("email")}
        />
        {errors.email && (
          <p id="erro-email" className="text-sm text-status-cancelada">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-sm font-medium text-ink-soft"
          >
            Senha
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby={errors.password ? "erro-password" : undefined}
            className="rounded-md border border-border px-3 py-2 text-sm focus-visible:outline focus-visible:outline-primary"
            {...register("password")}
          />
          {errors.password && (
            <p id="erro-password" className="text-sm text-status-cancelada">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="password_confirmation"
            className="text-sm font-medium text-ink-soft"
          >
            Confirmar senha
          </label>
          <input
            id="password_confirmation"
            type="password"
            autoComplete="new-password"
            aria-invalid={errors.password_confirmation ? "true" : "false"}
            aria-describedby={
              errors.password_confirmation
                ? "erro-password_confirmation"
                : undefined
            }
            className="rounded-md border border-border px-3 py-2 text-sm focus-visible:outline focus-visible:outline-primary"
            {...register("password_confirmation")}
          />
          {errors.password_confirmation && (
            <p
              id="erro-password_confirmation"
              className="text-sm text-status-cancelada"
            >
              {errors.password_confirmation.message}
            </p>
          )}
        </div>
      </div>

      <Select
        label="Perfil"
        opcoes={PERFIS.map((perfil) => ({
          value: perfil,
          label: rotuloPerfil[perfil],
        }))}
        {...register("perfil")}
      />

      {erroDoServidor && (
        <p role="alert" className="text-sm text-status-cancelada">
          {erroDoServidor}
        </p>
      )}

      <Button type="submit" disabled={enviando} className="self-start">
        {enviando ? "Cadastrando…" : "Cadastrar usuário"}
      </Button>
    </form>
  );
}