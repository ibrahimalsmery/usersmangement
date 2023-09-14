<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;

class DashboardController extends Controller
{
    //
    function dashboard_index_view()
    {
        return view('dashboard.dashboard');
    }
}
