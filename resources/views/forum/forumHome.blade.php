@extends('welcome')
@include('partials.header')

@section('content')
&nbsp;

<div>
    <forum-homepage :posts="{{$posts}}" :user="{{$user}}"></forum-homepage>
</div>
@endsection

