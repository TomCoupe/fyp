@extends('welcome')
@section('content')
<div>
    <game-window :user=" {{$user}} "></game-window>
</div>
@endsection