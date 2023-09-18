@extends('dashboard.dashboard')
@section('dashboard_content')
    <div class="card mb-4">
        <h5 class="card-header">Create new user</h5>
        <div class="card-body">
            @include('parts.alert')
            <div class="mb-3">
                <a href="{{ route('dashboard.users.list.view') }}" class=""><i class='bx bx-arrow-back'></i> back</a>
            </div>
            <form action="{{ route('dashboard.users.store') }}" method="post">
                @csrf
                <div class="form-floating mb-2">
                    <input type="text" name="name" value="{{ old('name') }}"
                        class="form-control @error('name')
                        is-invalid
                    @enderror"
                        id="name" placeholder="John Doe">
                    <label for="name">Name</label>
                    @error('name')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <p>Change email</p>
                <div class="form-floating mb-2">
                    <input type="text" value="{{ old('email') }}"
                        class="form-control @error('email')
                    is-invalid
                @enderror"
                        id="email" name="email" placeholder="exmaple@gmail.com">
                    <label for="email">Email</label>
                    @error('email')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <p>Change password</p>
                <div class="form-floating mb-2">
                    <input type="password" name="password"
                        class="form-control @error('password')
                        is-invalid
                    @enderror"
                        id="password" placeholder="3#sAw!sz">
                    <label for="password">Password</label>
                    @error('password')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <button type="submit" name="update" value="updatepassword" class="btn btn-outline-primary">save</button>
            </form>
        </div>
    </div>
@endsection
