<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VehicleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('vehicles')->insert([
            'model' => 'Civic',
            'year' => 2023,
            'capacity' => 5,
            'manufacturer' => 'Honda',
            'price' => 400000000,
            'vehicleable_type' => 'App\Models\Car',
            'vehicleable_id' => 1,
            'created_at' => \Carbon\Carbon::now()->timezone('Asia/Jakarta'),
            'updated_at' => \Carbon\Carbon::now()->timezone('Asia/Jakarta')
        ]);

        DB::table('vehicles')->insert([
            'model' => 'Camry',
            'year' => 2020,
            'capacity' => 6,
            'manufacturer' => 'Toyota',
            'price' => 300000000,
            'vehicleable_type' => 'App\Models\Car',
            'vehicleable_id' => 2,
            'created_at' => \Carbon\Carbon::now()->timezone('Asia/Jakarta'),
            'updated_at' => \Carbon\Carbon::now()->timezone('Asia/Jakarta')
        ]);

        DB::table('vehicles')->insert([
            'model' => 'R25',
            'year' => 2019,
            'capacity' => 2,
            'manufacturer' => 'Yamaha',
            'price' => 50000000,
            'vehicleable_type' => 'App\Models\Motorcycle',
            'vehicleable_id' => 1,
            'created_at' => \Carbon\Carbon::now()->timezone('Asia/Jakarta'),
            'updated_at' => \Carbon\Carbon::now()->timezone('Asia/Jakarta')
        ]);

        DB::table('vehicles')->insert([
            'model' => '500',
            'year' => 2020,
            'capacity' => 3,
            'manufacturer' => 'Hino',
            'price' => 439000000,
            'vehicleable_type' => 'App\Models\Truck',
            'vehicleable_id' => 1,
            'created_at' => \Carbon\Carbon::now()->timezone('Asia/Jakarta'),
            'updated_at' => \Carbon\Carbon::now()->timezone('Asia/Jakarta')
        ]);
    }
}
