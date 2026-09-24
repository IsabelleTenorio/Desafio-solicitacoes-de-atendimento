<?php

use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

/** Serve o docs/openapi.yaml (raiz do repositório) sem duplicar o arquivo dentro de public/ */
Route::get('/openapi.yaml', function () {
    $caminho = base_path('../docs/openapi.yaml');

    abort_unless(file_exists($caminho), 404);

    return Response::file($caminho, [
        'Content-Type' => 'application/yaml',
    ]);
});
