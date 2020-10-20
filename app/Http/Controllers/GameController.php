<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GameController extends Controller
{
    public function index() {

        // $user = Auth::user();
        $user = 'ssss';
        return view('game.game')->with('user', $user);
    }
}
