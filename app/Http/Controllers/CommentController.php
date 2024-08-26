<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Resources\CommentResource;
use App\Http\Resources\CommentCollection;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        // Create a new comment
        Comment::create([
            'text' => $request->text,
            'user_id' => $request->user_id,
            'post_id' => $request->post_id
        ]);

        // Return a success response
        return response()->json([
            'message' => 'Comment added successfully',
            'comment' => $request->text
        ], 201); // 201 Created
    }

    /*public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }*/

}
