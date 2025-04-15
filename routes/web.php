<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MessageController;
use Illuminate\Support\Facades\App;
use App\Http\Controllers\VisitController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\UserController;
// web.php (temporary route for password hashing)
use Illuminate\Support\Facades\Hash;

Route::get('/hash/{password}', function ($password) {
    return Hash::make($password);
});

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Route::get('/contact', [MessageController::class, 'index'])->name('contact.index');
// Route::post('/contact', [MessageController::class, 'store'])->name('contact.store');

Route::get('/api/contacts', [MessageController::class, 'getContacts'])->name('contacts.api');


Route::get('/api/visits', [VisitController::class, 'index']);
Route::post('/api/visits', [VisitController::class, 'store']);

Route::get('/about', function () {
    $locale = App::getLocale(); // Get the current application locale
    return Inertia::render('About/index', ['locale' => $locale]);
})->name('about');

// Route::middleware(['auth', 'verified'])->group(function () {

//     Route::get('/messages', [MessageController::class, 'adminIndex'])->name('messages.index');
//     Route::get('/messages/{message}', [MessageController::class, 'show'])->name('messages.show'); // Optional Show route
//     Route::delete('/messages/{message}', [MessageController::class, 'destroy'])->name('messages.destroy');

// });

// Keep public routes separate if needed
Route::get('/contact', [MessageController::class, 'publicIndex'])->name('contact.index');
Route::post('/contact', [MessageController::class, 'store'])->name('contact.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('test', function () {
        return Inertia::render('test');
    })->name('test');
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('offers', [OfferController::class, 'index'])->name('offers.index');
    Route::get('offers/create', [OfferController::class, 'create'])->name('offers.create'); // CORRECTED ROUTE
    Route::post('offers', [OfferController::class, 'store'])->name('offers.store');
    Route::get('offers/{offer}', [OfferController::class, 'show'])->name('offers.show'); // Corrected route parameter syntax
    Route::get('offers/{offer}/edit', [OfferController::class, 'edit'])->name('offers.edit'); // Corrected route parameter syntax
    Route::put('offers/{offer}', [OfferController::class, 'update'])->name('offers.update');
    Route::delete('offers/{offer}', [OfferController::class, 'destroy'])->name('offers.destroy');

    // Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::resource('users', UserController::class);
    // Route::delete('/users/{user}', [UserController::class, 'destroy']);

    Route::get('/messages', [MessageController::class, 'adminIndex'])->name('messages.index'); // admin.messages.index
    Route::get('/messages/{message}', [MessageController::class, 'show'])->name('messages.show'); // admin.messages.show
    Route::delete('/messages/{message}', [MessageController::class, 'destroy'])->name('messages.destroy');
});

Route::get('/show_offers', [OfferController::class, 'publicOffers'])->name('offers.show.offers');


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
