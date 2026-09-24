<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Throwable;

class HealthController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $databaseOk = true;

        try {
            DB::connection()->getPdo();
        } catch (Throwable) {
            $databaseOk = false;
        }

        return response()->json([
            'status' => $databaseOk ? 'ok' : 'fail',
            'checks' => [
                'database' => $databaseOk ? 'ok' : 'fail',
            ],
        ], $databaseOk ? 200 : 503);
    }
}
