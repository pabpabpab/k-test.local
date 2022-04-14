@extends('layout.main-layout')


@section('title')Создать новый пароль@endsection

@section('content')
    <div class="auth_page">

        @if (session('authStatus'))
            <div class="auth_page__auth_status">
                {{ session('authStatus') }}
            </div>
        @endif

        <h1>Создать новый пароль</h1>

        <form action='{{route('account.resetPassword.update')}}' method='post'>
            @csrf
            <input type="hidden" name="token" value="{{ $token }}">


            <label for="email" class="auth_page__text_input__label">
                E-mail
            </label>
            <input type='email' name='email' id='email'
                   class="auth_page__text_input"
                   value="{{ $email ?? old('email') }}" required>
            @error('email')
                <p class="auth_page__text_input__error_msg">{{ $message }}</p>
            @enderror


            <label for="password" class="auth_page__text_input__label">
                Пароль
            </label>
            <input type='password' name='password' id='password'
                   class="auth_page__text_input" required>
            @error('password')
                <p class="auth_page__text_input__error_msg">{{ $message }}</p>
            @enderror


            <label for="password_confirmation" class="auth_page__text_input__label">
                Подтвердите пароль
            </label>
            <input type='password' name='password_confirmation' id='password_confirmation'
                   class="auth_page__text_input" required>
            @error('password_confirmation')
                <p class="auth_page__text_input__error_msg">{{ $message }}</p>
            @enderror


            <button type="submit" name='submit' class="auth_page__button">
                Сохранить
            </button>
        </form>
    </div>
@endsection
