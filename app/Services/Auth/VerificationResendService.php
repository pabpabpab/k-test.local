<?php


namespace App\Services\Auth;


use Carbon\Carbon;

class VerificationResendService
{
    // ПРОШЛО 60 СЕКУНД С ПОСЛЕДНЕГО ОБНОВЛЕНИЯ UPDATED_AT У ПОЛЬЗОВАТЕЛЯ?
    public function mailWasRecentlySent($user): bool {
        $secondsLimit = 60;

        if (blank($user->updated_at)) {
            return false;
        }

        // updated_at из таблицы users переделать в timestamp
        $updated_at = Carbon::createFromFormat(
            'Y-m-d H:i:s',
            $user->updated_at
        )->timestamp;

        // timestamp сейчас
        $now = now()->timestamp;

        // не прошло 60 секунд с последнего обновления updated_at у пользователя?
        if ($now - $updated_at < $secondsLimit) {
            return true;
        }

        // прошло больше чем 60 секунд с последнего обновления updated_at у пользователя
        return false;
    }
}
