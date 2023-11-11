<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'model',
        'year',
        'capacity',
        'manufacturer',
        'price',
        'vehicleable_type',
        'vehicleable_id'
    ];

    /**
     * Get the models that is a vehicle
     */
    public function vehicleable()
    {
        return $this->morphTo();
    }

    /**
     * Vehicle has many order details
     */
    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }
}
