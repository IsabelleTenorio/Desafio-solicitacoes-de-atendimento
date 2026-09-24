<?php

namespace App\Http\Requests;

use App\Enums\CategoriaSolicitacao;
use App\Enums\PrioridadeSolicitacao;
use App\Enums\StatusSolicitacao;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ListarSolicitacoesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'status' => ['sometimes', Rule::in(StatusSolicitacao::valores())],
            'categoria' => ['sometimes', Rule::in(CategoriaSolicitacao::valores())],
            'prioridade' => ['sometimes', Rule::in(PrioridadeSolicitacao::valores())],
            'per_page' => ['sometimes', 'integer', 'min:1', 'max:100'],
            'page' => ['sometimes', 'integer', 'min:1'],
        ];
    }
}
