<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Subject;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $subject = array(
            array(
                'name' => "english",
                'slug' => "eng",
            ),
            array(
                'name' => "mathematics",
                'slug' => "mat",
            ),
            array(
                'name' => "physics",
                'slug' => "phy",
            ),
            array(
                'name' => "chemistry",
                'slug' => "chm",
            )
            
        );

        foreach($subject as $key =>  $value){
            Subject::create($value);
        }
    }
}
