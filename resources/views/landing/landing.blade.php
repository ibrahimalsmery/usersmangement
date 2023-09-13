@extends('layouts.app')

@section('content')
    <main class="p-5">
        <a class="btn btn-primary" href="{{ route('dashboard.index') }}">Dashboard</a>
        <a class="btn btn-primary" href="{{ route('login.index') }}"">Login</a>
        <a class="btn btn-primary" href="{{ route('register.index') }}">Register</a>
    </main>
@endsection
