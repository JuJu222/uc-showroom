<?php

namespace Tests\Unit;

use App\Models\User;
use Tests\TestCase;

class VehicleTest extends TestCase
{
    public function test_vehicle_index_route(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->get('/vehicles');
        $response->assertStatus(200);
    }

    public function test_vehicle_create_route(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->get('/vehicles/create');
        $response->assertStatus(200);
    }

    public function test_vehicle_store_route(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->post('/vehicles');
        $response->assertStatus(500);
    }

    public function test_vehicle_edit_route(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->get('/vehicles/1/edit');
        $response->assertStatus(200);
    }

    public function test_vehicle_update_route(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->put('/vehicles/1');
        $response->assertStatus(500);
    }

    public function test_vehicle_delete_route(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->delete('/vehicles/1');
        $response->assertStatus(500);
    }
}
