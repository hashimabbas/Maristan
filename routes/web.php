<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\App;
use App\Http\Controllers\VisitController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
// routes/web.php (or routes/api.php)
Route::get('/api/contacts', [ContactController::class, 'getContacts'])->name('contacts.api');
// Route::get('/about', function () {
//     return Inertia::render('Contact.index');
// })->name('home');




Route::get('/api/visits', [VisitController::class, 'index']);
Route::post('/api/visits', [VisitController::class, 'store']);

Route::get('/about', function () {
    $locale = App::getLocale(); // Get the current application locale
    return Inertia::render('About/index', ['locale' => $locale]);
})->name('about');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
