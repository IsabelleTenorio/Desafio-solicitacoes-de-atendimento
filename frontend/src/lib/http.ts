import axios, { AxiosError } from 'axios';

const baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api/v1';

export const http = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
  },
});

/** Ponto único de leitura do token */
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('vlab:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/** Mensagem amigável para exibição direta na UI, sem vazar detalhes internos da API */
export function mensagemDeErro(erro: unknown): string {
  if (axios.isAxiosError(erro)) {
    const axiosErro = erro as AxiosError<{ message?: string }>;

    if (axiosErro.response?.status === 401) {
      return 'Sessão expirada ou inválida. Faça login novamente.';
    }
    if (axiosErro.response?.status === 403) {
      return 'Você não tem permissão para realizar esta ação.';
    }
    if (axiosErro.response?.data?.message) {
      return axiosErro.response.data.message;
    }
    if (axiosErro.request) {
      return 'Não foi possível conectar à API. Verifique se o backend está no ar.';
    }
  }

  return 'Ocorreu um erro inesperado. Tente novamente.';
}