<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    //
    function users_list_view()
    {
        $users = User::all();
        $title = "Users list [=]";
        $data = compact('users', 'title');
        return view('dashboard.users.users_list', $data);
    }

    function users_list_data(Request $request)
    {
        $users = User::query();
        // $users->where('id','<>',auth()->user()->id);
        return $this->datatable($request, $users, 10, function ($user) {
            $user->register_date_format = $user->created_at->format('Y-m-d');
            $user->register_date = $user->created_at->diffForHumans();
            return $user;
        });
    }

    function users_edit_create()
    {

        $title = 'Create new user';
        return view('dashboard.users.create', compact('title'));
    }
    function users_edit_store(Request $request)
    {
        $data = $request->validate([
            'name' => 'string|min:1|required',
            'email' => "required|email|unique:users,email",
            "password" => "required|alpha_num|min:6",
        ]);

        $data['password'] = bcrypt($data['password']);

        User::create($data);

        $message = ['type' => 'alert-success', 'msg' => "User created successfully."];

        return view('dashboard.users.create', compact('message'));

    }

    function users_edit_user_view(User $user)
    {
        $title = 'Edit-> ' . $user->name;
        return view('dashboard.users.edit', compact('user', 'title'));
    }

    function users_edit_user(User $user, Request $request)
    {

        if (($request->update == 'update')) {
            $user->update($request->validate(['name' => 'required']));

        } elseif ($request->update == 'updateemail') {
            $user->update($request->validate(['email' => 'required|email|unique:users,id']));

        } elseif ($request->update == 'updatepassword') {
            $data = $request->validate(['password' => 'required|alpha_num|min:6']);
            $data['password'] = bcrypt($data['password']);
            $user->update($data);
        }
        $title = 'Edit-> ' . $user->name;
        $message = ['type' => 'alert-success', 'msg' => "User updated successfully."];
        return view('dashboard.users.edit', compact('user', 'title', 'message'));
    }

    function users_delete(User $user)
    {
        $user->delete();
        return true;
    }
}
