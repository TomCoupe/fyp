@extends('welcome')
@include('partials.header')

@section('content')
&nbsp;
<div>
    <forum-post-create :user="{{$user}}"></forum-post-create>
</div>
@endsection