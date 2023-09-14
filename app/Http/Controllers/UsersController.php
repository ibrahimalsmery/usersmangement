<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;

class UsersController extends Controller
{
    //
    function users_list_view()
    {
        $users = User::all();

        $data = compact('users');

        return view('dashboard.users.users_list', $data);
    }
    function datatable($request, $query, $limit, $transform = null)
    {
        $req = $request->all();

        $columns = $request->columns;

        foreach ($columns as $index => $column) {
            if (isset($column['name'])) {
                if ($index == 0) {
                    $query->select($column['name']);
                } else {
                    $query->addSelect($column['name']);
                }
            }
            if (isset($column['like'])) {
                if (isset($column['search_input_type'])) {
                    if ($column['search_input_type'] === 'date') {
                        $query->whereDate($column['name'], $column['like']);
                    }
                } else {
                    $query->where($column['name'], "like", "%{$column['like']}%");
                }

            }
        }

        $painate = $query->paginate($limit);

        if ($transform)
            $painate->getCollection()->transform($transform);

        return ['request' => $req, 'paginate' => $painate];
    }

    function users_list_data(Request $request)
    {
        $users = User::query();

        return $this->datatable($request, $users, 10, function ($user) {
            $user->register_date_format = $user->created_at->format('Y-m-d');
            $user->register_date = $user->created_at->diffForHumans();
            return $user;
        });
    }
}
