<?php

use App\Http\Controllers\MovieController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReviewController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('/dashboard');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    Route::post('/reviews', [ReviewController::class, 'store']);
    Route::patch('/reviews/{review}', [ReviewController::class, 'update']);
    Route::delete('/reviews/{review}', [ReviewController::class, 'destroy']);
    
});

// Public Routes
Route::get('/reviews', [ReviewController::class, 'index']);
Route::get('/movies', [MovieController::class, 'index']);
Route::get('/movies/{movie}', [MovieController::class, 'show'])->name('movies.show');
Route::post('/movies', [MovieController::class, 'store']);
Route::patch('/movies/{movie}', [MovieController::class, 'update']);
Route::delete('/movies/{movie}', [MovieController::class, 'destroy']);
Route::get('/movies/search', [MovieController::class, 'search'])->name('movies.search');
Route::get('/test-search', [MovieController::class, 'search'])->name('movies.testsearch');
require __DIR__.'/auth.php';
