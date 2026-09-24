<?php

namespace Database\Seeders;

use App\Enums\StatusSolicitacao;
use App\Models\Solicitacao;
use Illuminate\Database\Seeder;

class SolicitacaoSeeder extends Seeder
{
    public function run(): void
    {
        if (Solicitacao::query()->exists()) {
            $this->command?->info('SolicitacaoSeeder: dados já existentes, seed ignorado.');

            return;
        }

        Solicitacao::factory()->count(5)->comStatus(StatusSolicitacao::RECEBIDA)->create();
        Solicitacao::factory()->count(4)->comStatus(StatusSolicitacao::EM_ANALISE)->create();
        Solicitacao::factory()->count(3)->comStatus(StatusSolicitacao::AGENDADA)->create();
        Solicitacao::factory()->count(3)->comStatus(StatusSolicitacao::CONCLUIDA)->create();
        Solicitacao::factory()->count(2)->comStatus(StatusSolicitacao::CANCELADA)->create();
        Solicitacao::factory()->count(3)->urgente()->create();
    }
}
