@extends('welcome')
@include('partials.header')

@section('content')
&nbsp;
<div>
    <profile-page 
    :user="{{$user}}" 
    :bestscore="{{$bestScore}}" 
    :underthree="{{$underThree}}"
    :fulllives="{{$fullLives}}"
    :highestpoints="{{$highestPoints}}">
    </profile-page>
</div>
@endsection