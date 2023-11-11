<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'order_id',
        'vehicle_id',
        'amount',
    ];

    /**
     * Order detail belongs to one order
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Order detail belongs to one vehicle
     */
    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }
}
