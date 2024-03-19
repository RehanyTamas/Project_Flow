<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function register(RegisterRequest $request){

        $hashPassword = Hash::make($request->input("password"));

        $user = User::create([
            'name' => $request->input('username'),
            'company' => $request->input('company'),
            'email' => $request->input('email'),
            'password' => $hashPassword,
        ]);


        return \response($user,Response::HTTP_CREATED);
    }

    public function login(LoginRequest $request){

        $credentials = $request->only('email', 'password');
        $user = User::where('email', $credentials['email'])->first();

        if(!$user || !Hash::check($credentials['password'], $user->password)){
            return response([
                'message' => 'Bad credentials',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $token = $user->createToken('AuthToken')->plainTextToken;

        $response = response()->json(['token' => $token], 200);
        $response->cookie('loginToken', $token, config('sanctum.lifetime'), null, null, false, true); // HTTP-only cookie
        return $response;

    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        // Invalidate the current token, if any
        $request->user()->currentAccessToken()->delete();

        // Create a response with a cookie that expires immediately
        $response = new Response('Logged out successfully');
        $cookie = Cookie::forget('loginToken');
        return $response->withCookie($cookie);
    }
}
