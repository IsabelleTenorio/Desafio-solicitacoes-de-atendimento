import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SolicitacaoForm } from './SolicitacaoForm';

describe('SolicitacaoForm', () => {
  it('bloqueia o envio quando a prioridade é URGENTE sem justificativa preenchida', async () => {
    const aoSubmeter = vi.fn();
    const usuario = userEvent.setup();

    render(<SolicitacaoForm aoSubmeter={aoSubmeter} enviando={false} />);

    await usuario.type(screen.getByLabelText('Nome do solicitante'), 'Maria Fictícia');
    await usuario.type(
      screen.getByLabelText('Descrição'),
      'Consulta fictícia para validar o formulário de testes.',
    );
    await usuario.selectOptions(screen.getByLabelText('Prioridade'), 'URGENTE');

    expect(screen.getByLabelText('Justificativa da prioridade urgente')).toBeInTheDocument();

    await usuario.click(screen.getByRole('button', { name: /registrar solicitação/i }));

    await waitFor(() => {
      expect(
        screen.getByText(
          'A justificativa de prioridade é obrigatória quando a prioridade é URGENTE.',
        ),
      ).toBeInTheDocument();
    });

    expect(aoSubmeter).not.toHaveBeenCalled();
  });

  it('permite o envio quando os dados são válidos', async () => {
    const aoSubmeter = vi.fn().mockResolvedValue(undefined);
    const usuario = userEvent.setup();

    render(<SolicitacaoForm aoSubmeter={aoSubmeter} enviando={false} />);

    await usuario.type(screen.getByLabelText('Nome do solicitante'), 'João Fictício');
    await usuario.type(
      screen.getByLabelText('Descrição'),
      'Exame de rotina fictício para validar o formulário.',
    );

    await usuario.click(screen.getByRole('button', { name: /registrar solicitação/i }));

    await waitFor(() => {
      expect(aoSubmeter).toHaveBeenCalledTimes(1);
    });

    const valoresEnviados = aoSubmeter.mock.calls[0][0];
    expect(valoresEnviados.nome_solicitante).toBe('João Fictício');
    expect(valoresEnviados.prioridade).toBe('BAIXA');
  });
});