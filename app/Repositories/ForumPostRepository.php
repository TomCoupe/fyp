<?php
namespace App\Repositories;

use App\ForumPost;
use App\ForumComment;
use App\User;


class ForumPostRepository {

    protected $model;
    protected $commentModel;
    protected $userModel;

    public function __construct(ForumPost $model, ForumComment $commentModel, User $userModel) {
        $this->model = $model;
        $this->commentModel = $commentModel;
        $this->userModel = $userModel;
    }

    public function getForumPosts($amount) {
        return $this->model->orderBy('created_at', 'DESC')->take($amount)->get();
    }

    public function storePost($post, $user) {
        return $this->model->create([
            'user_id' => $user->id,
            'text' => $post['postText'],
            'title' => $post['title'],
            'likes' => 0,
            'dislikes' => 0
        ]);
    }

    public function getUserFromComment($id) {
        return $this->userModel->where('id', $id)->first();
    }

    public function findPost($id) {
        return $this->model->where('id', $id)->first();
    }

    public function getForumPostComments($postId) {
        return $this->commentModel->where('forum_post_id', $postId)->get();
    }
}