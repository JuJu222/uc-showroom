<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('order_details')->insert([
            'order_id' => 1,
            'vehicle_id' => 1,
            'amount' => 1,
            'created_at' => \Carbon\Carbon::now()->timezone('Asia/Jakarta'),
            'updated_at' => \Carbon\Carbon::now()->timezone('Asia/Jakarta')
        ]);

        DB::table('order_details')->insert([
            'order_id' => 1,
            'vehicle_id' => 3,
            'amount' => 2,
            'created_at' => \Carbon\Carbon::now()->timezone('Asia/Jakarta'),
            'updated_at' => \Carbon\Carbon::now()->timezone('Asia/Jakarta')
        ]);

        DB::table('order_details')->insert([
            'order_id' => 2,
            'vehicle_id' => 4,
            'amount' => 50,
            'created_at' => \Carbon\Carbon::now()->timezone('Asia/Jakarta'),
            'updated_at' => \Carbon\Carbon::now()->timezone('Asia/Jakarta')
        ]);
    }
}
