<?php

namespace App\Http\Requests\Auth;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class LoginRequest extends FormRequest
{

    public function rules()
    {
        return [
            'email' => ['required', 'string', 'email', 'max:255'],
            'password' => ['required', 'string', 'max:255'],
            'remember' => ['boolean'],
        ];
    }

    public function attributes()
    {
        return [
            'email' => '«E-mail»',
            'password' => '«Пароль»',
            'remember' => '«Запомнить меня»',
        ];
    }

    public function messages()
    {
        return [
            'required' => 'заполните :attribute.',
            'string' => 'заполните :attribute.',
            'email' => 'некорректный :attribute.',
            'boolean' => 'некорректный :attribute.',
            'max' => ':attribute должно быть не более :max символов.',
            'min' => 'нужен :attribute не менее :min символов.',
        ];
    }


    protected function failedValidation(Validator $validator): void
    {
        if (request()->expectsJson()) {
            $response = response()->json(['backValidatorErrors' => $validator->errors()]);
        } else {
            $response = back()->withErrors($validator->errors());
        }

        throw new HttpResponseException($response);
    }
}
