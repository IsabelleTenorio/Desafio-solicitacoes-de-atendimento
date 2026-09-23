<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credenciais = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (! Auth::attempt($credenciais)) {
            Log::warning('auth.login_falha', [
                'email' => $credenciais['email'],
            ]);

            throw ValidationException::withMessages([
                'email' => ['Credenciais inválidas.'],
            ]);
        }

        $usuario = Auth::user();
        $token = $usuario->createToken('api')->plainTextToken;

        Log::info('auth.login_sucesso', [
            'user_id' => $usuario->id,
            'perfil' => $usuario->perfil->value,
        ]);

        return response()->json([
            'token' => $token,
            'usuario' => [
                'id' => $usuario->id,
                'name' => $usuario->name,
                'email' => $usuario->email,
                'perfil' => $usuario->perfil->value,
            ],
        ]);
    }

    public function logout(Request $request)
    {
        $userId = $request->user()->id;
        $request->user()->currentAccessToken()->delete();

        Log::info('auth.logout', ['user_id' => $userId]);

        return response()->json(null, 204);
    }
}