<?php

use Illuminate\Support\Facades\Route;


// Аутентификация
Route::group([
    'namespace' => '\App\Http\Controllers\Auth',
    'as' => 'account.',
], function () {

    // форма регистрации
    Route::get('/register', 'RegisterController@showRegisterForm')
        ->name('register.show');
    // создать регистрацию
    Route::post('/register', 'RegisterController@store')
        ->name('register.store');

    // по кнопке в ЛК повторная отправка письма с verification link'ом
    Route::post('/verification-resend/', 'VerificationResendController@resend')
        ->name('verification.resend');

    // форма входа
    Route::get('/login', 'LoginController@showLoginForm')
        ->name('login.show');
    Route::post('/login', 'LoginController@showLoginForm')
        ->name('login.show');

    // вход по логину и паролю
    Route::post('/login/do', 'LoginController@doLogin')
        ->name('login.do');

    // логаут
    Route::any('/logout', 'LogoutController@logout')
        ->name('logout');

    // переход по signed url из письма, верифицируется емайл
    Route::get('/confirm-register/{fakeUserId}', 'ConfirmRegisterController@confirmRegister')
        ->name('register.confirm');

    // форма забыл пароль
    Route::get('/forgot-password', 'ForgotPasswordController@showForgotForm')
        ->name('forgotPassword.showForm');
    // отправить по введенному емайл signed url для создания нового пароля
    Route::post('/forgot-password/send-reset-link', 'ForgotPasswordController@sendResetLink')
        ->name('forgotPassword.sendResetLink');

    // переход по signed url из письма для создания нового пароля
    Route::get('/reset-password/{fakeUserId}', 'SetNewPasswordController@showNewPasswordForm')
        ->name('resetPassword.showForm');
    // сохранить новый пароль
    Route::post('/reset-password/update', 'SetNewPasswordController@update')
        ->name('resetPassword.update');
});

