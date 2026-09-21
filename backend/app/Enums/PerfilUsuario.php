<?php

namespace App\Enums;

enum PerfilUsuario: string
{
    case OPERADOR = 'OPERADOR';
    case ADMINISTRADOR = 'ADMINISTRADOR';

    /** @return string[] */
    public static function valores(): array
    {
        return array_map(fn (self $perfil) => $perfil->value, self::cases());
    }
}