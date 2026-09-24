<?php

namespace App\Policies;

use App\Enums\PerfilUsuario;
use App\Models\Solicitacao;
use App\Models\User;

class SolicitacaoPolicy
{
    public function cancelar(User $user, Solicitacao $solicitacao): bool
    {
        return $user->perfil === PerfilUsuario::ADMINISTRADOR;
    }
}
