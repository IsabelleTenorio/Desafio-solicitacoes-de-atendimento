<?php

namespace Tests\Feature;

use App\Enums\PerfilUsuario;
use App\Enums\StatusSolicitacao;
use App\Models\Solicitacao;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AtualizarStatusTest extends TestCase
{
    use RefreshDatabase;

    public function test_transicao_valida_atualiza_o_status(): void
    {
        $usuario = User::factory()->create(['perfil' => PerfilUsuario::OPERADOR]);
        $solicitacao = Solicitacao::factory()->comStatus(StatusSolicitacao::RECEBIDA)->create();

        $resposta = $this->actingAs($usuario, 'sanctum')
            ->patchJson("/api/v1/solicitacoes/{$solicitacao->id}/status", ['status' => 'EM_ANALISE']);

        $resposta->assertStatus(200)->assertJsonPath('data.status', 'EM_ANALISE');
    }

    public function test_transicao_invalida_retorna_409(): void
    {
        $usuario = User::factory()->create(['perfil' => PerfilUsuario::ADMINISTRADOR]);
        $solicitacao = Solicitacao::factory()->comStatus(StatusSolicitacao::CONCLUIDA)->create();

        $resposta = $this->actingAs($usuario, 'sanctum')
            ->patchJson("/api/v1/solicitacoes/{$solicitacao->id}/status", ['status' => 'EM_ANALISE']);

        $resposta->assertStatus(409);

        $this->assertDatabaseHas('solicitacoes', [
            'id' => $solicitacao->id,
            'status' => 'CONCLUIDA',
        ]);
    }

    public function test_operador_nao_pode_cancelar(): void
    {
        $usuario = User::factory()->create(['perfil' => PerfilUsuario::OPERADOR]);
        $solicitacao = Solicitacao::factory()->comStatus(StatusSolicitacao::RECEBIDA)->create();

        $resposta = $this->actingAs($usuario, 'sanctum')
            ->patchJson("/api/v1/solicitacoes/{$solicitacao->id}/status", ['status' => 'CANCELADA']);

        $resposta->assertStatus(403);
    }

    public function test_administrador_pode_cancelar(): void
    {
        $usuario = User::factory()->create(['perfil' => PerfilUsuario::ADMINISTRADOR]);
        $solicitacao = Solicitacao::factory()->comStatus(StatusSolicitacao::RECEBIDA)->create();

        $resposta = $this->actingAs($usuario, 'sanctum')
            ->patchJson("/api/v1/solicitacoes/{$solicitacao->id}/status", ['status' => 'CANCELADA']);

        $resposta->assertStatus(200)->assertJsonPath('data.status', 'CANCELADA');
    }
}