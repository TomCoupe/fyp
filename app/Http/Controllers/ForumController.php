<?php

namespace App\Http\Controllers;

use App\Services\ForumPostService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ForumController extends Controller
{
    protected $service;

    public function __construct(ForumPostService $service) {
        $this->service = $service;
    }

    public function index() {
        $posts = $this->service->getForumPosts(1);
        $user = Auth::user();
        return view('forum.forumHome')->with(['posts' => $posts, 'user' => $user]);
    }

    public function create() {
        return view('forum.forumCreate');
    }   
}
