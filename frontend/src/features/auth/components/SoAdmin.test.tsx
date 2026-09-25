import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { SoAdmin } from "./SoAdmin";

const usuarioMock = vi.hoisted(() => ({
  usuario: { perfil: "OPERADOR" } as { perfil: string } | null,
}));

vi.mock("../hooks/useAuth", () => ({
  useAuth: () => usuarioMock,
}));

describe("SoAdmin", () => {
  it("não renderiza o conteúdo para um usuário OPERADOR", () => {
    usuarioMock.usuario = { perfil: "OPERADOR" };

    render(
      <SoAdmin>
        <button>Cancelar</button>
      </SoAdmin>,
    );

    expect(
      screen.queryByRole("button", { name: "Cancelar" }),
    ).not.toBeInTheDocument();
  });

  it("renderiza o conteúdo para um usuário ADMINISTRADOR", () => {
    usuarioMock.usuario = { perfil: "ADMINISTRADOR" };

    render(
      <SoAdmin>
        <button>Cancelar</button>
      </SoAdmin>,
    );

    expect(
      screen.getByRole("button", { name: "Cancelar" }),
    ).toBeInTheDocument();
  });

  it("com aoNegar, redireciona quem não é ADMINISTRADOR (uso como guarda de rota)", () => {
    usuarioMock.usuario = { perfil: "OPERADOR" };

    render(
      <MemoryRouter initialEntries={["/usuarios/novo"]}>
        <Routes>
          <Route path="/" element={<p>Página inicial</p>} />
          <Route
            path="/usuarios/novo"
            element={
              <SoAdmin aoNegar={<Navigate to="/" replace />}>
                <p>Formulário de cadastro</p>
              </SoAdmin>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Página inicial")).toBeInTheDocument();
    expect(
      screen.queryByText("Formulário de cadastro"),
    ).not.toBeInTheDocument();
  });

  it("com aoNegar, ainda renderiza o conteúdo pra quem é ADMINISTRADOR", () => {
    usuarioMock.usuario = { perfil: "ADMINISTRADOR" };

    render(
      <MemoryRouter initialEntries={["/usuarios/novo"]}>
        <Routes>
          <Route path="/" element={<p>Página inicial</p>} />
          <Route
            path="/usuarios/novo"
            element={
              <SoAdmin aoNegar={<Navigate to="/" replace />}>
                <p>Formulário de cadastro</p>
              </SoAdmin>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Formulário de cadastro")).toBeInTheDocument();
  });
});
