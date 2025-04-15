<?php

namespace App\Http\Controllers;

use App\Models\Dashboard; // Use the correct model
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\MessageResource; // Optional: For consistent data shaping
use App\Models\Message;
use App\Models\Offer;
use App\Models\Visit;


class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        // Note: Count unique visitors might require different logic
        // e.g., Visit::distinct('session_id')->count() or Visit::distinct('ip_address')->count()
        // For simplicity, we use total visits here.
        $visitorCount = Visit::count();
        $messageCount = Message::count();
        $offerCount = Offer::count();

        $breadcrumbs = [
            ['title' => 'Dashboard', 'href' => route('dashboard')]
        ];

        return Inertia::render('Dashboard', [
            'stats' => [
                'visitors' => $visitorCount,
                'messages' => $messageCount,
                'offers' => $offerCount,
            ],
            'breadcrumbs' => $breadcrumbs,
            // Pass any other necessary props like auth, flash messages etc.
            // 'auth' => ...,
            // 'flash' => ...,
        ]);
    }
}
