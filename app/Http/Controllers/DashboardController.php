<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use Auth;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(){

        if(Auth::id()){
            $user_type = Auth::user()->user_type;

            if($user_type == 'user'){

                return Inertia::render('Dashboard');

            }
            else if($user_type == 'admin'){
                return Inertia::render('Brewery');
            }

        }

        return Inertia::render('MainPage');
    }
}
