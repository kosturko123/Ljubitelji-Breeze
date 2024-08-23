<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Auth;

class PostController extends Controller
{

    function addPost(Request $req){
        /*
        $currentuserid = Auth::user()->id;
        $post = new Post;
        $post->text = $req->input('text');
        $post->photo_path = $req->file('photo_path')->store('posts');
        $post->user_id = $currentuserid;
        $post->save();
        return $post;
        */

        /*
        $request->validate([
            'text' => 'required|string|max:255',
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);
        $user = auth()->user();
        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }
        $path = $request->file('photo')->store('photos', 'public');
        $post = new Post();
        $post->user_id = $user->id;
        $post->text = $request->text;
        $post->photo_path = $path;
        $post->save();
    
        return response()->json(['message' => 'Post created successfully'], 200);*/

        try {
            $user = auth()->user();
            // Hardcode the post data
            $post = new Post();
            $post->user_id = 2; // Replace with a hardcoded user ID or your logic to get user ID
            $post->text = "Hardcoded post text"; // Replace with your desired hardcoded text
            $post->photo_path = "path/to/hardcoded/photo.jpg"; // Replace with your hardcoded photo path or filename
            $post->save();

            return response()->json(['message' => 'Post created successfully'], 201);
        } catch (Exception $e) {
            // Log the error
            Log::error('Error creating post: ' . $e->getMessage());

            return response()->json(['error' => 'An error occurred while creating the post'], 500);
        }
    }
}
