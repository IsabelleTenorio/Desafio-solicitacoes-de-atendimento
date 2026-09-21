import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="text-base font-semibold text-ink">
            Solicitações de Atendimento
          </Link>
          <span className="text-xs text-ink-soft">V-Lab · Saúde Pública</span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}