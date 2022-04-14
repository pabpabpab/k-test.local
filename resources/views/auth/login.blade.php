@extends('layout.main-layout')

@section('title')Вход для пользователя@endsection

@section('content')
    <div class="auth_page">


        @if (session('authStatus'))
            <div class="auth_page__auth_status">
                {{ session('authStatus') }}
            </div>
        @endif


        <h1>Вход для пользователя</h1>

        <form action='{{route('account.login.do')}}' method='post'>
            @csrf

            <label for="email" class="auth_page__text_input__label">
                E-mail
            </label>
            <input type='email' name='email' id='email'
                   class="auth_page__text_input"
                   value="{{ old('email') ?? session('email') }}" required>
            @error('email')
                <p class="auth_page__text_input__error_msg">{{ $message }}</p>
            @enderror


            <label for="password" class="auth_page__text_input__label">
                Пароль
            </label>
            <input type='password'
                   name='password' id='password'
                   class="auth_page__text_input" required>
            @error('password')
                <p class="auth_page__text_input__error_msg">{{ $message }}</p>
            @enderror


            <p class="auth_page__remember_me">

                <input type="checkbox" name="remember" id="remember"
                       class="auth_page__remember_me__checkbox"
                       value="1" {{ old('remember') ? 'checked' : '' }}>

                <label for="remember" class="auth_page__remember_me__label" >
                    Запомнить меня
                </label>
            </p>


            <button type="submit" name='submit' class="auth_page__button">
                Войти
            </button>
        </form>

        <a href="{{ route('account.forgotPassword.showForm') }}"
            class="auth_page__forgot_password__link">
            Забыли пароль?
        </a>

    </div>
@endsection
