<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\GameService;
use App\Services\UserService;
use Illuminate\Support\Facades\Log;


class LeaderboardController extends Controller
{

    protected $gameService;
    protected $userService;

    public function __construct(GameService $gameService, UserService $userService) {
        $this->gameService = $gameService;
        $this->userService = $userService;
    }

    public function index() {

        $data = [];
        $scores = $this->gameService->getLeaderboardList();
        
        foreach ($scores as $score) {
            $user  = $this->userService->getNameByID($score->user_id);
           
            $data[] = [
                'scores' => $score,
                'user' => $user[0]
            ];
        }
        return view('leaderboard.leaderboard')->with('scores', $data);
    }
}
