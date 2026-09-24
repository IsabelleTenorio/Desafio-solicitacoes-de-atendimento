<?php

namespace App\Exceptions;

use App\Enums\StatusSolicitacao;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TransicaoStatusInvalidaException extends Exception
{
    public function __construct(
        private readonly StatusSolicitacao $atual,
        private readonly StatusSolicitacao $destino,
        private readonly ?int $solicitacaoId = null,
    ) {
        parent::__construct(
            sprintf('Não é possível transicionar de %s para %s.', $atual->value, $destino->value)
        );
    }

    public function render(Request $request): JsonResponse
    {
        Log::warning('solicitacao.transicao_invalida', [
            'solicitacao_id' => $this->solicitacaoId,
            'de' => $this->atual->value,
            'para' => $this->destino->value,
        ]);

        return response()->json([
            'message' => $this->getMessage(),
            'errors' => [
                'status' => [$this->getMessage()],
            ],
        ], 409);
    }
}
