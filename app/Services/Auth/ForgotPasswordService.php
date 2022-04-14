<?php


namespace App\Services\Auth;


use Carbon\Carbon;

class ForgotPasswordService
{
    // ПРОШЛО 60 СЕКУНД С ПОСЛЕДНЕГО ОБНОВЛЕНИЯ CREATED_AT У ТОКЕНА?
    // входной $tokenObject это одна запись из таблицы password_resets
    public function recentlyCreatedToken($tokenObject) {
        $secondsLimit = 60;

        // записи о токене вообще нет
        if (blank($tokenObject)) {
            return false;
        }

        // created_at из таблицы переделать в timestamp
        $created_at = Carbon::createFromFormat(
            'Y-m-d H:i:s',
            $tokenObject->created_at
        )->timestamp;

        // timestamp сейчас
        $now = now()->timestamp;

        // не прошло 60 секунд с последнего обновления created_at у токена?
        if ($now - $created_at < $secondsLimit) {
            return true;
        }

        // прошло больше чем 60 секунд с последнего обновления created_at у токена
        return false;
    }

}
