<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'fuel_type',
        'trunk_space'
    ];

    /**
     * Get the vehicle model
     */
    public function vehicle()
    {
        return $this->morphOne('App\Models\Vehicle', 'vehicleable');
    }
}
