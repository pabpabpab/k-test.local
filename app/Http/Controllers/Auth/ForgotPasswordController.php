<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\EmailRequest;
use App\Mail\PasswordResetLink;
use App\Models\User;
use App\Services\Auth\ForgotPasswordService;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class ForgotPasswordController extends Controller
{
   // use SendsPasswordResetEmails;

    public function __construct()
    {
        $this->middleware('guest');
    }

    // ПОКАЗАТЬ ФОРМУ «ЗАБЫЛИ ПАРОЛЬ?»
    public function showForgotForm()
    {
        return view('auth.forgot-password');
    }

    // ПРИНЯТЬ МЕТОДОМ POST ЕМАЙЛ, И ОТПРАВИТЬ НА ЭТОТ ЕМАЙЛ RESET LINK
    public function sendResetLink(EmailRequest $request)
    {
        $email = $request->only('email');

        $user = User::where('email', $email)->first();

        // Нет такого юзера, показываем одинаковый (уклончивый) ответ все равно
        if (blank($user)) {
            return $request->expectsJson()
                ? response()->json(['success' => false])
                : back()->with(['authStatus' => $this->_evasiveAnswer()]);
        }

        // получить запись о токене из таблицы password_resets, если есть
        $tokenObject = DB::table('password_resets')
            ->where('email', $user->email)
            ->first();


        // Если не прошло 60 секунд с последней отправки reset link'а,
        // то выход и уклончивый ответ
        if ((new ForgotPasswordService())->recentlyCreatedToken($tokenObject)) {
            return $request->expectsJson()
                ? response()->json(['success' => false])
                : back()->with(['authStatus' => $this->_evasiveAnswer()]);
        }

        // обновить время у записи с $user->email,
        // или вставить запись если ее нет для этого email
        if (blank($tokenObject)) {
            DB::table('password_resets')->insert([
                'email' => $user->email,
                'token' => Str::random(100),
                'created_at' =>  date('Y-m-d H:i:s' , now()->timestamp)
            ]);
        } else {
            DB::table('password_resets')
                ->where('email', $user->email)
                ->update(['created_at' =>  date('Y-m-d H:i:s' , now()->timestamp)]);
        }

        // отправить письмо с reset link (с линком для создания нового пароля)
        // Mail::to($user)->send(new PasswordResetLink($user));

        // успешный ответ с сообщением
        return $request->expectsJson()
            ? response()->json(['success' => true])
            : back()->with(['authStatus' => $this->_evasiveAnswer()]);
    }



    // ОДИНАКОВЫЙ УКЛОНЧИВЫЙ ОТВЕТ НА ВСЕ СЛУЧАИ
    protected function _evasiveAnswer() {
        return 'Если Вы правильно указали вашу почту,
                ссылка была отправлена.
                Проверьте пожалуйста Вашу почту.';
    }
}
