<?php

namespace Database\Factories;

use App\Enums\CategoriaSolicitacao;
use App\Enums\PrioridadeSolicitacao;
use App\Enums\StatusSolicitacao;
use App\Models\Solicitacao;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class SolicitacaoFactory extends Factory
{
    protected $model = Solicitacao::class;

    public function definition(): array
    {
        $prioridade = fake()->randomElement(PrioridadeSolicitacao::cases());

        return [
            'protocolo' => $this->gerarProtocolo(),
            'nome_solicitante' => fake()->name(),
            'categoria' => fake()->randomElement(CategoriaSolicitacao::cases()),
            'prioridade' => $prioridade,
            'status' => StatusSolicitacao::RECEBIDA,
            'descricao' => fake()->sentence(12),
            'justificativa_prioridade' => $prioridade->exigeJustificativa()
                ? fake()->sentence(15)
                : null,
        ];
    }

    /** Estado de conveniência para testes que precisam de uma solicitação já em um status específico do fluxo. */
    public function comStatus(StatusSolicitacao $status): static
    {
        return $this->state(fn () => ['status' => $status]);
    }

    public function urgente(): static
    {
        return $this->state(fn () => [
            'prioridade' => PrioridadeSolicitacao::URGENTE,
            'justificativa_prioridade' => fake()->sentence(15),
        ]);
    }

    private function gerarProtocolo(): string
    {
        return sprintf('SOL-%s-%s', date('Y'), strtoupper(Str::random(8)));
    }
}