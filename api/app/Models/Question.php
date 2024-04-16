<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Option;
use App\Models\Subject;

class Question extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function options()
    {
        return $this->hasMany(Option::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id', 'id');
    }
}
