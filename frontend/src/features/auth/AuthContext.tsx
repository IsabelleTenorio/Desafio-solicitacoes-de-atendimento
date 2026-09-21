import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { login as loginRequest, logoutRequest } from './api';
import { TOKEN_KEY, USUARIO_KEY } from '../../lib/http';
import type { LoginPayload, Usuario } from './types';

interface AuthContextValor {
  usuario: Usuario | null;
  autenticado: boolean;
  entrando: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValor | null>(null);

function lerUsuarioSalvo(): Usuario | null {
  const bruto = localStorage.getItem(USUARIO_KEY);
  if (!bruto) return null;

  try {
    return JSON.parse(bruto) as Usuario;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(() => lerUsuarioSalvo());
  const [entrando, setEntrando] = useState(false);

  async function login(payload: LoginPayload) {
    setEntrando(true);
    try {
      const resposta = await loginRequest(payload);
      localStorage.setItem(TOKEN_KEY, resposta.token);
      localStorage.setItem(USUARIO_KEY, JSON.stringify(resposta.usuario));
      setUsuario(resposta.usuario);
    } finally {
      setEntrando(false);
    }
  }

  async function logout() {
    try {
      await logoutRequest();
    } catch {
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USUARIO_KEY);
      setUsuario(null);
    }
  }

  const valor = useMemo<AuthContextValor>(
    () => ({ usuario, autenticado: usuario !== null, entrando, login, logout }),
    [usuario, entrando],
  );

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValor {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error('useAuth precisa ser usado dentro de um AuthProvider.');
  }
  return contexto;
}