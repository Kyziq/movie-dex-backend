<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ReviewRequest;
use App\Models\Review;

class ReviewController extends Controller
{
    public function __construct()
    {
        // Apply auth middleware only to methods that require authentication
        $this->middleware('auth')->except(['index']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Review::query();

        // If there's a `movie_id` parameter, use it to filter reviews
        if ($request->has('movie_id')) {
            $query->where('movie_id', $request->movie_id);
        }

        // Eager load user and movie relationships and paginate results
        $reviews = $query->with(['user', 'movie'])->paginate(5); // Set pagination to 5 items per page

        return response()->json($reviews);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ReviewRequest $request)
    {
        $review = Review::create($request->validated());
        return response()->json($review, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ReviewRequest $request, Review $review)
    {
        $review->update($request->validated());
        return response()->json($review, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review)
    {
        $review->delete();
        return response()->json(null, 204);
    }
}
