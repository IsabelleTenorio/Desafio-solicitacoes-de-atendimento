export function Spinner({ label = "Carregando…" }: { label?: string }) {
  return (
    <div
      role="status"
      className="flex items-center justify-center gap-3 py-16 text-ink-soft"
    >
      <span
        className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-primary"
        aria-hidden="true"
      />
      <span className="text-sm">{label}</span>
    </div>
  );
}
