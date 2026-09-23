<?php

use App\Http\Middleware\AssignRequestId;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->api(prepend: [
            AssignRequestId::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->shouldRenderJsonWhen(function (Request $request) {
            return $request->is('api/*') || $request->expectsJson();
        });

        /**
         * Falha de integração com o banco (conexão recusada, timeout, etc.): loga o erro para diagnóstico via request_id, mas devolve ao
         * consumidor da API apenas uma mensagem genérica.
         */
        $exceptions->render(function (QueryException $e, Request $request) {
            if ($request->is('api/*') || $request->expectsJson()) {
                Log::error('integracao.banco_indisponivel', [
                    'sqlstate' => $e->getCode(),
                ]);

                return response()->json([
                    'message' => 'Serviço temporariamente indisponível. Tente novamente em instantes.',
                ], 503);
            }
        });
    })->create();