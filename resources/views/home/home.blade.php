@extends('welcome')
@section('content')
&nbsp;

<div class="center-div-2">
    <div class="col-md-6">
        <a  class="a-button" href="/game">
            <div class="game-click-div">
                <i class="fas fa-gamepad fa-7x"></i>
                <h3>Play BounceBoss</h3>
            </div>
        </a>
    </div>
    &nbsp;

    <div class="col-md-6">
        <a class="a-button" href="/forum">
            <div class="forum-click-div">
                <i class="fas fa-comments fa-7x"></i>
                <h3>Go to The Forum</h3>
            </div>
        </a>
    </div>

</div>

@endsection