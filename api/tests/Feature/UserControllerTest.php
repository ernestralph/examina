<?php 
namespace tests\feature;

use Illuminate\Foundation\Testing\DatabaseTransactions ;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class UserControllerTest extends TestCase
{
    use DatabaseTransactions; // This trait resets the database after each test case

    /** @test */
    public function it_registers_a_user()
    {
        $userData = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '1234567890',
            'password' => 'Password@123',
            'password_confirmation' => 'Password@123',
        ];

        $response = $this->postJson('/api/v1/user/register', $userData);

        $response->assertStatus(200)
            ->assertJsonStructure(['user', 'token']);
    }

   /** @test */
   public function it_fail_to_registers_a_user_if_wrong_credential(){
    $userData = [
        'email' => 'john@example.com',
        'phone' => '1234567890',
        'password' => 'Password@123',
        'password_confirmation' => 'Password@123',
    ];

    $response = $this->postJson('/api/v1/user/register', $userData);

    $response->assertStatus(422)
        ->assertJsonStructure([
            'errors'
        ]);
    }

    /** @test */
    public function it_logs_in_a_user()
    {
        $user = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '1234567890',
            'password' => bcrypt('Password@123'),
        ]);

        $loginData = [
            'email' => 'john@example.com',
            'password' => 'Password@123',
        ];

        $response = $this->postJson('/api/v1/user/login', $loginData);

        $response->assertStatus(200)
            ->assertJsonStructure(['user', 'token']);
    }

    /** @test */
    public function it_fails_to_logs_in_a_user_if_password_not_match()
    {
        $user = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '1234567890',
            'password' => bcrypt('Password@123'),
        ]);

        $loginData = [
            'email' => 'john@example.com',
            'password' => 'Passwords111',
        ];

        $response = $this->postJson('/api/v1/user/login', $loginData);

        $response->assertStatus(422)
            ->assertJsonStructure([
             "error"
            ]);
    }

    /** @test */
     public function it_logs_out_a_user()
     {
         $user = User::factory()->create();
         $token = $user->createToken('main')->plainTextToken;

         $response = $this->actingAs($user)->postJson('/api/logout');

         $response->assertStatus(200)
             ->assertJson(['success' => true]);
     }
}