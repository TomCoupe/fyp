<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class GameController extends Controller
{
    public function index() {

        $user = Auth::user();
        // $user = 'ssss';
        return view('game.game')->with('user', $user);
    }

    public function save(Request $request) {
        Log::info($request);
    }
}
