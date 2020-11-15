<?php

namespace App\Services;

use App\Repositories\ForumPostRepository;
use Carbon\Carbon;


class ForumPostService
{

    protected $repository;

    public function __construct(ForumPostRepository $repository)
    {

        $this->repository = $repository;
    }

    public function getForumPosts($amount)
    {
        $posts = $this->repository->getForumPosts($amount);
        return $posts;
    }

    public function validatePayload($payload)
    {
        foreach ($payload as $value) {
            if ($value == '') {
                return false;
            }
        }
        return true;
    }

    public function saveForumPost($post, $user)
    {
        return $this->repository->storePost($post, $user);
    }

    public function findByPostId($id) {
        return $this->repository->findPost($id);
    }

    public function getPostCommentsByPostId($postId){
        return $this->repository->getForumPostComments($postId);
    }   
      
}
