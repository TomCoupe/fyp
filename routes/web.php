<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    if (Auth::check()) {
        Auth::logout();
    }
    return view('home.homepage');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/game', 'GameController@index')->name('game');
Route::get('/forum', 'ForumController@index')->name('forum');
Route::get('/forum/post/{id}', 'ForumController@loadPost');
Route::get('/leaderboards', 'LeaderboardController@index');

Route::group(['middleware' => 'auth'], function () {
    Route::get('/profile', 'UserController@profile');
    Route::get('/forum/create', 'ForumController@create');
    Route::post('/forum/createPost', 'ForumController@createPost');
    Route::get('/forum/post/{id}/createComment', 'ForumController@createComment');
    Route::post('/forum/post/{id}/postComment', 'ForumController@postComment');
    Route::get('/profile', 'ProfileController@index');
    Route::post('/removeLike','ForumController@removeLike');
    Route::post('/addLike', 'ForumController@addLike');
    Route::post('/addDislike', 'ForumController@addDislike');
    Route::post('/removeDislike', 'ForumController@removeDislike');
});
