@extends('welcome')
@include('partials.header')

@section('content')
&nbsp;
<div>
    <forum-comment-create :postid="{{$postId}}"></forum-comment-create>
</div>
@endsection