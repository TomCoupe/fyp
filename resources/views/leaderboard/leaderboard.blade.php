@extends('welcome')
@include('partials.header')

@section('content')
&nbsp;
<div>
    <leaderboards :scores="{{json_encode($scores)}}"></leaderboards>
</div>
@endsection