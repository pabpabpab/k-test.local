@extends('layout.main-layout')


@section('title')Личный кабинет@endsection


@section('content')
    <div class="my_page">
        <h1>Привет {{ \Illuminate\Support\Facades\Auth::user()->name }}!</h1>

        @if (session('isAdmin'))
            <p>Вы администратор.</p>
        @else
            <p>Вы простой пользователь.</p>
        @endif

        @if (filled(\Illuminate\Support\Facades\Auth::user()->email_verified_at))
            <p>Email подтвержден.</p>
        @else
            <div>
                <p>Email пока не подтвержден.</p>
                <p>
                    На Ваш email было отправлено письмо с сылкой для подтверждения регистрации.
                    Пожалуйста, проверьте Ваш email. Если письма нет, Вы можете запросить повторную его отправку.
                </p>

                <form method="POST" action="{{ route('verification.resend') }}">
                    @csrf
                    <button type="submit" name='submit' class="my_page__button">
                        Повторить отправку письма
                    </button>
                </form>
            </div>
        @endif


        @if (session('authStatus'))
            <div class="my_page__auth_status">
                {{ session('authStatus') }}
            </div>
        @endif
    </div>
@endsection
