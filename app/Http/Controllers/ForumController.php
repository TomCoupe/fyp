<?php

namespace App\Http\Controllers;

use App\Services\ForumPostService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class ForumController extends Controller
{
    protected $service;

    public function __construct(ForumPostService $service) {
        $this->service = $service;
    }

    public function index() {
        $posts = $this->service->getForumPosts(200);
        $user = Auth::user();
        return view('forum.forumHome')->with(['posts' => $posts, 'user' => $user]);
    }

    public function create() {
        $user = Auth::user();
        if($user !== null) {
            return view('forum.forumCreate')->with(['user' => $user]);
        }
        return redirect()->route('forum');
    } 
    
    public function createPost(Request $request) {
        if($this->service->validatePayload($request)) {
            $user = Auth::user();
            $stored = $this->service->saveForumPost($request, $user);
            Log::info($stored);
            if($stored == true) {
                // return response('success', 200);
            }
        }
        // return response('error', 500)
    }
    
    public function loadPost($id) {
        $post = $this->service->findByPostId($id);
        if($post !== null) {
            $comments = $this->service->getPostCommentsByPostId($id);
            $commentsArray = [];
            foreach($comments as $comment) {
                $user = $this->service->getUserFromComment($comment->user_id);
                $commentsArray[] = ['comment' => $comment, 'user' => $user];
            }
            
            return view('forum.forumPost')->with(['post' => $post, 'comments' => json_encode($commentsArray)]);
        }

        return; //404
    }
}
