import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppShell } from '../../../components/layout/AppShell';
import { mensagemDeErro } from '../../../lib/http';
import { criarSolicitacao } from '../api';
import { SolicitacaoForm } from '../components/SolicitacaoForm';
import type { NovaSolicitacaoFormValues } from '../novaSolicitacaoSchema';

export function NovaSolicitacaoPage() {
  const navigate = useNavigate();
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function aoSubmeter(valores: NovaSolicitacaoFormValues) {
    setEnviando(true);
    setErro(null);

    try {
      const solicitacao = await criarSolicitacao({
        nome_solicitante: valores.nome_solicitante,
        categoria: valores.categoria,
        prioridade: valores.prioridade,
        descricao: valores.descricao,
        justificativa_prioridade: valores.justificativa_prioridade || undefined,
      });

      navigate(`/solicitacoes/${solicitacao.id}`, { replace: true });
    } catch (erroCapturado) {
      setErro(mensagemDeErro(erroCapturado));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <AppShell>
      <Link to="/" className="mb-4 inline-block text-sm text-primary hover:underline">
        ← Voltar para a lista
      </Link>

      <div className="rounded-lg border border-border bg-white p-6">
        <h1 className="mb-6 text-lg font-semibold text-ink">Nova solicitação</h1>
        <SolicitacaoForm aoSubmeter={aoSubmeter} enviando={enviando} erroDoServidor={erro} />
      </div>
    </AppShell>
  );
}