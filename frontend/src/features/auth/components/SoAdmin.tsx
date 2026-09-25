import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

interface Props {
  children: ReactNode;
  /** O que renderizar quando o usuário não é ADMINISTRADOR. Padrão: nada (esconde). */
  aoNegar?: ReactNode;
}

/** Só ADMINISTRADOR vê o conteúdo: usado tanto pra esconder um botão/link quanto, com aoNegar={<Navigate .../>}, 
 * pra proteger uma rota inteira. */
export function SoAdmin({ children, aoNegar = null }: Props) {
  const { usuario } = useAuth();

  if (usuario?.perfil !== "ADMINISTRADOR") {
    return aoNegar;
  }

  return children;
}
