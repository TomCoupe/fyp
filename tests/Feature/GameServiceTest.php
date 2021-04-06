<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
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
    use RefreshDatabase;

    protected $service;

    public function setup(): void {
        parent::setUp();

        $this->service = resolve(GameService::class);
    }

    public function testGetTopTenScores() {

        Leaderboard::create([
            'user_id' => 1,
            'lives' => 3,
            'points' => 200,
            'minutes' => 1,
            'seconds' => 20
        ]);
        
        $list = $this->service->getLeaderboardList();
        $this->assertNotNull($list);
    }

    public function testGetTopTenScoresOnNull() {
        $list = $this->service->getLeaderboardList();
        $list = $list->toArray();
        $this->assertEmpty($list);
    }



    public function testGameRoute() {
        $response = $this->get('/game');
        $response->assertStatus(200);
    }
    
}
