<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subject;
use App\Models\Question;
use App\Models\Option;

class ExamController extends Controller
{
    public function getAllSubjects(Request $request) {
        return Subject::all();
    }

    public function storeQuestion(Request $request) {
        $question = Question::create([
            'question' => $request->question,
            'answer' => $request->answer,
            'subject_id' => $request->selectedSubjects,
            'created_by' => $request->user()->id,
        ]);

        $optionArray = $request->options;

        foreach($optionArray as $key => $value){
            Option::create([
                'question_id' =>  $question->id,
                'option' => $value 
            ]);
        }

        return  response(['message' => 'stored successfully!']);
    }
}
