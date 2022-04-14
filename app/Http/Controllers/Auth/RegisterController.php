<?php

namespace App\Http\Controllers\Auth;

use App\Events\UserRegisteredEvent;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use App\Services\User\FavoriteProductsSynchronizer;
use App\Services\User\IsAdminService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class RegisterController extends Controller
{

    public function __construct()
    {
        $this->middleware('guest');
    }

    // Показать форму регистрации
    public function showRegisterForm()
    {
        return view('auth.register');
    }

    // Создать регистрацию
    public function store(RegisterRequest $request)
    {
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();

        if (blank($user->id)) {
            return $request->expectsJson()
                ? response()->json(['success' => false])
                : back()->with(['authStatus' => 'Не удалось создать регистрацию.']);
        }

        Auth::login($user);

        // event(new UserRegisteredEvent($user));

        return $request->expectsJson()
            ? response()->json(['success' => true])
            : redirect()->route('main');
    }

}
