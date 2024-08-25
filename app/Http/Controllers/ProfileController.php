<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function storePicture(Request $request)
    {
        $request->validate([
            'user_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // You can adjust the validation rules as needed
        ]);
    
        // Handle the image upload
        $imagePath = null;
        if ($request->hasFile('user_image')) {
            $file = $request->file('user_image');
            $filename = $file->getClientOriginalName();
            $file->move(public_path('uploads/user_images'), $filename);
        }
        $user = Auth::user();
        $user->user_image = $filename;
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Profile picture updated successfully',
            'image_path' => $filename,
        ]);
    }


}
