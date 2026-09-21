import { Button } from "./Button";

interface Props {
  mensagem: string;
  aoTentarNovamente?: () => void;
}

export function ErrorState({ mensagem, aoTentarNovamente }: Props) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-3 rounded-lg border border-status-cancelada-bg bg-status-cancelada-bg/40 py-16 text-center"
    >
      <p className="text-sm font-medium text-status-cancelada">{mensagem}</p>
      {aoTentarNovamente && (
        <Button variante="secundaria" onClick={aoTentarNovamente}>
          Tentar novamente
        </Button>
      )}
    </div>
  );
}
