<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MotorcycleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('motorcycles')->insert([
            'trunk_space' => 20,
            'fuel_capacity' => 25,
            'created_at' => \Carbon\Carbon::now()->timezone('Asia/Jakarta'),
            'updated_at' => \Carbon\Carbon::now()->timezone('Asia/Jakarta')
        ]);
    }
}
