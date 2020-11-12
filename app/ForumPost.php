<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ForumPost extends Model
{
    protected $dates = ['created_at', 'updated_at'];

    protected $fillable = ['user_id', 'likes', 'dislikes', 'text', 'title'];
}
