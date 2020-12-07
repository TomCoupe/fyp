<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ForumPostDislikes extends Model
{
    protected $fillable = ['forum_post_id', 'user_id'];

    protected $table = 'forum_post_dislikes';
}
