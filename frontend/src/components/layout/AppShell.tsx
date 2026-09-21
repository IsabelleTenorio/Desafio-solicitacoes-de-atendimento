import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex flex-row items-center justify-between gap-4">
            <span className="flex size-10 items-center justify-center rounded-md bg-primary text-white">
              <HeartPulse className="size-5" aria-hidden />
            </span>
            <div className="flex flex-col">
              <Link to="/" className="text-xl font-semibold text-ink">
                Solicitações de Atendimento
              </Link>
              <span className="text-xs text-ink-soft">Saúde Pública</span>
            </div>
            
          </div>
          
          <span className="text-xs text-ink-soft">Sair</span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}