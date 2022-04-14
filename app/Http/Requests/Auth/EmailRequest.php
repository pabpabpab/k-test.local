<?php

namespace App\Http\Requests\Auth;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class EmailRequest extends FormRequest
{

    public function rules()
    {
        return [
            'email' => ['required', 'email'],
        ];
    }

    public function attributes()
    {
        return [
            'email' => '«E-mail»',
        ];
    }

    public function messages()
    {
        return [
            'required' => 'заполните :attribute.',
            'email' => 'некорректный :attribute.',
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
