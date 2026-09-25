<?php

namespace App\Http\Requests;

use App\Enums\PerfilUsuario;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        $autorizado = (bool) $this->user()?->can('criar', User::class);

        if (! $autorizado) {
            Log::warning('users.cadastro_negado', [
                'user_id' => $this->user()?->id,
            ]);
        }

        return $autorizado;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'perfil' => ['required', Rule::in(PerfilUsuario::valores())],
        ];
    }
}