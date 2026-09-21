import type { ButtonHTMLAttributes } from 'react';

type Variante = 'primaria' | 'secundaria' | 'perigo';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante;
}

const classesPorVariante: Record<Variante, string> = {
  primaria: 'bg-primary text-white hover:bg-primary-hover',
  secundaria: 'bg-white text-ink border border-border hover:bg-background',
  perigo: 'bg-white text-status-cancelada border border-status-cancelada hover:bg-status-cancelada-bg',
};

export function Button({ variante = 'primaria', className = '', disabled, ...props }: Props) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium
        transition-colors focus-visible:outline focus-visible:outline-offset-2
        focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer
        ${classesPorVariante[variante]} ${className}`}
      disabled={disabled}
      {...props}
    />
  );
}