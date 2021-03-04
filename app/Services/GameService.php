<?php

namespace App\Services;

use App\Repositories\UserRepository;
use App\Repositories\LeaderboardRepository;


class GameService
{

    protected $repository;
    protected $leaderboardRepository;

    public function __construct(UserRepository $repository, LeaderboardRepository $leaderboardRepository)
    {

        $this->repository = $repository;
        $this->leaderboardRepository = $leaderboardRepository;
    }

    public function getLeaderboardList() {
        return $this->leaderboardRepository->getTopTen();
    }

    public function storeLeaderboardScores($user, $request)
    {
        $data = [
            'user_id' => $user->id,
            'lives' => $request->lives,
            'points' => $request->points,
            'minutes' => $request->minutes,
            'seconds' => $request->seconds
        ];

        return $this->leaderboardRepository->create($data);
    }
}
