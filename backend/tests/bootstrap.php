<?php

$variaveisDeTeste = [
    'APP_ENV' => 'testing',
    'DB_DATABASE' => 'vlab_solicitacoes_test',
];

foreach ($variaveisDeTeste as $nome => $valor) {
    putenv("{$nome}={$valor}");
    $_ENV[$nome] = $valor;
    $_SERVER[$nome] = $valor;
}

require __DIR__.'/../vendor/autoload.php';