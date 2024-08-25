<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'type'  => 'user',
            'id'    => $this->id,
            'attributes' =>[
                'name'  => $this->name,
                'email'=> $this->email,
                'user_image' => $this->user_image
            ],
            'links' =>[
            'self' => route('users', $this->id)
            ]

        ];
    }

    public function with($request){
        return [
            'success'=>'success'
        ];
    }

    public function withResponse($request,$response){
        
        $response ->header('Accept','application/json');
        
    }
}
