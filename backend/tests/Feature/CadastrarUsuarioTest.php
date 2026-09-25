<?php

namespace Tests\Feature;

use App\Enums\PerfilUsuario;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class CadastrarUsuarioTest extends TestCase
{
    use RefreshDatabase;

    private function payload(array $sobrescritas = []): array
    {
        return array_merge([
            'name' => 'Nova Pessoa Operadora',
            'email' => 'nova.pessoa@example.com',
            'password' => 'senha12345',
            'password_confirmation' => 'senha12345',
            'perfil' => 'OPERADOR',
        ], $sobrescritas);
    }

    public function test_administrador_pode_cadastrar_usuario(): void
    {
        $administrador = User::factory()->create(['perfil' => PerfilUsuario::ADMINISTRADOR]);

        $resposta = $this->actingAs($administrador, 'sanctum')
            ->postJson('/api/v1/usuarios', $this->payload());

        $resposta->assertStatus(201)->assertJsonPath('data.email', 'nova.pessoa@example.com');

        $this->assertDatabaseHas('users', [
            'email' => 'nova.pessoa@example.com',
            'perfil' => 'OPERADOR',
        ]);

        $usuarioCriado = User::query()->where('email', 'nova.pessoa@example.com')->firstOrFail();
        $this->assertTrue(Hash::check('senha12345', $usuarioCriado->password));
    }

    public function test_operador_nao_pode_cadastrar_usuario(): void
    {
        $operador = User::factory()->create(['perfil' => PerfilUsuario::OPERADOR]);

        $resposta = $this->actingAs($operador, 'sanctum')
            ->postJson('/api/v1/usuarios', $this->payload());

        $resposta->assertStatus(403);
        $this->assertDatabaseMissing('users', ['email' => 'nova.pessoa@example.com']);
    }

    public function test_requisicao_sem_autenticacao_retorna_401(): void
    {
        $resposta = $this->postJson('/api/v1/usuarios', $this->payload());

        $resposta->assertStatus(401);
    }

    public function test_email_duplicado_retorna_422(): void
    {
        $administrador = User::factory()->create(['perfil' => PerfilUsuario::ADMINISTRADOR]);
        $existente = User::factory()->create();

        $resposta = $this->actingAs($administrador, 'sanctum')
            ->postJson('/api/v1/usuarios', $this->payload(['email' => $existente->email]));

        $resposta->assertStatus(422)->assertJsonValidationErrors('email');
    }

    public function test_senha_e_confirmacao_diferentes_retorna_422(): void
    {
        $administrador = User::factory()->create(['perfil' => PerfilUsuario::ADMINISTRADOR]);

        $resposta = $this->actingAs($administrador, 'sanctum')
            ->postJson('/api/v1/usuarios', $this->payload(['password_confirmation' => 'outra-senha']));

        $resposta->assertStatus(422)->assertJsonValidationErrors('password');
    }
}