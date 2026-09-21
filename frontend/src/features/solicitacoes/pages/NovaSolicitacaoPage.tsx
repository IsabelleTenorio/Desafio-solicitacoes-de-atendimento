import { Link } from 'react-router-dom';
import { AppShell } from '../../../components/layout/AppShell';

export function NovaSolicitacaoPage() {
  return (
    <AppShell>
      <Link to="/" className="mb-4 inline-block text-sm text-primary hover:underline">
        ← Voltar para a lista
      </Link>
      <div className="rounded-lg border border-dashed border-border bg-white p-8 text-center text-sm text-ink-soft">
        O formulário de criação de solicitação será implementado no Dia 4.
      </div>
    </AppShell>
  );
}