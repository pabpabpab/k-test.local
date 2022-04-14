@extends('layout.main-layout')


@php
    $favoriteIdsStr = (string) ($_COOKIE['favoriteIds'] ?? '');
    $favoriteCount = strlen($favoriteIdsStr) > 0 ? count(explode(",", $favoriteIdsStr)) : 0;

    //$viewedCount = session()->exists('viewedProductsIds') ? count(session('viewedProductsIds')) : 0;

    $viewedCount = 0;
    $viewedIdsStr = request()->cookie('viewedIds') ?? '';
    if ($viewedIdsStr) {
       $viewedCount = count(explode(",", $viewedIdsStr));
    }

@endphp




@section('title')Личный кабинет@endsection


@section('content')
    <div class="my_page">

        @if (session('authStatus'))
            <div class="my_page__auth_status">
                {{ session('authStatus') }}
            </div>
        @endif

        <h1 class="my_page__h1">Привет {{ \Illuminate\Support\Facades\Auth::user()->name }}!</h1>

        <div class="my_page__content">
            <a href="{{ route('products.favorites') }}" class="my_page__item_link">
                Избранные товары
                <span class="my_page__item_link__info_tail">
                    {{ $favoriteCount }}
                </span>
            </a>
            <a href="{{ route('products.viewed') }}" class="my_page__item_link">
                Вы смотрели эти товары
                <span class="my_page__item_link__info_tail">
                    {{ $viewedCount }}
                </span>
            </a>
        </div>


    </div>
@endsection
