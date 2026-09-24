import { createContext } from "react";
import type { LoginPayload, Usuario } from "./types";

export interface AuthContextValor {
  usuario: Usuario | null;
  autenticado: boolean;
  entrando: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValor | null>(null);