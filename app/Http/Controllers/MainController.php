<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;

class MainController extends Controller
{
    //
    function landing_view(): View
    {
        return view('landing.landing', ['title' => env('APP_NAME') . '|Landing']);
    }
}
