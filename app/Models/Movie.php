<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'release_date', 'genre', 'image_url'
    ];

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
     public function favourites()
    {
        return $this->hasMany(Favourite::class);
    }
}
