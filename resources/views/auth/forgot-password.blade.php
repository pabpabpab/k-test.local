@extends('layout.main-layout')

@section('title')Забыл пароль@endsection

@section('content')
    <div class="auth_page">

        @if (session('authStatus'))
            <div class="auth_page__auth_status">
                {{ session('authStatus') }}
            </div>
        @endif

        <h1>Забыли пароль?</h1>

        <form action='{{route('account.forgotPassword.sendResetLink')}}' method='post'>
            @csrf
            <p>
                Введите e-mail, который Вы указали при регистрации,
                отправим Вам ссылку для создания нового пароля.
            </p>

            <label for="email" class="auth_page__text_input__label">
                E-mail
            </label>
            <input type='email' name='email' id='email'
                   class="auth_page__text_input"
                   value="{{ old('email') }}" required>
            @error('email')
                <p class="auth_page__text_input__error_msg">{{ $message }}</p>
            @enderror


            <button type="submit" name='submit' class="auth_page__button">
                Отправить
            </button>
        </form>

    </div>
@endsection

