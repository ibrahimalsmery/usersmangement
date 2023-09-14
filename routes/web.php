<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MainController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

Route::get('/', [MainController::class, 'landing_view'])->name('landing.view');

Route::get('/login', [AuthController::class, 'login_view'])->name('login.view');

Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::get('/register', [AuthController::class, 'register_view'])->name('register.view');

Route::post('/register', [AuthController::class, 'register'])->name('register');

Route::get('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');

Route::group(['prefix' => '/dashboard', 'as' => 'dashboard.', 'middleware' => ['auth']], function () {
    //  /dashboard
    Route::get('/', [DashboardController::class, 'dashboard_index_view'])->name('view');
    // /dashboard/users
    Route::group(['prefix' => '/users', 'as' => 'users.'], function () {
        // /dashboard/users/list
        Route::get('/list', [UsersController::class, 'users_list_view'])->name('list.view');
        // /dashboard/users/list/data
        Route::post('/list/data', [UsersController::class, 'users_list_data'])->name('list.data');
    });
});
