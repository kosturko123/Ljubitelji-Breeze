<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UserCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data'=> $this->collection,
        ];
    }

    public function with(Request $request){
        return [
            'status' => 'success'
        ];
    }

    public function withResponse($request, $response){
        return[
            $response->header('Accept','application/json')
        ];
    }
}
