export type Perfil = "OPERADOR" | "ADMINISTRADOR";

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
