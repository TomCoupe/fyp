@extends('welcome')
@include('partials.header')
@section('content')
<div class="center-game">
    <canvas id="game" width="640" height="640"></canvas>
    <!-- <game-window :user="{{$user}}"></game-window> -->
</div>
@endsection