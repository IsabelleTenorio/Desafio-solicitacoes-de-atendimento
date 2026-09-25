<?php

namespace Tests\Feature;

use App\Models\Solicitacao;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ResumoSolicitacoesTest extends TestCase
{
    use RefreshDatabase;

    public function test_resumo_conta_corretamente_por_status_e_prioridade(): void
    {
        $usuario = User::factory()->create();

        Solicitacao::factory()->count(3)->create(['status' => 'RECEBIDA', 'prioridade' => 'MEDIA']);
        Solicitacao::factory()->count(2)->create(['status' => 'CONCLUIDA', 'prioridade' => 'ALTA']);
        Solicitacao::factory()->create(['status' => 'RECEBIDA', 'prioridade' => 'URGENTE', 'justificativa_prioridade' => 'Caso grave.']);

        $resposta = $this->actingAs($usuario, 'sanctum')->getJson('/api/v1/solicitacoes/resumo');

        $resposta->assertStatus(200)
            ->assertJsonPath('data.por_status.RECEBIDA', 4)
            ->assertJsonPath('data.por_status.CONCLUIDA', 2)
            ->assertJsonPath('data.por_status.EM_ANALISE', 0)
            ->assertJsonPath('data.por_status.AGENDADA', 0)
            ->assertJsonPath('data.por_status.CANCELADA', 0)
            ->assertJsonPath('data.por_prioridade.MEDIA', 3)
            ->assertJsonPath('data.por_prioridade.ALTA', 2)
            ->assertJsonPath('data.por_prioridade.URGENTE', 1)
            ->assertJsonPath('data.por_prioridade.BAIXA', 0);
    }

    public function test_requisicao_sem_autenticacao_retorna_401(): void
    {
        $resposta = $this->getJson('/api/v1/solicitacoes/resumo');

        $resposta->assertStatus(401);
    }
}