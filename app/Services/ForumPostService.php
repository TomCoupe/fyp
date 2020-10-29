<?php
namespace App\Services;

use App\Repositories\ForumPostRepository;


class ForumPostService {

    protected $repository;

    public function __construct(ForumPostRepository $repository) {

        $this->repository = $repository;
    }

    public function getForumPosts($amount) {
        return $this->repository->getForumPosts($amount);
    }

}