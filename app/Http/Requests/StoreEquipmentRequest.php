<?php

namespace App\Http\Requests;

use App\Rules\UniqueSerialNumbers;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class StoreEquipmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'typeData.typeId' => ['required'],
            'serialNumber' => [
                new UniqueSerialNumbers()
            ],
        ];
    }

    public function attributes()
    {
        return [
            'typeData.typeId' => '«Тип оборудования»',
            'serialNumber' => '«Серийные номера»',
        ];
    }

    public function messages()
    {
        return [
        ];
    }

    protected function failedValidation(Validator $validator): void
    {
        $errors = $validator->errors();

        throw new HttpResponseException(
            response()->json([
                'backValidatorErrors' => $errors
            ])
        );
    }
}
