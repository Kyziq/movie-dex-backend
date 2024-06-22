<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Movie;

class MovieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Creates 10 sample movies
        Movie::create([
            'title' => 'Avengers: New Dawn',
            'description' => 'The Avengers reunite to face a new threat emerging from the depths of the universe.',
            'release_date' => '2024-05-01',
            'genre' => 'Action',
        ]);

        Movie::create([
            'title' => 'Inception: The Awakening',
            'description' => 'A sequel to the mind-bending thriller, diving deeper into the world of dreams within dreams.',
            'release_date' => '2024-07-10',
            'genre' => 'Science Fiction',
        ]);

        Movie::create([
            'title' => 'Jurassic World: Extinction',
            'description' => 'The final chapter in the Jurassic World saga where humans and dinosaurs struggle for coexistence.',
            'release_date' => '2024-06-15',
            'genre' => 'Adventure',
        ]);

        Movie::create([
            'title' => 'Star Wars: The Last Jedi Order',
            'description' => 'The Jedi face their greatest challenge as a new Sith order rises.',
            'release_date' => '2024-12-20',
            'genre' => 'Fantasy',
        ]);

        Movie::create([
            'title' => 'Fast & Furious: Final Lap',
            'description' => 'The last ride of the Fast & Furious saga, featuring epic races and high-stakes heists.',
            'release_date' => '2024-04-05',
            'genre' => 'Action',
        ]);
    }
}
