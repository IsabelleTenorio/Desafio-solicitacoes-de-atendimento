import { http } from "../../lib/http";
import type { LoginPayload, LoginResposta, RegistroPayload, Usuario } from "./types";

export async function login(payload: LoginPayload): Promise<LoginResposta> {
  const { data } = await http.post<LoginResposta>("/login", payload);
  return data;
}

export async function logoutRequest(): Promise<void> {
  await http.post("/logout");
}

export async function registrarUsuario(
  payload: RegistroPayload,
): Promise<Usuario> {
  const { data } = await http.post<{ data: Usuario }>("/usuarios", payload);
  return data.data;
}