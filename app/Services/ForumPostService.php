<?php

namespace App\Services;

use App\Repositories\ForumPostRepository;
use App\Repositories\UserRepository;
use Carbon\Carbon;


class ForumPostService
{

    protected $repository;
    protected $userRepository;

    public function __construct(ForumPostRepository $repository, UserRepository $userRepository)
    {
        $this->repository = $repository;
        $this->userRepository = $userRepository;
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
    public function findByPostId($id)
    {
        return $this->repository->findPost($id);
    }

    //gets all comments to a relevant post.
    public function getPostCommentsByPostId($postId)
    {
        return $this->repository->getForumPostComments($postId);
    }

    //gets the user who posted a comment by userid.
    public function getUserFromComment($userId)
    {
        return $this->repository->getUserFromComment($userId);
    }

    public function saveForumComment($user, $comment)
    {
        return $this->repository->storeComment($user, $comment);
    }

    public function getUserLikesForPost($postId, $userId)
    {
        return $this->repository->getUserLikesForPost($postId, $userId);
    }

    public function getUserDislikesForPost($postId, $userId)
    {
        return $this->repository->getUserDislikesForPost($postId, $userId);
    }

    public function getAllUserLikes($userId)
    {
        return $this->repository->getAllUserLikes($userId);
    }

    public function getAllUserDislikes($userId)
    {
        return $this->repository->getAllUserDislikes($userId);
    }

    public function removeLike($postID, $userId)
    {
        return $this->repository->removeLike($postID, $userId);
    }

    public function removeDislike($postID, $userId)
    {
        return $this->repository->removeDislike($postID, $userId);
    }

    public function addLike($postID, $userId) {
        return $this->repository->addLike($postID, $userId);
    }

    public function addDislike($postID, $userId) {
        return $this->repository->addDislike($postID, $userId);
    }

    public function getUserFromPost($id) {
        return $this->userRepository->getNameByID($id);
    }

    public function validateLikeOrDislikePayload($request) { 
        if($request['forum_post_id'] == null) {
            return false;
        }
        if($request['user_id'] == null) {
            return false;
        }
        return true;
    }

}
