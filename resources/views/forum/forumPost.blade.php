@extends('welcome')
@include('partials.header')

@section('content')
&nbsp;
<div>
    <forum-post-view 
    :post="{{ json_encode($post) }}" 
    :comments="{{$comments}}" 
    :likes="{{$likes}}" 
    :dislikes="{{$dislikes}}"
    :user="{{$user}}">
    </forum-post-view>
</div>
@endsection