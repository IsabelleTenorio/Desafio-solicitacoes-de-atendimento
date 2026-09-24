<?php

namespace App\Enums;

enum StatusSolicitacao: string
{
    case RECEBIDA = 'RECEBIDA';
    case EM_ANALISE = 'EM_ANALISE';
    case AGENDADA = 'AGENDADA';
    case CONCLUIDA = 'CONCLUIDA';
    case CANCELADA = 'CANCELADA';

    /**
     * Fonte única de verdade para o fluxo de status descrito no edital (item 2.3-B).
     * Qualquer regra de transição do sistema deve consultar este método,
     * nunca reimplementar a tabela em outro lugar.
     *
     * @return self[]
     */
    public function proximosPermitidos(): array
    {
        return match ($this) {
            self::RECEBIDA => [self::EM_ANALISE, self::CANCELADA],
            self::EM_ANALISE => [self::AGENDADA, self::CANCELADA],
            self::AGENDADA => [self::CONCLUIDA, self::CANCELADA],
            self::CONCLUIDA, self::CANCELADA => [],
        };
    }

    public function podeTransicionarPara(self $destino): bool
    {
        return in_array($destino, $this->proximosPermitidos(), true);
    }

    public function ehFinal(): bool
    {
        return $this->proximosPermitidos() === [];
    }

    /** @return string[] */
    public static function valores(): array
    {
        return array_map(fn (self $status) => $status->value, self::cases());
    }
}
