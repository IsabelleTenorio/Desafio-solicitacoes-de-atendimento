<?php

namespace Database\Seeders;

use App\Enums\PerfilUsuario;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@vlab.local'],
            [
                'name' => 'Administrador Fictício',
                'password' => Hash::make('senha123'),
                'perfil' => PerfilUsuario::ADMINISTRADOR,
            ]
        );

        User::updateOrCreate(
            ['email' => 'operador@vlab.local'],
            [
                'name' => 'Operador Fictício',
                'password' => Hash::make('senha123'),
                'perfil' => PerfilUsuario::OPERADOR,
            ]
        );
    }
}