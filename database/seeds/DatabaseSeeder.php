<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UserSeeder::class);
        $this->call(ForumPostSeeder::class);
        $this->call(ForumCommentSeeder::class);
        $this->call(ForumLikesSeeder::class);
        $this->call(ForumDislikesSeeder::class);
    }
}
