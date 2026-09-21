<?php

namespace App\Exceptions;

use App\Enums\StatusSolicitacao;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TransicaoStatusInvalidaException extends Exception
{
    public function __construct(
        private readonly StatusSolicitacao $atual,
        private readonly StatusSolicitacao $destino,
    ) {
        parent::__construct(
            sprintf('Não é possível transicionar de %s para %s.', $atual->value, $destino->value)
        );
    }

    public function render(Request $request): JsonResponse
    {
        return response()->json([
            'message' => $this->getMessage(),
            'errors' => [
                'status' => [$this->getMessage()],
            ],
        ], 409);
    }
}