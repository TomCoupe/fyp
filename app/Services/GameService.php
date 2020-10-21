<?php
namespace App\Services;

use App\Repositories\UserRepository;


class GameService {

    protected $repository;

    public function __construct(UserRepository $repository) {

        $this->repository = $repository;
    }


}