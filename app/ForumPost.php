<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\ForumPostLikes;
use App\ForumPostDislikes;

class ForumPost extends Model
{
    protected $dates = ['created_at', 'updated_at'];

    protected $fillable = ['user_id', 'likes', 'dislikes', 'text', 'title'];


    public function likes() {
        $this->hasMany(ForumPostLikes::class);
    }

    public function dislikes() {
        $this->hasMany(ForumPostDislikes::class);
    }
}
