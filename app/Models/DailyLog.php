<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DailyLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'date',
        'mood',
        'sleep_hours',
        'water_intake',
        'food',
        'symptoms',
    ];
}
