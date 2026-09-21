import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, LogOut } from 'lucide-react';
import { useAuth } from '../../features/auth/AuthContext';

const rotuloPerfil: Record<string, string> = {
  OPERADOR: 'Operador',
  ADMINISTRADOR: 'Administrador',
};

export function AppShell({ children }: { children: ReactNode }) {
  const { usuario, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex flex-row items-center justify-between gap-2">
            <HeartPulse className="size-10 text-primary" aria-hidden />
            <div className="flex flex-col">
              <Link to="/" className="text-xl font-semibold text-ink">
                Solicitações de Atendimento
              </Link>
              <span className="text-xs text-ink-soft">Saúde Pública</span>
            </div>
          </div>
          
          {usuario && (
            <div className="flex items-center gap-3 text-sm">
              <span className="text-ink-soft">
                {usuario.name}{' '}
                <span className="text-xs text-ink-soft">({rotuloPerfil[usuario.perfil]})</span>
              </span>
              <button
                type="button"
                onClick={() => logout()}
                className="flex items-center gap-1 rounded-md px-2 py-1 text-ink-soft hover:bg-background hover:text-ink
                  focus-visible:outline focus-visible:outline-primary"
              >
                <LogOut className="size-4" aria-hidden />
                Sair
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}