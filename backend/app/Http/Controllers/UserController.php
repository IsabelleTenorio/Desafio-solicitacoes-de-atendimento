<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function store(StoreUserRequest $request)
    {
        $usuario = User::create([
            'name' => $request->validated('name'),
            'email' => $request->validated('email'),
            'password' => Hash::make($request->validated('password')),
            'perfil' => $request->validated('perfil'),
        ]);

        Log::info('users.cadastrado', [
            'user_id' => $usuario->id,
            'criado_por' => $request->user()->id,
            'perfil' => $usuario->perfil->value,
        ]);

        return (new UserResource($usuario))->response()->setStatusCode(201);
    }
}