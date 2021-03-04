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
}