<?php

namespace App\Http\Requests;

use App\Enums\StatusSolicitacao;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AtualizarStatusRequest extends FormRequest
{
    /** Apenas ADMINISTRADORES podem mudar o status de uma solicitação para CANCELADA */
    public function authorize(): bool
    {
        if ($this->input('status') === StatusSolicitacao::CANCELADA->value) {
            return $this->user()?->can('cancelar', $this->route('solicitacao')) ?? false;
        }

        return true;
    }

    public function rules(): array
    {
        return [
            'status' => ['required', Rule::in(StatusSolicitacao::valores())],
        ];
    }
}