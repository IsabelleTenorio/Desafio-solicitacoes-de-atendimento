<?php

namespace App\Logging;

use Monolog\Formatter\JsonFormatter;

/**
 * "Tap" do canal de log padrão (config/logging.php): troca o formatter de cada handler para JSON,
 * sem alterar destino (arquivo) nem nível dos logs.
 */
class JsonLogFormatter
{
    public function __invoke($logger): void
    {
        foreach ($logger->getHandlers() as $handler) {
            $handler->setFormatter(new JsonFormatter);
        }
    }
}
