import { useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { mensagemDeErro } from '../../../lib/http';
import { useAuth } from '../AuthContext';
import { HeartPulse } from 'lucide-react';

export function LoginPage() {
  const { login, entrando } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState<string | null>(null);

  const destino = (location.state as { de?: string } | null)?.de ?? '/';

  async function aoSubmeter(evento: FormEvent) {
    evento.preventDefault();
    setErro(null);

    try {
      await login({ email, password: senha });
      navigate(destino, { replace: true });
    } catch (erroCapturado) {
      setErro(mensagemDeErro(erroCapturado));
    }
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background px-4">
      <div className="flex flex-row items-center gap-2 mb-6">
            <HeartPulse className="size-10 text-primary" aria-hidden />
            <div className="flex flex-col">
              <p className="text-2xl font-semibold text-ink">
                Solicitações de Atendimento
              </p>
              <span className="text-xs text-ink-soft">Saúde Pública</span>
            </div>
        </div>
      <form
        onSubmit={aoSubmeter}
        className="w-full max-w-sm rounded-lg border border-border bg-white p-6 shadow-sm"
      >   
        <p className="text-xl font-semibold text-ink text-center mb-4">
            Login
        </p>
        <p className="mb-6 text-sm text-ink-soft">Entre com sua conta para continuar.</p>

        <div className="mb-4 flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-ink-soft">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
            className="rounded-md border border-border px-3 py-2 text-sm focus-visible:outline focus-visible:outline-primary"
          />
        </div>

        <div className="mb-4 flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium text-ink-soft">
            Senha
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={senha}
            onChange={(evento) => setSenha(evento.target.value)}
            className="rounded-md border border-border px-3 py-2 text-sm focus-visible:outline focus-visible:outline-primary"
          />
        </div>

        {erro && (
          <p role="alert" className="mb-4 text-sm text-status-cancelada">
            {erro}
          </p>
        )}

        <Button type="submit" disabled={entrando} className="w-full mt-3">
          {entrando ? 'Entrando…' : 'Entrar'}
        </Button>
      </form>
    </div>
  );
}