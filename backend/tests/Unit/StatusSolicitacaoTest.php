<?php

namespace Tests\Unit;

use App\Enums\StatusSolicitacao;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;

class StatusSolicitacaoTest extends TestCase
{
    public function test_recebida_permite_apenas_em_analise_e_cancelada(): void
    {
        $status = StatusSolicitacao::RECEBIDA;

        $this->assertTrue($status->podeTransicionarPara(StatusSolicitacao::EM_ANALISE));
        $this->assertTrue($status->podeTransicionarPara(StatusSolicitacao::CANCELADA));
        $this->assertFalse($status->podeTransicionarPara(StatusSolicitacao::AGENDADA));
        $this->assertFalse($status->podeTransicionarPara(StatusSolicitacao::CONCLUIDA));
    }

    public function test_em_analise_permite_apenas_agendada_e_cancelada(): void
    {
        $status = StatusSolicitacao::EM_ANALISE;

        $this->assertTrue($status->podeTransicionarPara(StatusSolicitacao::AGENDADA));
        $this->assertTrue($status->podeTransicionarPara(StatusSolicitacao::CANCELADA));
        $this->assertFalse($status->podeTransicionarPara(StatusSolicitacao::RECEBIDA));
        $this->assertFalse($status->podeTransicionarPara(StatusSolicitacao::CONCLUIDA));
    }

    public function test_agendada_permite_apenas_concluida_e_cancelada(): void
    {
        $status = StatusSolicitacao::AGENDADA;

        $this->assertTrue($status->podeTransicionarPara(StatusSolicitacao::CONCLUIDA));
        $this->assertTrue($status->podeTransicionarPara(StatusSolicitacao::CANCELADA));
        $this->assertFalse($status->podeTransicionarPara(StatusSolicitacao::EM_ANALISE));
        $this->assertFalse($status->podeTransicionarPara(StatusSolicitacao::RECEBIDA));
    }

    #[DataProvider('statusFinais')]
    public function test_status_finais_nao_permitem_nenhuma_transicao(StatusSolicitacao $status): void
    {
        $this->assertTrue($status->ehFinal());
        $this->assertSame([], $status->proximosPermitidos());

        foreach (StatusSolicitacao::cases() as $destino) {
            $this->assertFalse($status->podeTransicionarPara($destino));
        }
    }

    /** @return array<string, array{StatusSolicitacao}> */
    public static function statusFinais(): array
    {
        return [
            'concluida' => [StatusSolicitacao::CONCLUIDA],
            'cancelada' => [StatusSolicitacao::CANCELADA],
        ];
    }

    public function test_valores_retorna_todas_as_strings_do_enum(): void
    {
        $this->assertSame(
            ['RECEBIDA', 'EM_ANALISE', 'AGENDADA', 'CONCLUIDA', 'CANCELADA'],
            StatusSolicitacao::valores()
        );
    }
}
