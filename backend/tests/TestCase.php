<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use RuntimeException;

abstract class TestCase extends BaseTestCase
{
    public function createApplication()
    {
        $app = parent::createApplication();

        $banco = $app['config']->get('database.connections.pgsql.database');

        if (! str_contains((string) $banco, '_test')) {
            throw new RuntimeException(
                "Os testes tentaram rodar contra o banco \"{$banco}\", que não parece ".
                'ser um banco de teste (o nome não contém "_test"). Abortando antes de '.
                'qualquer migration, para não apagar dados reais. Verifique DB_DATABASE '.
                'no ambiente em que os testes estão rodando. '.
                '[diagnóstico: getenv(DB_DATABASE)='.var_export(getenv('DB_DATABASE'), true).
                ', $_ENV[DB_DATABASE]='.var_export($_ENV['DB_DATABASE'] ?? null, true).
                ', $_SERVER[DB_DATABASE]='.var_export($_SERVER['DB_DATABASE'] ?? null, true).']'
            );
        }

        return $app;
    }
}
