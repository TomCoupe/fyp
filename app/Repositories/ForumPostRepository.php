<?php
namespace App\Repositories;

use App\ForumPost;


class ForumPostRepository {

    protected $model;

    public function __construct(ForumPost $model) {
        $this->model = $model;
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

    public function findPost($id) {
        return $this->model->where('id', $id)->first();
    }
}