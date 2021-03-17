<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\ProfileService;

class ProfileController extends Controller
{
    protected $service;
    public function __construct(ProfileService $service) {
        $this->service = $service;
    }

    public function index() {
        $user = Auth::user();
        $bestScore = $this->service->getBestScore($user);
        $underThree = $this->service->getTimeUnderThree($user);
        $fullLives = $this->service->getScoreWithFullLives($user);
        $highestPoints = $this->service->getHighestPoints($user);
        return view('profile.profile')->with([
            'user' => $user, 
            'bestScore' => $bestScore, 
            'underThree' => $underThree,
            'fullLives' => $fullLives,
            'highestPoints' =>$highestPoints
        ]);
    }
}
