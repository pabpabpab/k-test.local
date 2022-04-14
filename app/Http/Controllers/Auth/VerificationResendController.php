<?php


namespace App\Http\Controllers\Auth;


use App\Events\UserRegisteredEvent;
use App\Http\Controllers\Controller;
use App\Services\Auth\VerificationResendService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VerificationResendController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    // ПО КНОПКЕ ПОВТОРИТЬ ОТПРАВКУ ПИСЬМА С verification link'ом
    public function resend(Request $request)
    {
        $user = Auth::user();

        if (blank($user)) {
            return redirect()->route('account.login.show')
                ->with(['authStatus' => 'Сессия недействительна. Перелогиньтесь.']);
        }

        // Если не прошло 60 секунд с последней отправки verification link'а
        if ((new VerificationResendService())->mailWasRecentlySent($user)) {
            return back()->with(['authStatus' => 'Письмо отправлено.']);
        }

        // обновить updated_at у пользователя
        $user->touch();

        // event(new UserRegisteredEvent($user));

        return back()->with(['authStatus' => 'Письмо отправлено.']);
    }

}
