import { http } from '../../lib/http';
import type { LoginPayload, LoginResposta } from './types';

export async function login(payload: LoginPayload): Promise<LoginResposta> {
  const { data } = await http.post<LoginResposta>('/login', payload);
  return data;
}

export async function logoutRequest(): Promise<void> {
  await http.post('/logout');
}