import axios, { AxiosError } from "axios";

const baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api/v1";

export const TOKEN_KEY = "vlab:token";
export const USUARIO_KEY = "vlab:usuario";

export const http = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
  },
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/** Limpa o armazenamento e manda para /login se o token tiver sido expirado */
http.interceptors.response.use(
  (resposta) => resposta,
  (erro: unknown) => {
    const ehLogin =
      axios.isAxiosError(erro) && erro.config?.url?.includes("/login");

    if (axios.isAxiosError(erro) && erro.response?.status === 401 && !ehLogin) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USUARIO_KEY);
      if (window.location.pathname !== "/login") {
        window.location.assign("/login");
      }
    }

    return Promise.reject(erro);
  },
);

/** Mensagem amigável para exibição direta na UI, sem vazar detalhes */
export function mensagemDeErro(erro: unknown): string {
  if (axios.isAxiosError(erro)) {
    const axiosErro = erro as AxiosError<{ message?: string }>;

    if (axiosErro.response?.status === 401) {
      return "Sessão expirada ou inválida. Faça login novamente.";
    }
    if (axiosErro.response?.status === 403) {
      return "Você não tem permissão para realizar esta ação.";
    }
    if (axiosErro.response?.data?.message) {
      return axiosErro.response.data.message;
    }
    if (axiosErro.request) {
      return "Não foi possível conectar à API. Verifique se o backend está no ar.";
    }
  }

  return "Ocorreu um erro inesperado. Tente novamente.";
}
