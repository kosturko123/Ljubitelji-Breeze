<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Like;
use Auth;


class PostController extends Controller
{

    function addPost(Request $request){
        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $filename = $file->getClientOriginalName();
            $file->move(public_path('uploads'), $filename);
            Post::create([
                'text' => $request->text,
                'photo' => $filename,
                'user_id' => $request->id
            ]);
            return response()->json([
                'message' => 'Post created successfully',
                'photo' => $filename,
                'text' => $request->text
            ], 201);
        }
    
        return response()->json([
            'message' => 'No file uploaded',
            'text' => $request->text
        ], 400);
    }

    public function getPosts()
    {
        $posts = Post::select('photo')->paginate(5); // Fetch only the 'image' column
        return response()->json($posts);
    }

    public function show($id)
    {
        $post = Post::with('comments.user')->findOrFail($id);
        $likeCount = Like::where('post_id', $id)->count();
        $post->likeCount = $likeCount;
        return response()->json($post);
    }
}



