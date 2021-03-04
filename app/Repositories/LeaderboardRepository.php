<?php
namespace App\Repositories;

use App\Leaderboard;

class LeaderboardRepository {

    protected $model;

    public function __construct(Leaderboard $model) {
        $this->model = $model;
    }

    public function create($data) {
        return $this->model->create([
            'user_id' => $data['user_id'],
            'lives' => $data['lives'],
            'points' => $data['points'],
            'seconds' => $data['seconds'],
            'minutes' => $data['minutes']
        ]);
    }

    public function getTopTen() {
        return $this->model->orderBy('points', 'DESC')->orderBy('minutes', 'ASC')->orderBy('seconds', 'ASC')->take(10)->get();
    }
}