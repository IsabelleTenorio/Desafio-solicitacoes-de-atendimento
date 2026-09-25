import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./features/auth/AuthContext";
import { RequireAuth } from "./features/auth/components/RequireAuth";
import { SoAdmin } from "./features/auth/components/SoAdmin";
import { LoginPage } from "./features/auth/pages/LoginPage";
import { RegistrarUsuarioPage } from "./features/auth/pages/RegistrarUsuarioPage";
import { ListaPage } from "./features/solicitacoes/pages/ListaPage";
import { DetalhePage } from "./features/solicitacoes/pages/DetalhePage";
import { NovaSolicitacaoPage } from "./features/solicitacoes/pages/NovaSolicitacaoPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/usuarios/novo"
            element={
              <RequireAuth>
                <SoAdmin aoNegar={<Navigate to="/" replace />}>
                  <RegistrarUsuarioPage />
                </SoAdmin>
              </RequireAuth>
            }
          />

          <Route
            path="/"
            element={
              <RequireAuth>
                <ListaPage />
              </RequireAuth>
            }
          />
          <Route
            path="/solicitacoes/nova"
            element={
              <RequireAuth>
                <NovaSolicitacaoPage />
              </RequireAuth>
            }
          />
          <Route
            path="/solicitacoes/:id"
            element={
              <RequireAuth>
                <DetalhePage />
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
