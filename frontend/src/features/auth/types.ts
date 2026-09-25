export type Perfil = "OPERADOR" | "ADMINISTRADOR";
export const PERFIS = ["OPERADOR", "ADMINISTRADOR"] as const;

export interface Usuario {
  id: number;
  name: string;
  email: string;
  perfil: Perfil;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResposta {
  token: string;
  usuario: Usuario;
}

export interface RegistroPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  perfil: Perfil;
}
