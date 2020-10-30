<?php
namespace App\Services;

use App\Repositories\ForumPostRepository;
use Carbon\Carbon;


class ForumPostService {

    protected $repository;

    public function __construct(ForumPostRepository $repository) {

        $this->repository = $repository;
    }

    public function getForumPosts($amount) {
        $posts = $this->repository->getForumPosts($amount);

        foreach ($posts as $post) { 
            $post->created_at = $post->created_at->format('Y-m-d H:i:s');
            // $post->updated_at = Carbon::parse($post->updated_at);
        }

        return $posts;
    }

}