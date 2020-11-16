<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ForumCommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('forum_comments')->insert([
            'forum_post_id' => 1,
            'text' => 'Lorem ipsum dolor sit amet',
            'user_id' => 1,
            'likes' => 2,
            'dislikes' => 0,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
