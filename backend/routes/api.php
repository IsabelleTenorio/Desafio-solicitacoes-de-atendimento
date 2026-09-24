<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HealthController;
use App\Http\Controllers\SolicitacaoController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('health', HealthController::class);

    Route::post('login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);

        Route::get('solicitacoes', [SolicitacaoController::class, 'index']);
        Route::post('solicitacoes', [SolicitacaoController::class, 'store']);
        Route::get('solicitacoes/{solicitacao}', [SolicitacaoController::class, 'show']);
        Route::patch('solicitacoes/{solicitacao}/status', [SolicitacaoController::class, 'atualizarStatus']);
    });
});
