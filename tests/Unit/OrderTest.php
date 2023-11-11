<?php

namespace Tests\Unit;

use App\Models\User;
use Tests\TestCase;

class OrderTest extends TestCase
{
    public function test_order_index_route(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->get('/');
        $response->assertStatus(200);
    }

    public function test_order_create_route(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->get('/orders/create');
        $response->assertStatus(200);
    }

    public function test_order_store_route(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->post('/orders');
        $response->assertStatus(500);
    }

    public function test_order_edit_route(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->get('/orders/1/edit');
        $response->assertStatus(200);
    }

    public function test_order_update_route(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->put('/orders/1');
        $response->assertStatus(500);
    }

    public function test_order_delete_route(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->delete('/orders/1');
        $response->assertStatus(500);
    }
}
