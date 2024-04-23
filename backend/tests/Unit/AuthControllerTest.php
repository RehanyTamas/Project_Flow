<?php
namespace Tests\Unit;

use App\Http\Controllers\AuthController;
use App\Http\Requests\LoginRequest;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Mockery;
use Tests\TestCase;
use App\Models\User;
use App\Http\Requests\RegisterRequest;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthControllerTest extends TestCase
{
    use DatabaseTransactions;

    public function test_register_creates_user()
    {
        $uniqueEmail = 'unique' . rand(1000, 9999) . '@example.com';
        $uniqueUsername = 'User' . rand(1000, 9999);
        $uniquePassword = 'ABC' . rand(1000, 9999);
        $uniqueCompany = 'Company' . rand(1000, 9999);

        $mockRequest = Mockery::mock(RegisterRequest::class);
        $mockRequest->shouldReceive('input')
            ->with('password')
            ->andReturn($uniquePassword);
        $mockRequest->shouldReceive('input')
            ->with('username')
            ->andReturn($uniqueUsername);
        $mockRequest->shouldReceive('input')
            ->with('company')
            ->andReturn($uniqueCompany);
        $mockRequest->shouldReceive('input')
            ->with('email')
            ->andReturn($uniqueEmail);

        $authController = new AuthController();
        $response = $authController->register($mockRequest);

        $this->assertEquals(Response::HTTP_CREATED, $response->getStatusCode());
        $this->assertDatabaseHas('users', [
            'email' => $uniqueEmail,
            'name' => $uniqueUsername,
        ]);
    }

    public function test_login_with_correct_credentials()
    {
        $uniqueEmail = 'unique' . rand(1000, 9999) . '@example.com';
        $uniqueUsername = 'User' . rand(1000, 9999);
        $uniquePassword = 'ABC' . rand(1000, 9999);
        $uniqueCompany = 'Company' . rand(1000, 9999);

        $user = User::create([
            'name' => $uniqueUsername,
            'email' => $uniqueEmail,
            'company' => $uniqueCompany,
            'password' => Hash::make($uniquePassword),
        ]);

        $mockRequest = Mockery::mock(LoginRequest::class);
        $mockRequest->shouldReceive('only')
            ->once()
            ->with('email', 'password')
            ->andReturn([
                'email' => $uniqueEmail,
                'password' => $uniquePassword,
            ]);

        $authController = new AuthController();
        $response = $authController->login($mockRequest);

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());
        $this->assertArrayHasKey('loginToken', json_decode($response->getContent(), true));
    }

    public function test_login_with_incorrect_credentials()
    {
        $uniqueEmail = 'wrongUnique' . rand(1000, 9999) . '@example.com';
        $uniquePassword = 'DEF' . rand(1000, 9999);

        $mockRequest = Mockery::mock(LoginRequest::class);
        $mockRequest->shouldReceive('only')
            ->once()
            ->with('email', 'password')
            ->andReturn([
                'email' => $uniqueEmail,
                'password' => $uniquePassword,
            ]);

        $authController = new AuthController();
        $response = $authController->login($mockRequest);

        $this->assertEquals(Response::HTTP_UNAUTHORIZED, $response->getStatusCode());
        $responseContent = json_decode($response->getContent(), true);

        $this->assertArrayHasKey('message', $responseContent);
        $this->assertEquals('Bad credentials', $responseContent['message']);
    }

}
