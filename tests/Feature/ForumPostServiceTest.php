<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Services\ForumPostService;
use Tests\TestCase;
use App\ForumPost;
use App\User;
use Exception;
class ForumPostServiceTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    protected $service;

    public function setup(): void {
        parent::setUp();
        $this->service = resolve(ForumPostService::class);
    }

    public function testExample()
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }

    public function testGetForumPost() {
        $user = User::create([
            'name' => 'Tom',
            'email' => 'tom@tom.com',
            'password' => bcrypt('password123')
        ]);
        ForumPost::create([
            'user_id' => $user->id,
            'text' => 'testing is boring',
            'likes' => 1,
            'dislikes' => 1,
            'title' => 'yawn'
        ]);
        
        $posts = $this->service->getForumPosts(1);
        $this->assertNotNull($posts);      
    }

    public function testGetForumPostOnNull() {
        $posts = $this->service->getForumPosts(1);
        $posts = $posts->toArray();
        $this->assertEmpty($posts);      
    }

    public function testStorePost() {
        $user = User::create([
            'name' => 'Tom',
            'email' => 'tom@tom.com',
            'password' => bcrypt('password123')
        ]);
        $post = [
            'postText' => 'fdsfsd',
            'title' => 'qaseewq'
        ];
        $posted = $this->service->saveForumPost($post, $user);
        $this->assertNotNull($posted);
    }

    public function testStorePostOnNull() {
        $this->expectException(Exception::class);
        $user = User::create([
            'name' => 'Tom',
            'email' => 'tom@tom.com',
            'password' => bcrypt('password123')
        ]);
        $post = [];
        $this->service->saveForumPost($post, $user);
    }

    public function testFindPostByID() {
        $user = User::create([
            'name' => 'Tom',
            'email' => 'tom@tom.com',
            'password' => bcrypt('password123')
        ]);
        $post = ForumPost::create([
            'user_id' => $user->id,
            'text' => 'testing is boring',
            'likes' => 1,
            'dislikes' => 1,
            'title' => 'yawn'
        ]);
        $returnedPost = $this->service->findByPostId($post->id);

        $this->assertEquals($post->id, $returnedPost->id);
    }

    public function testFindPostByIdOnFake() {
        $returnedPost = $this->service->findByPostId(3000);
        $this->assertNull($returnedPost);
    }


}
