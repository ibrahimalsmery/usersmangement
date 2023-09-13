<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\View\View;

class UsersController extends Controller
{
    //
    function users_list_view(): View
    {
        $users = User::all();

        $data = compact('users');

        return view('dashboard.users.users_list', $data);
    }

    function users_list_data(): Collection
    {
        return User::all();
    }
}
