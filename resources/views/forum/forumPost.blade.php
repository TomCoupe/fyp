@extends('welcome')
@include('partials.header')

@section('content')
&nbsp;
<div>
    <forum-post-view :post={{$post}}></forum-post-view>
</div>
@endsection