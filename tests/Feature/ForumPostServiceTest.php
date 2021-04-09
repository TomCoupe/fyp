<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Services\ForumPostService;
use Tests\TestCase;
use App\ForumPost;
use App\User;
use App\ForumPostLikes;
use App\ForumPostDislikes;
use App\ForumComment;
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

    public function testGetPostCommentsByPostId() {
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
        $comment = ForumComment::create([
            'forum_post_id' => $post->id,
            'text' => 'test data',
            'user_id' => $user->id,
            'likes' => 1,
            'dislikes' => 1
        ]);

        $returnedComments = $this->service->getPostCommentsByPostId($post->id);
        $this->assertNotNull($returnedComments);
        $this->assertEquals($returnedComments[0]['text'], $comment->text);
        $this->assertEquals($returnedComments[0]['forum_post_id'], $comment->forum_post_id);
        $this->assertEquals($returnedComments[0]['user_id'], $comment->user_id);
    }

    public function testGetNullPostCommentsByPostId() {
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

        $returnedComments = $this->service->getPostCommentsByPostId($post->id);
        $returnedComments = $returnedComments->toArray();
        $this->assertEmpty($returnedComments);
    }

    public function testGetUserFromComment() {
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
        $comment = ForumComment::create([
            'forum_post_id' => $post->id,
            'text' => 'test data',
            'user_id' => $user->id,
            'likes' => 1,
            'dislikes' => 1
        ]);

        $returnedUser = $this->service->getUserFromComment($comment->user_id);
        $this->assertNotNull($returnedUser);
        $this->assertEquals($user->id, $returnedUser->id);
    }

    public function testGetFakeUserFromComment() {
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
        ForumComment::create([
            'forum_post_id' => $post->id,
            'text' => 'test data',
            'user_id' => $user->id,
            'likes' => 1,
            'dislikes' => 1
        ]);

        $returnedUser = $this->service->getUserFromComment(500);
        $this->assertNull($returnedUser);
    }

    public function testGetUserLikesForPost() {
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
        $like = ForumPostLikes::create([
            'forum_post_id' => $post->id,
            'user_id' => $user->id,
        ]);
        $returnedLikes = $this->service->getUserLikesForPost($post->id, $user->id);
        $this->assertNotNull($returnedLikes);
        $this->assertEquals($like->forum_post_id, $returnedLikes->forum_post_id);
        $this->assertEquals($like->user_id, $returnedLikes->user_id);
    }

    public function testGetUserDislikesForPost() {
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
        $dislike = ForumPostDislikes::create([
            'forum_post_id' => $post->id,
            'user_id' => $user->id,
        ]);
        $returnedLikes = $this->service->getUserDislikesForPost($post->id, $user->id);
        $this->assertNotNull($returnedLikes);
        $this->assertEquals($dislike->forum_post_id, $returnedLikes->forum_post_id);
        $this->assertEquals($dislike->user_id, $returnedLikes->user_id);
    }

    public function testGetAllUserLikes() {
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
        $post1 = ForumPost::create([
            'user_id' => $user->id,
            'text' => 'testing is boring1',
            'likes' => 1,
            'dislikes' => 1,
            'title' => 'yawn1'
        ]);
        $like = ForumPostLikes::create([
            'forum_post_id' => $post->id,
            'user_id' => $user->id,
        ]);
        $like1 = ForumPostLikes::create([
            'forum_post_id' => $post1->id,
            'user_id' => $user->id,
        ]);

        $likes = $this->service->getAllUserLikes($user->id);
        $this->assertNotNull($likes);
        $this->assertEquals($likes[0]['forum_post_id'], $like->forum_post_id);
        $this->assertEquals($likes[1]['forum_post_id'], $like1->forum_post_id);
    }

    public function testGetAllUserDislikes() {
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
        $post1 = ForumPost::create([
            'user_id' => $user->id,
            'text' => 'testing is boring1',
            'likes' => 1,
            'dislikes' => 1,
            'title' => 'yawn1'
        ]);
        $dislike = ForumPostDislikes::create([
            'forum_post_id' => $post->id,
            'user_id' => $user->id,
        ]);
        $dislike1 = ForumPostDislikes::create([
            'forum_post_id' => $post1->id,
            'user_id' => $user->id,
        ]);

        $dislikes = $this->service->getAllUserDislikes($user->id);
        $this->assertNotNull($dislikes);
        $this->assertEquals($dislikes[0]['forum_post_id'], $dislike->forum_post_id);
        $this->assertEquals($dislikes[1]['forum_post_id'], $dislike1->forum_post_id);
    }


}
