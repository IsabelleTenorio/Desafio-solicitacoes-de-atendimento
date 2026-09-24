<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('perfil', 20)->default('OPERADOR')->after('email');
        });

        DB::statement("
            ALTER TABLE users
            ADD CONSTRAINT chk_perfil
            CHECK (perfil IN ('OPERADOR','ADMINISTRADOR'))
        ");
    }

    public function down(): void
    {
        DB::statement('ALTER TABLE users DROP CONSTRAINT IF EXISTS chk_perfil');

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('perfil');
        });
    }
};
