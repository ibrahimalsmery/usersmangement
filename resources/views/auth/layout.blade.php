@extends('layouts.app')
@section('content')
    <div class="container-xxl">
        <div class="authentication-wrapper authentication-basic container-p-y">
            <div class="authentication-inner">
                @yield('authlayoutcontent')
            </div>
        </div>
    </div>
@endsection
