import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

/** Apenas usuário ADMINISTRADOR pode cancelar uma solicitação */
export function SoAdmin({ children }: { children: ReactNode }) {
  const { usuario } = useAuth();

  if (usuario?.perfil !== "ADMINISTRADOR") {
    return null;
  }

  return children;
}
