@extends('layout.main-layout')

@section('content')
    @guest
        Для входа в SPA зарегистрируйтесь.
    @else
        Нажмите на ваше имя в меню для входа в SPA.
    @endguest
@endsection
