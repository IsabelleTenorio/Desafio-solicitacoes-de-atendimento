import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { AppShell } from "../../../components/layout/AppShell";
import { mensagemDeErro } from "../../../lib/http";
import { registrarUsuario } from "../api";
import { RegistrarUsuarioForm } from "../components/RegistrarUsuarioForm";
import type { RegistrarUsuarioFormValues } from "../registrarUsuarioSchema";

export function RegistrarUsuarioPage() {
  const navigate = useNavigate();
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function aoSubmeter(valores: RegistrarUsuarioFormValues) {
    setEnviando(true);
    setErro(null);

    try {
      await registrarUsuario(valores);
      navigate("/", { replace: true });
    } catch (erroCapturado) {
      setErro(mensagemDeErro(erroCapturado));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <AppShell>
      <Link
        to="/"
        className="mb-4 flex flex-row text-base text-primary hover:underline items-center"
      >
        <ChevronLeft className="size-5" />
        Voltar para a lista
      </Link>

      <div className="rounded-lg border border-border bg-white p-6">
        <h1 className="mb-6 text-lg font-semibold text-ink">
          Cadastrar usuário
        </h1>
        <RegistrarUsuarioForm
          aoSubmeter={aoSubmeter}
          enviando={enviando}
          erroDoServidor={erro}
        />
      </div>
    </AppShell>
  );
}