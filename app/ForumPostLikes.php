<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ForumPostLikes extends Model
{
    protected $fillable = ['forum_post_id', 'user_id'];

    protected $table = 'forum_post_likes';
}
