<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ForumPostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('forum_posts')->insert([
            'user_id' => 1,
            'text' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            'likes' => 10,
            'dislikes' => 3,
            'title' => 'Lorem ipsum dolor sit amet'
        ]);
    }
}
