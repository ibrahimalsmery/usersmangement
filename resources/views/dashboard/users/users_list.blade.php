@extends('layouts.dashboard.dashboard')
@section('dashboard_content')
    <div class="card">
        <div class="card-header">
            <div class="card-title">
                <h2>Users list</h2>
            </div>
        </div>
        <div class="card-body">
            <div id="users_list_table"></div>
            @vite('resources/js/pages/users.jsx')
        </div>
    </div>
@endsection
