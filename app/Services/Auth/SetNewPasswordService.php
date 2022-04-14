<?php


namespace App\Services\Auth;


use App\Models\User;
use Illuminate\Support\Facades\DB;

class SetNewPasswordService
{
    // ПРОВЕРКА ЧТО ПОЛЬЗОВАТЕЛЬ ТАКОЙ ЕСТЬ
    // И ТОКЕН В PASSWORD_RESETS ТОЖЕ ЕСТЬ И СОВПАДАЕТ С ТОКЕНОМ ИЗ ФОРМЫ
    public function isCorrectCredentials($email, $token) {
        $user = User::where('email', $email)->first();

        // нет такого пользователя
        if (blank($user)) {
            return false;
        }

        // получить запись токена из таблицы, если есть
        $tokenObject = DB::table('password_resets')
            ->where('email', $email)
            ->first();

        // нет такой записи в password_resets
        if (blank($tokenObject)) {
            return false;
        }

        // токен из в password_resets не совпадает с токеном из скрытого поля формы
        if ($tokenObject->token !== $token) {
            return false;
        }

        // все ок
        return true;
    }
}
