<?php

namespace App\Repositories;

use App\ForumPost;
use App\ForumComment;
use App\User;
use App\ForumPostLikes;
use App\ForumPostDislikes;


class ForumPostRepository
{

    protected $model;
    protected $commentModel;
    protected $userModel;
    protected $dislikesModel;
    protected $likesModel;

    public function __construct(
        ForumPost $model,
        ForumComment $commentModel,
        User $userModel,
        ForumPostDislikes $dislikesModel,
        ForumPostLikes $likesModel
    ) {
        $this->model = $model;
        $this->commentModel = $commentModel;
        $this->userModel = $userModel;
        $this->dislikesModel = $dislikesModel;
        $this->likesModel = $likesModel;
    }

    //gets forum posts and return in order of newest to oldest.
    public function getForumPosts($amount)
    {
        return $this->model->orderBy('created_at', 'DESC')->take($amount)->get();
    }

    //stores user forum post
    public function storePost($post, $user)
    {
        return $this->model->create([
            'user_id' => $user->id,
            'text' => $post['postText'],
            'title' => $post['title'],
            'likes' => 0,
            'dislikes' => 0
        ]);
    }

    //fetches user by user id
    public function getUserFromComment($id)
    {
        return $this->userModel->where('id', $id)->first();
    }

    //find lookup for a post
    public function findPost($id)
    {
        return $this->model->where('id', $id)->first();
    }

    //gets all comments linked to a forum post.
    public function getForumPostComments($postId)
    {
        return $this->commentModel->where('forum_post_id', $postId)->get();
    }

    public function storeComment($user, $comment)
    {
        return $this->commentModel->create([
            'user_id' => $user->id,
            'text' => $comment->commentText,
            'forum_post_id' => $comment->postid,
            'likes' => 0,
            'dislikes' => 0,
        ]);
    }

    public function getUserLikesForPost($postId, $userId)
    {
        return $this->likesModel->where('forum_post_id', $postId)->where('user_id', $userId)->first();
    }

    public function getUserDislikesForPost($postId, $userId)
    {
        return $this->dislikesModel->where('forum_post_id', $postId)->where('user_id', $userId)->first();
    }

    public function getAllUserLikes($userId)
    {
        return $this->likesModel->where('user_id', $userId)->get();
    }

    public function getAllUserDislikes($userId)
    {
        return $this->dislikesModel->where('user_id', $userId)->get();
    }

    public function removeLike($postId, $userId)
    {
        return $this->likesModel->where('forum_post_id', $postId)->where('user_id', $userId)->delete();
    }

    public function removeDislike($postId, $userId)
    {
        return $this->dislikesModel->where('forum_post_id', $postId)->where('user_id', $userId)->delete();
    }

    public function addLike($postId, $userId) 
    {
        return $this->likesModel->updateOrCreate(['forum_post_id' => $postId, 'user_id' => $userId], ['forum_post_id' => $postId, 'user_id' => $userId]);
    }

    public function addDislike($postId, $userId) 
    {
        return $this->dislikesModel->updateOrCreate(['forum_post_id' => $postId, 'user_id' => $userId], ['forum_post_id' => $postId, 'user_id' => $userId]);
    }
}
