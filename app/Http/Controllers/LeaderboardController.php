<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\GameService;
use Illuminate\Support\Facades\Log;


class LeaderboardController extends Controller
{

    protected $gameService;

    public function __construct(GameService $gameService) {
        $this->gameService = $gameService;
    }

    public function index() {

        $scores = $this->gameService->getLeaderboardList();

        return view('leaderboard.leaderboard')->with('scores', $scores);
    }
}
