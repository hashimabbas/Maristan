<?php

namespace App\Http\Controllers;

use App\Models\Visit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VisitController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'page_url' => 'required|url',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $visit = new Visit();
        $visit->ip_address = $request->ip();      // Get IP address
        $visit->user_agent = $request->userAgent(); // Get user agent
        $visit->page_url = $request->input('page_url');
        $visit->save();

        return response()->json(['message' => 'Visit recorded'], 201);
    }

    public function index(Request $request) {
        // Example: Get the last 7 days of visits.
        $visits = Visit::whereBetween('visited_at', [now()->subDays(7), now()])->get();

        return response()->json($visits);
    }
}
