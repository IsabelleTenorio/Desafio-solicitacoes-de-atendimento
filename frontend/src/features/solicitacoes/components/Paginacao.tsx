import { Button } from '../../../components/ui/Button';
import type { PaginacaoMeta } from '../types';

interface Props {
  meta: PaginacaoMeta;
  aoMudarPagina: (pagina: number) => void;
}

export function Paginacao({ meta, aoMudarPagina }: Props) {
  if (meta.last_page <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-between border-t border-border px-4 py-3 text-sm text-ink-soft">
      <span>
        Página {meta.current_page} de {meta.last_page} | {meta.total} solicitações
      </span>
      <div className="flex gap-2">
        <Button
          variante="secundaria"
          onClick={() => aoMudarPagina(meta.current_page - 1)}
          disabled={meta.current_page <= 1}
        >
          Anterior
        </Button>
        <Button
          variante="secundaria"
          onClick={() => aoMudarPagina(meta.current_page + 1)}
          disabled={meta.current_page >= meta.last_page}
        >
          Próxima
        </Button>
      </div>
    </div>
  );
}