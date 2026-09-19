<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('solicitacoes', function (Blueprint $table) {
            $table->id();
            $table->string('protocolo', 30)->unique();
            $table->string('nome_solicitante');
            $table->string('categoria', 20);
            $table->string('prioridade', 20);
            $table->string('status', 20);
            $table->text('descricao');
            $table->text('justificativa_prioridade')->nullable();
            $table->timestamps(); // created_at / updated_at -> expostos como
                                  // data_criacao / data_atualizacao no Resource

            $table->index(['status', 'prioridade']);
            $table->index('categoria');
        });

        DB::statement("
            ALTER TABLE solicitacoes
            ADD CONSTRAINT chk_categoria
            CHECK (categoria IN ('CONSULTA','EXAME','VACINACAO','OUTRO'))
        ");

        DB::statement("
            ALTER TABLE solicitacoes
            ADD CONSTRAINT chk_prioridade
            CHECK (prioridade IN ('BAIXA','MEDIA','ALTA','URGENTE'))
        ");

        DB::statement("
            ALTER TABLE solicitacoes
            ADD CONSTRAINT chk_status
            CHECK (status IN ('RECEBIDA','EM_ANALISE','AGENDADA','CONCLUIDA','CANCELADA'))
        ");

        DB::statement("
            ALTER TABLE solicitacoes
            ADD CONSTRAINT chk_justificativa_urgente
            CHECK (
                prioridade <> 'URGENTE'
                OR (justificativa_prioridade IS NOT NULL AND length(trim(justificativa_prioridade)) > 0)
            )
        ");
    }

    public function down(): void
    {
        Schema::dropIfExists('solicitacoes');
    }
};