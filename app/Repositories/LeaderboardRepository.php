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

    public function getTopScores($amount) {
        return $this->model->orderBy('points', 'DESC')->orderBy('minutes', 'ASC')->orderBy('seconds', 'ASC')->take($amount)->get();
    }

    public function getTopScoresForUser($user, $amount) {
        return $this->model->where('user_id', $user->id)->orderBy('points', 'DESC')->orderBy('minutes', 'ASC')->orderBy('seconds', 'ASC')->take($amount)->get();
    }

    public function getTimeUnderThree($user) {
        return $this->model->where('user_id', $user->id)->where('minutes', '<', 3)->get();
    }

    public function getScoreWithFullLives($user) {
        return $this->model->where('user_id', $user->id)->where('lives', '=', 3)->get();
    }
    
    public function getHighestPoints($user) {
        return $this->model->where('user_id', $user->id)->where('points', '=', 2000)->get();
    }

}