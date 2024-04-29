<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CommentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize()
    {
        // Only authorized if the user is logged in
        return true;  // or any other custom logic for authorization
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules()
    {
        return [
            'project_id' => 'required|integer|exists:projects,id',
            'text' => 'required|string|max:1000', // Adjust maximum length as needed
            'parent_id' => 'nullable|integer|exists:comments,id',  // For replies
        ];
    }
}
