<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'category',
        'description',
        'price_from',
        'image_path',
        'is_best_seller',
        'tags'
    ];

    protected $casts = [
        'is_best_seller' => 'boolean',
        'tags' => 'array',
        'price_from' => 'float'
    ];
}
