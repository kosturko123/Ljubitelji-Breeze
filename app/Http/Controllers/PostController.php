<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Auth;


class PostController extends Controller
{

    function addPost(Request $request){
        
        /*try {
            /*$request->validate([
                'text' => 'required|max:255|string',
                'photo' => 'nullable|mimes:png,jpg,jpeg,webp'
            ]);
    
            $filename = NULL;
            $path = NULL;
    
            if($request->has('photo')){
    
                $file = $request->file('photo');
                $extension = $file->getClientOriginalExtension();
    
                $filename = time().'.'.$extension;
    
                $path = 'uploads/photos/';
                $file->move($path, $filename);
            }*/
            /*
            Post::create([
                'text' => $request->text,
                'photo' => $path.$filename,
                'user_id' => 1
            ]);
    
            return response()->json([
                'message' => 'Message is this',
                'data' => $request->all()
            ]);
            response()->json(['message' => 'Post created successfully'], 201);
        } catch (Exception $e) {
            return response()->json(['error' => 'An error occurred while creating the post'], 500);
        }*/

        $user = Auth::user();
        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $filename = $file->getClientOriginalName();
            $file->move(public_path('uploads'), $filename);
            Post::create([
                'text' => $request->text,
                'photo' => $filename,
                'user_id' => $user->id
            ]);
            return response()->json([
                'message' => 'Post created successfully',
                'file' => $filename,
                'text' => $request->text
            ], 201);
        }
    
        // Return response if no file was uploaded
        return response()->json([
            'message' => 'No file uploaded',
            'text' => $request->text
        ], 400);














        /*try {
            $user = auth()->user();
            // Hardcode the post data
            $post = new Post();
            $post->user_id = 1; // Replace with a hardcoded user ID or your logic to get user ID
            $post->text = "text1"; // Replace with your desired hardcoded text
            $post->photo_path = "path1"; // Replace with your hardcoded photo path or filename
            $post->save();

            return response()->json(['message' => 'Post created successfully'], 201);
        } catch (Exception $e) {
            // Log the error
            Log::error('Error creating post: ' . $e->getMessage());

            return response()->json(['error' => 'An error occurred while creating the post'], 500);
        }*/
    }
}



