<?php

namespace Tests\Unit;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use App\Http\Controllers\UsersController;

class UsersControllerTest extends TestCase
{
    use DatabaseTransactions;

    public function test_getUsers()
    {
        $user1 = User::create([
            'name' => 'User One',
            'email' => 'userone@example.com',
            'company' => 'Company A',
            'password' => Hash::make('password'),
        ]);

        $user2 = User::create([
            'name' => 'User Two',
            'email' => 'usertwo@example.com',
            'company' => 'Company A',
            'password' => Hash::make('password'),
        ]);

        $user3 = User::create([
            'name' => 'User Three',
            'email' => 'userthree@example.com',
            'company' => 'Company B',
            'password' => Hash::make('password'),
        ]);

        Auth::login($user1);

        $controller = new UsersController();
        $response = $controller->getUsers();

        $users = json_decode($response->getContent());

        $this->assertCount(2, $users);
        $this->assertTrue(collect($users)->contains(function ($u) { return $u->name === 'User One'; }));
        $this->assertTrue(collect($users)->contains(function ($u) { return $u->name === 'User Two'; }));
        $this->assertFalse(collect($users)->contains(function ($u) { return $u->name === 'User Three'; }));
    }
}
