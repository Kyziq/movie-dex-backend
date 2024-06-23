<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Review;
use App\Models\User;
use App\Models\Movie;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Ensure there are users and movies to attach reviews to
        $users = User::all();
        $movies = Movie::all();

        if ($users->isEmpty() || $movies->isEmpty()) {
            echo "Ensure there are users and movies in the database before seeding reviews.\n";
            return;
        }

        // Create reviews
        foreach ($movies as $movie) {
            // Each movie gets reviews from random users
            for ($i = 0; $i < 5; $i++) { // Generate 5 reviews per movie
                Review::create([
                    'user_id' => $users->random()->id,
                    'movie_id' => $movie->id,
                    'rating' => rand(1, 10), // Random rating between 1 and 10
                    'comment' => 'This is a sample review for ' . $movie->title . '.'
                ]);
            }
        }
    }
}
