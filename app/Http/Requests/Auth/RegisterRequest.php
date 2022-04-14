<?php

namespace App\Http\Requests\Auth;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class RegisterRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ];
    }

    public function attributes()
    {
        return [
            'name' => '«Имя»',
            'email' => '«E-mail»',
            'password' => '«Пароль»',
        ];
    }

    public function messages()
    {
        return [
            'required' => 'Заполните :attribute.',
            'string' => 'Заполните :attribute.',
            'email' => 'Некорректный :attribute.',
            'max' => ':attribute должно быть не более :max символов.',
            'min' => 'Нужен :attribute не менее :min символов.',
            'unique' => 'Пользователь с таким e-mail уже существует.',
            'confirmed' => 'Неверно подтвержден :attribute.',
        ];
    }

    protected function failedValidation(Validator $validator): void
    {
        if (request()->expectsJson()) {
            $response = response()->json(['backValidatorErrors' => $validator->errors()]);
        } else {
            request()->flashOnly(['name', 'email']);
            $response = back()->withErrors($validator->errors());
        }

        throw new HttpResponseException($response);
    }
}
