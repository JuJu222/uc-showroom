<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('orders')->insert([
            'customer_id' => 1,
            'created_at' => \Carbon\Carbon::now()->timezone('Asia/Jakarta'),
            'updated_at' => \Carbon\Carbon::now()->timezone('Asia/Jakarta')
        ]);

        DB::table('orders')->insert([
            'customer_id' => 3,
            'created_at' => \Carbon\Carbon::now()->timezone('Asia/Jakarta'),
            'updated_at' => \Carbon\Carbon::now()->timezone('Asia/Jakarta')
        ]);
    }
}
