<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subject;
use App\Models\Question;
use App\Models\Option;
use App\Models\StudentScore;

use App\Http\Resources\QuestionResource;
use App\Http\Resources\ScoreResource;

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

        return  response()->json(['message' => 'Question uploaded successfully'], 201);
    }

    public function bulkUploadQuestions(Request $request){  
        if ($request->hasFile('file') && $request->file('file')->isValid()) {
            $file = $request->file('file');
            $questions = array_map('str_getcsv', file($file->path()));

            foreach ($questions as $row) {
                $question = Question::create([
                    'question' => $row[0],
                    'answer' => end($row),
                    'created_by' => $request->user()->id,
                    'subject_id' => $request->selectedSubjects,
                ]);

                // Create options for the question
                $options = array_slice($row, 1, count($row) - 2);
                foreach ($options as $option) {
                    Option::create([
                        'question_id' => $question->id,
                        'option' => $option,
                    ]);
                }
            }

            return response()->json(['message' => 'Questions uploaded successfully'], 201);
        } else {
            return response()->json(['message' => 'No valid file uploaded'], 400);
        }
    }

    public function getQuestionsBySubject(Request  $request, $subjectId){
        $questions = Question::where(["subject_id" => $subjectId])->with("options");
        
        return QuestionResource::collection($questions->paginate(30));
    }

    public function storeScore(Request $request){
        $student = $request->user()->id;
        $results = $request->result;

        foreach ($results as $result) {
            StudentScore::create([
                'subject_id' => $result['subject_id'],
                'score' => $result['score'],
                'student_id' => $student,
            ]);
        }

        return response()->json(['message' => 'Test submitted successfully'], 201);
    }

    public function getScores(Request $request, $student_id){
       $scores = StudentScore::where(['student_id'=> $student_id])->get();
       return ScoreResource::collection($scores);
    }
}
