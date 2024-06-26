<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Question;

class Option extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function Question()
    {
        return $this->belongsTo(Question::class, 'question_id', 'id');
    }
}
