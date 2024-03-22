<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    public function getUsers(Request $request){

        $user = Auth::user();

        $users = User::where('company', $user->company) ->get();

        return response()->json($users);
    }
}
