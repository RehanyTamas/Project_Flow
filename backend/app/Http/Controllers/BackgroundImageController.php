<?php

namespace App\Http\Controllers;

use http\Env\Response;

class BackgroundImageController extends Controller
{
    private $path;
    public function __construct($path = 'background')
    {
        $this->path = $path;
    }

    public function getImages()
    {
        $directory = public_path($this->path);

        if (!file_exists($directory)) {
            return  response()->json(['images' => []]);
        }

        $files = scandir($directory);

        $files = array_diff($files, ['.', '..']);

        $imageUrls = [];
        foreach ($files as $file) {
            $imageUrls[] = asset("$this->path/$file");
        }

        return response()->json(['images' => $imageUrls]);
    }
}
