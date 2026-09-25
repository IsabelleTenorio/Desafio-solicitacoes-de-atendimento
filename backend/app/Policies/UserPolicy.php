<?php

namespace App\Policies;

use App\Enums\PerfilUsuario;
use App\Models\User;

class UserPolicy
{
    public function criar(User $user): bool
    {
        return $user->perfil === PerfilUsuario::ADMINISTRADOR;
    }
}