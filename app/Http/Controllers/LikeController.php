<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function likePost(Request $request)
    {
        $existingLike = Like::where('user_id', $request->user_id)
                            ->where('post_id', $request->post_id)
                            ->first();
        if ($existingLike) {
            return response()->json(['message' => 'You have already liked this post.'], 400);
        }

        Like::create([
            'user_id' => $request->user_id,
            'post_id' => $request->post_id
        ]);

        return response()->json(['message' => 'Post liked successfully.']);
    }
}
