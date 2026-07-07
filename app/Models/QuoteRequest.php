<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuoteRequest extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'event_type',
        'event_date',
        'guests_count',
        'notes',
        'status'
    ];

    protected $casts = [
        'event_date' => 'date',
        'guests_count' => 'integer'
    ];
}
