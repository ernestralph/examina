<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Question;

class Subject extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug'];

    public function qestion()
    {
        return $this->hasMany(Question::class);
    }
}
