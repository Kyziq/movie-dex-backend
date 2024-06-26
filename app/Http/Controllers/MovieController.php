<?php

namespace App\Http\Controllers;

use App\Http\Requests\MovieRequest;
use App\Models\Movie;
use Inertia\Inertia;

class MovieController extends Controller
{
    public function index()
    {
       $movies = Movie::all();
        return response()->json($movies);
    }

    public function store(MovieRequest $request)
    {
        $movie = Movie::create($request->validated());
        return response()->json($movie, 201);
    }

    public function update(MovieRequest $request, Movie $movie)
    {
        $movie->update($request->validated());
        return response()->json($movie, 200);
    }

    public function destroy(Movie $movie)
    {
        $movie->delete();
        return response()->json(null, 204);
    }

    public function show(Movie $movie)
    {
        return Inertia::render('MovieDetail', ['movie' => $movie]);
    }
}
