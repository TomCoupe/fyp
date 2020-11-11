@extends('welcome')
@include('partials.header')

@section('content')
&nbsp;
<div>
    <forum-post-create :user="casfas"></forum-post-create>
</div>
@endsection