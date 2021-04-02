<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use App\Leaderboard;
use App\Services\GameService;

class GameServiceTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */

    public function setup(): void {
        $this->service = resolve(GameService::class);
    }

    public function testExample()
    {
        $this->assertTrue(true);
    }

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
