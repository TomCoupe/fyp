<?php

namespace App\Http\Controllers;

use App\Services\ForumPostService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class ForumController extends Controller
{
    protected $service;

    public function __construct(ForumPostService $service)
    {
        $this->service = $service;
    }

    //function to load the forum homepage. (view of all forum posts)
    public function index()
    {
        $posts = $this->service->getForumPosts(200);
        $user = Auth::user();
        return view('forum.forumHome')->with(['posts' => $posts, 'user' => $user]);
    }

    //function to load the forum post creation page with the authenticated user.
    public function create()
    {
        $user = Auth::user();
        if ($user !== null) {
            return view('forum.forumCreate')->with(['user' => $user]);
        }
        return redirect()->route('forum');
    }

    //function to validate a forum post. if validation passes, post is created.
    public function createPost(Request $request)
    {
        if ($this->service->validatePayload($request)) {
            $user = Auth::user();
            $stored = $this->service->saveForumPost($request, $user);
            if ($stored == true) {
                return response('success', 200);
            }
        }
        return response('error', 500);
    }

    //loads a forum post via post ID. looks up associated user comments to the post and returns to frontend.
    public function loadPost($id)
    {
        $post = $this->service->findByPostId($id);
        if ($post !== null) {
            $comments = $this->service->getPostCommentsByPostId($id);
            $commentsArray = [];
            foreach ($comments as $comment) {
                $user = $this->service->getUserFromComment($comment->user_id);
                $commentsArray[] = ['comment' => $comment, 'user' => $user];
            }

            return view('forum.forumPost')->with(['post' => $post, 'comments' => json_encode($commentsArray)]);
        }

        return; //404
    }

    public function createComment($id)
    {
        return view('forum.forumCommentCreate')->with(['postId' => $id]);
    
    }
    
    public function postComment(Request $request)
    {
        if ($this->service->validatePayload($request)) {
            $user = Auth::user();
            $stored = $this->service->saveForumComment($user, $request);
            if ($stored == true) {
                return response('success', 200);
            }
        }
        return response('error', 404);
    }
}
