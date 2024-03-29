<?php

namespace App\Http\Controllers;

use App\Services\ForumPostService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

use App\ForumPost;

class ForumController extends Controller
{
    protected $service;
    protected $userService;

    public function __construct(ForumPostService $service, UserService $userService)
    {
        $this->service = $service;
        $this->userService = $userService;
    }

    //function to load the forum homepage. (view of all forum posts)
    public function index()
    {
        $posts = $this->service->getForumPosts(200);
        $user = Auth::user();
        $dislikes = false;
        $likes = false;

        if ($user !== null) {
            $likes = $this->service->getAllUserLikes($user->id);
            $dislikes = $this->service->getAllUserDislikes($user->id);
        }

        return view('forum.forumHome')->with(['posts' => $posts, 'user' => $user, 'likes' => $likes, 'dislikes' => $dislikes]);
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
        $authUser = Auth::user();
        $dislikes = false;
        $likes = false;

        if ($authUser !== null) {
            $likes = $this->service->getUserLikesForPost($id, $authUser->id);
            $dislikes = $this->service->getUserDislikesForPost($id, $authUser->id);
        }

        $post = $this->service->findByPostId($id);
        $userFromPost = $this->service->getUserFromPost($post->user_id);
        if ($post !== null) {
            $comments = $this->service->getPostCommentsByPostId($id);
            $commentsArray = [];
            foreach ($comments as $comment) {
                $user = $this->service->getUserFromComment($comment->user_id);
                $commentsArray[] = ['comment' => $comment, 'user' => $user];
            }

            return view('forum.forumPost')->with(
                [
                    'post' => $post,
                    'comments' => json_encode($commentsArray),
                    'likes' => json_encode($likes),
                    'dislikes' => json_encode($dislikes),
                    'user' => json_encode($userFromPost)
                ]
            );
        }

        return response('error', 404);
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

    public function removeLike(Request $request)
    {
        if ($this->service->validateLikeOrDislikePayload($request)) {
            $this->service->removeLike($request['forum_post_id'], $request['user_id']);
            return response('success', 200);
        }
        return response('error', 404);
    }

    public function addLike(Request $request)
    {
        Log::info($request);
        if ($this->service->validateLikeOrDislikePayload($request)) {
            $this->service->addLike($request['forum_post_id'], $request['user_id']);
            return response('success', 200);
        }
        return response('error', 404);
    }

    public function removeDislike(Request $request)
    {
        if ($this->service->validateLikeOrDislikePayload($request)) {
            $this->service->removeDislike($request['forum_post_id'], $request['user_id']);
            return response('success', 200);
        }
        return response('error', 404);
    }

    public function getUserFromId(Request $request) {
        return $this->userService->getNameByID($request[0]);
    }

    public function addDislike(Request $request)
    {
        Log::info($request);

        if ($this->service->validateLikeOrDislikePayload($request)) {
            $this->service->addDislike($request['forum_post_id'], $request['user_id']);
            return response('success', 200);
        }
        return response('error', 404);
    }
}
