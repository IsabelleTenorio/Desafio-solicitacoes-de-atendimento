<?php

namespace App\Http\Requests;

use App\Enums\CategoriaSolicitacao;
use App\Enums\PrioridadeSolicitacao;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSolicitacaoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // qualquer usuário autenticado pode criar
    }

    public function rules(): array
    {
        return [
            'nome_solicitante' => ['required', 'string', 'min:3', 'max:150'],
            'categoria' => ['required', Rule::in(CategoriaSolicitacao::valores())],
            'prioridade' => ['required', Rule::in(PrioridadeSolicitacao::valores())],
            'descricao' => ['required', 'string', 'min:10', 'max:2000'],
            'justificativa_prioridade' => [
                Rule::requiredIf(fn () => $this->input('prioridade') === PrioridadeSolicitacao::URGENTE->value),
                'nullable',
                'string',
                'min:10',
                'max:1000',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'justificativa_prioridade.required' => 'A justificativa de prioridade é obrigatória quando a prioridade é URGENTE.',
        ];
    }
}
