<?php

namespace Tests\Unit;

use App\Models\User;
use Tests\TestCase;

class CustomerTest extends TestCase
{
    public function test_customer_index_route(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->get('/customers');
        $response->assertStatus(200);
    }

    public function test_customer_create_route(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->get('/customers/create');
        $response->assertStatus(200);
    }

    public function test_customer_store_route(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->post('/customers');
        $response->assertStatus(500);
    }

    public function test_customer_edit_route(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->get('/customers/1/edit');
        $response->assertStatus(200);
    }

    public function test_customer_update_route(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->put('/customers/1');
        $response->assertStatus(500);
    }

    public function test_customer_delete_route(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->delete('/customers/1');
        $response->assertStatus(500);
    }
}
