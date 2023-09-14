@extends('layouts.app')

@section('content')
    <main class="p-5">
        <a class="btn btn-primary" href="{{ route('dashboard.view') }}">Dashboard</a>
        <a class="btn btn-primary" href="{{ route('login.view') }}">Login</a>
        <a class="btn btn-primary" href="{{ route('register.view') }}">Register</a>
    </main>
@endsection
