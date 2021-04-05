<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class RouteTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testExample()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function testGame() {
        $response = $this->get('/game');

        $response->assertStatus(200);
    }

    // public function testForum() {
    //     $response = $this->get('/forum');

    //     $response->assertStatus(200);
    // }

    // public function testForumCreate() {
    //     $user = Auth::user();
    //     $this->be($user);
    //     $response = $this->get('/forum/create');

    //     $response->assertStatus(200);
    // }

    // public function testPostViewOnFakePo st() {
    //     $user = Auth::user();
    //     $this->be($user);
    //     $response = $this->get('/forum/post/34343434');

    //     $response->assertStatus(500);
    // }

}
