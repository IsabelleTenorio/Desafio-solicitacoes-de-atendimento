<?php

namespace App\Enums;

enum PrioridadeSolicitacao: string 
{
    case BAIXA = 'BAIXA';
    case MEDIA = 'MEDIA';
    case ALTA = 'ALTA';
    case URGENTE = 'URGENTE';

    public function exigeJustificativa(): bool 
    {
        return $this === self::URGENTE;
    }

    /** @return string[] */
    public static function valores(): array 
    {
        return array_map(fn (self $prioridade) => $prioridade->value, self::cases());
    }
}