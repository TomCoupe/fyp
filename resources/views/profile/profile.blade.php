@extends('welcome')
@include('partials.header')

@section('content')
&nbsp;
<div>
    <profile-page :user="{{$user}}"></profile-page>
</div>
@endsection