import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SoAdmin } from './SoAdmin';

const usuarioMock = vi.hoisted(() => ({ usuario: { perfil: 'OPERADOR' } as { perfil: string } | null }));

vi.mock('../AuthContext', () => ({
  useAuth: () => usuarioMock,
}));

describe('SoAdmin', () => {
  it('não renderiza o conteúdo para um usuário OPERADOR', () => {
    usuarioMock.usuario = { perfil: 'OPERADOR' };

    render(
      <SoAdmin>
        <button>Cancelar</button>
      </SoAdmin>,
    );

    expect(screen.queryByRole('button', { name: 'Cancelar' })).not.toBeInTheDocument();
  });

  it('renderiza o conteúdo para um usuário ADMINISTRADOR', () => {
    usuarioMock.usuario = { perfil: 'ADMINISTRADOR' };

    render(
      <SoAdmin>
        <button>Cancelar</button>
      </SoAdmin>,
    );

    expect(screen.getByRole('button', { name: 'Cancelar' })).toBeInTheDocument();
  });
});