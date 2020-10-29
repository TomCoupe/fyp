<?php
namespace App\Services;

use App\Repositories\ForumPostRepository;


class ForumPostService {

    protected $repository;

    public function __construct(ForumPostRepository $repository) {

        $this->repository = $repository;
    }

    public function getForumPosts($amount) {
        $posts = $this->repository->getForumPosts($amount);

        foreach ($posts as $post) {
            $post->created_at->toFormattedDateString();
            $post->updated_at->toFormattedDateString();
        }

        return $posts;
    }

}