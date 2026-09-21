import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./features/auth/AuthContext";
import { RequireAuth } from "./features/auth/components/RequireAuth";
import { LoginPage } from "./features/auth/pages/LoginPage";
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
