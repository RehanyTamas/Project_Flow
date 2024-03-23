<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BackgroundImageController extends Controller
{
    public function getImages()
    {
        $directory = public_path('background');

        // Check if the directory exists
        if (!file_exists($directory)) {
            return [];
        }

        // Get all files in the directory
        $files = scandir($directory);

        // Remove "." and ".." from the list
        $files = array_diff($files, ['.', '..']);

        // Construct URLs for each file
        $imageUrls = [];
        foreach ($files as $file) {
            $imageUrls[] = asset("background/$file");
        }

        return response()->json(['images' => $imageUrls]);
    }
}
