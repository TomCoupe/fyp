<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ForumComment extends Model
{
    protected $dates = ['created_at', 'updated_at'];

    protected $fillable = ['user_id', 'likes', 'dislikes', 'text', 'forum_post_id'];
}
