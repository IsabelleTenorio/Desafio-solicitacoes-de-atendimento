import type { SelectHTMLAttributes } from 'react';

interface Opcao {
  value: string;
  label: string;
}

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  opcoes: Opcao[];
  opcaoVazia?: string;
}

let contador = 0;

export function Select({ label, opcoes, opcaoVazia, id, ...props }: Props) {
  const selectId = id ?? `select-${(contador += 1)}`;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={selectId} className="text-sm font-medium text-ink-soft">
        {label}
      </label>
      <select
        id={selectId}
        className="rounded-md border border-border bg-white px-3 py-2 text-sm text-ink
          focus-visible:outline focus-visible:outline-offset-1 focus-visible:outline-primary cursor-pointer"
        {...props}
      >
        {opcaoVazia !== undefined && <option value="">{opcaoVazia}</option>}
        {opcoes.map((opcao) => (
          <option key={opcao.value} value={opcao.value}>
            {opcao.label}
          </option>
        ))}
      </select>
    </div>
  );
}