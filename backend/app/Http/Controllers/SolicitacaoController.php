<?php

namespace App\Http\Controllers;

use App\Enums\StatusSolicitacao;
use App\Http\Controllers\Controller;
use App\Http\Requests\AtualizarStatusRequest;
use App\Http\Requests\ListarSolicitacoesRequest;
use App\Http\Requests\StoreSolicitacaoRequest;
use App\Http\Resources\SolicitacaoResource;
use App\Models\Solicitacao;
use App\Services\SolicitacaoService;

class SolicitacaoController extends Controller
{
    public function __construct(private readonly SolicitacaoService $service)
    {
    }

    public function index(ListarSolicitacoesRequest $request)
    {
        $query = Solicitacao::query();

        foreach (['status', 'categoria', 'prioridade'] as $filtro) {
            if ($request->filled($filtro)) {
                $query->where($filtro, $request->string($filtro));
            }
        }

        $solicitacoes = $query
            ->orderByDesc('created_at')
            ->paginate($request->integer('per_page', 15));

        return SolicitacaoResource::collection($solicitacoes);
    }

    public function store(StoreSolicitacaoRequest $request)
    {
        $solicitacao = $this->service->criar($request->validated());

        return (new SolicitacaoResource($solicitacao))
            ->response()
            ->setStatusCode(201);
    }

    public function show(Solicitacao $solicitacao)
    {
        return new SolicitacaoResource($solicitacao);
    }

    public function atualizarStatus(AtualizarStatusRequest $request, Solicitacao $solicitacao)
    {
        $novoStatus = StatusSolicitacao::from($request->validated('status'));

        $solicitacao = $this->service->atualizarStatus($solicitacao, $novoStatus);

        return new SolicitacaoResource($solicitacao);
    }
}