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
}