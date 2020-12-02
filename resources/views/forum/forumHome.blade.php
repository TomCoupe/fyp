@extends('welcome')
@include('partials.header')

@section('content')
&nbsp;

<div>
    <forum-homepage :posts="{{$posts}}" :user="{{$user}}" :likes="{{$likes}}" :dislikes="{{$dislikes}}"></forum-homepage>
</div>
@endsection

