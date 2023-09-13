<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\View\View;

class AuthController extends Controller
{
    //
    function register_view(): View
    {
        return view('auth.register');
    }

    function register(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'string|min:1|required',
            'email' => "required|email|unique:users,email",
            "password" => "required|alpha_num|min:6",
            "terms" => 'required'
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            $request->session()->regenerate();
            return to_route('dashboard.index');
        }

        return to_route('register.index')->withErrors(['msg' => "Somthing Wrong!."]);
    }

    function login_view(): View
    {
        return view('auth.login');
    }

    function login(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => "required|email",
            "password" => "required",
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            $request->session()->regenerate();
            return to_route('dashboard.index');
        }

        return to_route('login.index')->withErrors(['msg' => "User not exists or password is incorrect."]);
    }

    function logout(): RedirectResponse
    {
        Auth::logout();

        return to_route('landing');
    }
}
