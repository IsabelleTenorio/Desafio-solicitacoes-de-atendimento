<?php

namespace App\Enums;

enum CategoriaSolicitacao: string {
    case CONSULTA = 'CONSULTA';
    case EXAME = 'EXAME';
    case VACINACAO = 'VACINACAO';
    case OUTRO = 'OUTRO';

    /** @return string[] */
    public static function valores(): array {
        return array_map(fn (self $categoria) => $categoria->value, self::cases());
    }
}