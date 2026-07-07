<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = [
        'customer_name',
        'customer_title',
        'customer_photo',
        'company_logo',
        'rating',
        'review'
    ];

    protected $casts = [
        'rating' => 'integer'
    ];
}
