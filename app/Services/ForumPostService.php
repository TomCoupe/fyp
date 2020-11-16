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

    //function that takes $amount in params and returns relevant amount of forum posts.
    public function getForumPosts($amount)
    {
        $posts = $this->repository->getForumPosts($amount);
        return $posts;
    }

    //function used to ensure forum post creation contains data and is not junk data.
    public function validatePayload($payload)
    {
        foreach ($payload as $value) {
            if ($value == '') {
                return false;
            }
        }
        return true;
    }

    //takes a forum post and a user and stores in DB
    public function saveForumPost($post, $user)
    {
        return $this->repository->storePost($post, $user);
    }

    //takes a post Id and return the relevant post.
    public function findByPostId($id) {
        return $this->repository->findPost($id);
    }

    //gets all comments to a relevant post.
    public function getPostCommentsByPostId($postId){
        return $this->repository->getForumPostComments($postId);
    }   

    //gets the user who posted a comment by userid.
    public function getUserFromComment($userId) {
        return $this->repository->getUserFromComment($userId);
    }
      
}
