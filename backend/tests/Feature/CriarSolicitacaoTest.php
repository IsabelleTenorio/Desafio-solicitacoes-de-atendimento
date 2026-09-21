<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CriarSolicitacaoTest extends TestCase
{
    use RefreshDatabase;

    public function test_cria_solicitacao_valida_com_status_inicial_recebida(): void
    {
        $usuario = User::factory()->create();

        $resposta = $this->actingAs($usuario, 'sanctum')->postJson('/api/v1/solicitacoes', [
            'nome_solicitante' => 'Maria Silva',
            'categoria' => 'CONSULTA',
            'prioridade' => 'MEDIA',
            'descricao' => 'Consulta de rotina para testes.',
        ]);

        $resposta->assertStatus(201)
            ->assertJsonPath('data.status', 'RECEBIDA')
            ->assertJsonStructure(['data' => ['id', 'protocolo']]);

        $this->assertDatabaseHas('solicitacoes', [
            'nome_solicitante' => 'Maria Silva',
            'status' => 'RECEBIDA',
        ]);
    }

    public function test_urgente_sem_justificativa_retorna_422(): void
    {
        $usuario = User::factory()->create();

        $resposta = $this->actingAs($usuario, 'sanctum')->postJson('/api/v1/solicitacoes', [
            'nome_solicitante' => 'João Santos',
            'categoria' => 'EXAME',
            'prioridade' => 'URGENTE',
            'descricao' => 'Exame urgente para testes.',
        ]);

        $resposta->assertStatus(422)->assertJsonValidationErrors(['justificativa_prioridade']);
    }

    public function test_requisicao_sem_autenticacao_retorna_401(): void
    {
        $resposta = $this->postJson('/api/v1/solicitacoes', []);

        $resposta->assertStatus(401);
    }
}