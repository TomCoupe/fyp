@extends('welcome')
@include('partials.header')

@section('content')
&nbsp;
<div>
    <forum-post-view :post="{{ json_encode($post) }}" :comments="{{$comments}}"></forum-post-view>
</div>
@endsection