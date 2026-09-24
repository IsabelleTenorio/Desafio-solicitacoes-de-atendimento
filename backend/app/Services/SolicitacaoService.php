<?php

namespace App\Services;

use App\Enums\StatusSolicitacao;
use App\Exceptions\TransicaoStatusInvalidaException;
use App\Models\Solicitacao;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class SolicitacaoService
{
    /** Cria uma solicitação com protocolo único e status inicial RECEBIDA */
    public function criar(array $dados): Solicitacao
    {
        $solicitacao = DB::transaction(function () use ($dados) {
            $tentativas = 0;

            do {
                $protocolo = $this->gerarProtocolo();
                $tentativas++;
            } while (
                Solicitacao::where('protocolo', $protocolo)->exists()
                && $tentativas < 5
            );

            return Solicitacao::create([
                ...$dados,
                'protocolo' => $protocolo,
                'status' => StatusSolicitacao::RECEBIDA,
            ]);
        });

        Log::info('solicitacao.criada', [
            'solicitacao_id' => $solicitacao->id,
            'protocolo' => $solicitacao->protocolo,
            'categoria' => $solicitacao->categoria->value,
            'prioridade' => $solicitacao->prioridade->value,
        ]);

        return $solicitacao;
    }

    /** Único ponto do sistema que altera o status de uma solicitação */
    public function atualizarStatus(Solicitacao $solicitacao, StatusSolicitacao $novoStatus): Solicitacao
    {
        $statusAtual = $solicitacao->status;

        if (! $statusAtual->podeTransicionarPara($novoStatus)) {
            throw new TransicaoStatusInvalidaException($statusAtual, $novoStatus, $solicitacao->id);
        }

        $solicitacao->update(['status' => $novoStatus]);

        Log::info('solicitacao.status_atualizado', [
            'solicitacao_id' => $solicitacao->id,
            'protocolo' => $solicitacao->protocolo,
            'de' => $statusAtual->value,
            'para' => $novoStatus->value,
        ]);

        return $solicitacao->fresh();
    }

    private function gerarProtocolo(): string
    {
        return sprintf('SOL-%s-%s', date('Y'), strtoupper(Str::random(8)));
    }
} 