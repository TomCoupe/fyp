<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Leaderboard extends Model
{
    protected $dates = ['created_at', 'updated_at'];

    protected $fillable = ['user_id', 'points', 'minutes', 'lives', 'seconds'];
}
