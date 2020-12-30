<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Services\ForumPostService;
use Tests\TestCase;
use App\ForumPost;

class ForumPostServiceTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    // public function setup(): void {
    //     $this->service = resolve(ForumPostService::class);
    // }

    public function testExample()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function testFindByPostId() {
        $post = ForumPost::create([
            'user_id' => 1,
            'text' => 'test test test',
            'likes' => 1,
            'dislikes' => 2,
            'title' => 'test title'
        ]);
        dd($post);
    }

}
