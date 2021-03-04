<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use App\Services\GameService;

class GameController extends Controller
{
    protected $service;

    public function __construct(GameService $service) {
        $this->service = $service;
    }   

    public function index() {

        $user = Auth::user();
        // $user = 'ssss';
        return view('game.game')->with('user', $user);
    }

    public function save(Request $request) {
        $user = Auth::user();

        Log::info($request);

        if($user == null) {
            return;
        }
        
        $this->service->storeLeaderboardScores($user, $request);  
    }
}
