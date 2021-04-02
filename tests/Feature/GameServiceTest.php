<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Services\GameService;
use Tests\TestCase;
use App\Leaderboard;

class GameServiceTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    
    // public function setup(): void {
        
    // }

    public function testGameRoute() {
        $response = $this->get('/game');

        $response->assertStatus(200);
    }
    
    // public function testExample()
    // {
    //     $response = $this->get('/');

    //     $response->assertStatus(200);
    // }

    // public function testGetTopTenScores() {

    //     Leaderboard::create([
    //         'user_id' => 1,
    //         'lives' => 3,
    //         'points' => 200,
    //         'minutes' => 1,
    //         'seconds' => 20
    //     ]);

    //     $list = $this->service->getLeaderboardList();
    //     $this->assertNotNull($list);
    // }
}
