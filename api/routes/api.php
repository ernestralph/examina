<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\ExamController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('v1')->group(function () {
    Route::prefix('user')->group(function () {
        Route::middleware('auth:sanctum')->group(function () {
            // logout route
            Route::post('/logout', [UserController::class, 'logout']);
        });
        
        // Route for user registration
        Route::post('register', [UserController::class, 'register']);

        // Route for user login
        Route::post('login', [UserController::class, 'login']);
        
    });


    // admin routes
    Route::prefix('admin')->group(function (){
        Route::middleware(['auth:sanctum'])->group(function(){
            Route::get("get-subjects", [ExamController::class, 'getAllSubjects'] ); 
            Route::post("upload-question", [ExamController::class, 'storeQuestion'] ); 
            Route::post('questions/bulk-upload', [ExamController::class, 'bulkUploadQuestions']);
        });
    });

    // student routes
    Route::prefix('student')->group(function (){
        Route::middleware(['auth:sanctum'])->group(function(){
            Route::get("get-subjects", [ExamController::class, 'getAllSubjects'] ); 

            Route::get('questions/{subjectId}', [ExamController::class, 'getQuestionsBySubject']);

            Route::post('submit-score', [ExamController::class, 'storeScore']);

            Route::get('get-scores/{student_id}', [ExamController::class, 'getScores']);
        });
    });
});
