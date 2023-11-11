<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TruckSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('trucks')->insert([
            'wheels' => 6,
            'cargo_space' => 1000,
            'created_at' => \Carbon\Carbon::now()->timezone('Asia/Jakarta'),
            'updated_at' => \Carbon\Carbon::now()->timezone('Asia/Jakarta')
        ]);
    }
}
