<?php

namespace App\Services;

use App\Repositories\UserRepository;
use App\Repositories\LeaderboardRepository;


class UserService
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository) {
        $this->userRepository = $userRepository;
    }

    public function getNameByID($id) {
        return $this->userRepository->getNameByID($id);
    }
}