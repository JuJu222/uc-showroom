<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('customers')->insert([
            'name' => 'Amy Grant',
            'address' => 'Jl. Ciputra 291',
            'phone' => '0821931931',
            'id_card_path' => '1699730415.png',
            'created_at' => \Carbon\Carbon::now()->timezone('Asia/Jakarta'),
            'updated_at' => \Carbon\Carbon::now()->timezone('Asia/Jakarta')
        ]);

        DB::table('customers')->insert([
            'name' => 'Christopher',
            'address' => 'Jl. Basuki Rahmat 201',
            'phone' => '029319213114',
            'id_card_path' => '1699730439.png',
            'created_at' => \Carbon\Carbon::now()->timezone('Asia/Jakarta'),
            'updated_at' => \Carbon\Carbon::now()->timezone('Asia/Jakarta')
        ]);

        DB::table('customers')->insert([
            'name' => 'Angela',
            'address' => 'Jl. Pakuwon Indah 29/22',
            'phone' => '08321912391',
            'id_card_path' => '1699730594.jpg',
            'created_at' => \Carbon\Carbon::now()->timezone('Asia/Jakarta'),
            'updated_at' => \Carbon\Carbon::now()->timezone('Asia/Jakarta')
        ]);
    }
}
