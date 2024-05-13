<?php

namespace App\Http\Controllers;

use App\Http\Requests\FileRequest;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function upload(FileRequest $request)
    {
        $user = Auth::user();

        $path = $request->file('file')->storeAs(
            'userfiles/' . $user->id,
            $request->file('file')->getClientOriginalName()
        );
        return response()->json(['message' => 'File uploaded successfully', 'path' => $path], 200);
    }

    public function delete($filename)
    {
        $user = Auth::user();

        $filePath = 'userfiles/' . $user->id . '/' . $filename;

        if (Storage::exists($filePath)) {
            Storage::delete($filePath);
            return response()->json(['message' => 'File deleted successfully'], 200);
        } else {
            return response()->json(['error' => 'File not found'], 404);
        }
    }

    public function getFilesMetadata()
    {
        $user = Auth::user();

        $directory = 'userfiles/' . $user->id;

        $files = Storage::files($directory);

        $filesMetadata = [];

        foreach ($files as $file) {
            $fileName = pathinfo($file, PATHINFO_FILENAME);

            $fileSize = Storage::size($file);

            $fileUpdatedDate = Storage::lastModified($file);

            $convertedDate = Carbon::createFromTimestamp($fileUpdatedDate)->format('Y-m-d');

            $extension = pathinfo($file, PATHINFO_EXTENSION);

            $filesMetadata[] = [
                'name' => $fileName,
                'size' => $fileSize,
                'updated_date' => $convertedDate,
                'extension' => $extension,
            ];
        }

        return response()->json($filesMetadata, 200);
    }

    public function download($filename)
    {
        $user = Auth::user();

        $filePath = 'userfiles/' . $user->id . '/' . $filename;

        if (Storage::exists($filePath)) {

            $fileContents = Storage::get($filePath);

            $mimeType = Storage::mimeType($filePath);

            return response($fileContents)
                ->header('Content-Type', $mimeType)
                ->header('Content-Disposition', 'attachment; filename="' . $filename . '"');
        } else {
            return response()->json(['error' => 'File not found'], 404);
        }
    }
}

