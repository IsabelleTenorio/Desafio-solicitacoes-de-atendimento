<?php

namespace App\Http\Requests;

use App\Enums\StatusSolicitacao;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class AtualizarStatusRequest extends FormRequest
{
    /** Apenas ADMINISTRADORES podem mudar o status de uma solicitação para CANCELADA */
    public function authorize(): bool
    {
        if ($this->input('status') !== StatusSolicitacao::CANCELADA->value) {
            return true;
        }

        $pode = $this->user()?->can('cancelar', $this->route('solicitacao')) ?? false;

        if (! $pode) {
            Log::warning('solicitacao.cancelamento_negado', [
                'user_id' => $this->user()?->id,
                'solicitacao_id' => $this->route('solicitacao')?->id,
            ]);
        }

        return $pode;
    }

    public function rules(): array
    {
        return [
            'status' => ['required', Rule::in(StatusSolicitacao::valores())],
        ];
    }
}
