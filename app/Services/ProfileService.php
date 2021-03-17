<?php

namespace App\Services;

use Carbon\Carbon;
use App\Repositories\LeaderboardRepository;
use Illuminate\Support\Facades\Auth;


class ProfileService
{
    protected $leaderboardRepository;

    public function __construct(LeaderboardRepository $leaderboardRepository) {
        $this->leaderboardRepository = $leaderboardRepository;
    }

    public function getBestScore($user) {
        return $this->leaderboardRepository->getTopScoresForUser($user, 1);
    }

    public function getTimeUnderThree($user) {
        return $this->leaderboardRepository->getTimeUnderThree($user);
    } 

    public function getScoreWithFullLives($user) {
        return $this->leaderboardRepository->getScoreWithFullLives($user);
    }

    public function getHighestPoints($user) {
        return $this->leaderboardRepository->getHighestPoints($user);
    }
}