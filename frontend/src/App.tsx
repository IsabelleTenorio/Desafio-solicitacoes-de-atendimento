import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ListaPage } from './features/solicitacoes/pages/ListaPage';
import { DetalhePage } from './features/solicitacoes/pages/DetalhePage';
import { NovaSolicitacaoPage } from './features/solicitacoes/pages/NovaSolicitacaoPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListaPage />} />
        <Route path="/solicitacoes/nova" element={<NovaSolicitacaoPage />} />
        <Route path="/solicitacoes/:id" element={<DetalhePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;