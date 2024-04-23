<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Http\Controllers\BackgroundImageController;
use Illuminate\Support\Facades\File;

class BackgroundImageControllerTest extends TestCase
{
    public function test_getImages_with_existing_directory()
    {
        $path = 'background/test';
        $directory = public_path($path);

        if (File::exists($directory)) {
            File::cleanDirectory($directory);
        } else {
            File::makeDirectory($directory, 0755, true);
        }

        File::put("{$directory}/image1.jpg", '');
        File::put("{$directory}/image2.jpg", '');

        $controller = new BackgroundImageController($path);
        $response = $controller->getImages();

        $data = json_decode($response->getContent(), true);

        $this->assertEquals(200, $response->getStatusCode());

        $expectedImages = [
            asset('background/test/image1.jpg'),
            asset('background/test/image2.jpg'),
        ];

        $this->assertEquals($expectedImages, $data['images']);
    }

    public function test_getImages_with_non_existing_directory()
    {
        $path = 'background/test';
        $directory = public_path($path);


        if (File::exists($directory)) {
            File::cleanDirectory($directory);
            File::deleteDirectory($directory);
        }

        $controller = new BackgroundImageController($path);
        $response = $controller->getImages();

        $data = json_decode($response->getContent(), true);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEmpty($data['images']);
    }
}
