@extends('welcome')
@include('partials.header')
@section('content')
<div>
    <game-window :user="{{$user}}"></game-window>
</div>
@endsection