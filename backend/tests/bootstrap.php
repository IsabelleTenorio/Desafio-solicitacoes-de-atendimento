<?php

$variaveisDeTeste = [
    'APP_ENV' => 'testing',
    'DB_CONNECTION' => 'pgsql',
    'DB_HOST' => 'db',
    'DB_PORT' => '5432',
    'DB_DATABASE' => 'vlab_solicitacoes_test',
    'DB_USERNAME' => 'vlab',
    'DB_PASSWORD' => 'vlab_secret_fake',
];

foreach ($variaveisDeTeste as $nome => $valor) {
    putenv("{$nome}={$valor}");
    $_ENV[$nome] = $valor;
    $_SERVER[$nome] = $valor;
}

require __DIR__.'/../vendor/autoload.php';