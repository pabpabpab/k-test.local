<?php

namespace App\Rules;

use App\Models\Equipment;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\DB;

class UniqueSerialNumbers implements Rule
{

    private $nonUniqueNumbersArr; // = [];

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $serialNumbers = $value;
        $numbersArr = explode("\n", $serialNumbers);

        $this->nonUniqueNumbersArr = DB::table('equipments')
            ->whereIn('serial_number', $numbersArr)
            ->pluck('serial_number');

        return count($this->nonUniqueNumbersArr) === 0;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return $this->nonUniqueNumbersArr->implode(",");
    }
}
