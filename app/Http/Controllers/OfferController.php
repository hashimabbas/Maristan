<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\App; // Import App facade

class OfferController extends Controller
{
    public function index()
    {
        $offers = Offer::orderBy('created_at', 'desc')->get(); // Or paginate
        return Inertia::render('Offers/index', ['offers' => $offers, 'success' => session('success')]);
    }

    public function create()
    {
        return Inertia::render('Offers/Create'); //Frontend rendering for the creation form
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'title_ar' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'description_ar' => 'nullable|string',
            'discount_percentage' => 'required|numeric',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'is_active' => 'boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Adjust mimes and size as needed
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput(); // Redirect back with errors and input
        }

        $validatedData = $validator->validated();

        // Handle Image Upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();

            // Store the image in the 'public' disk under the 'offers' directory
            $imagePath = $image->storeAs('offers', $imageName, 'public'); // 'offers' is a subdirectory in 'public/storage'

            // Store the full path (relative to 'public/storage') in the database.
            $validatedData['image'] = 'offers/' . $imageName;  // Store the path in the validated data
        }

        // Create the Offer
        $offer = Offer::create($validatedData);

        // Optionally, you could return the created offer, or a success message
        return Redirect::route('offers.index')->with('success', 'Offer created successfully.'); // Or redirect with success message using Inertia::location
    }


    public function show(Offer $offer)
    {
        return Inertia::render('Offers/Show', ['offer' => $offer]);
    }

    public function edit(Offer $offer)
    {
        return Inertia::render('Offers/Edit', ['offer' => $offer]);
    }

    public function update(Request $request, Offer $offer)
    {
        // 1. Define Validation Rules (adjust as needed)
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'title_ar' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'description_ar' => ['nullable', 'string'],
            'discount_percentage' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'is_active' => ['required', 'boolean'],
            'image' => [
                'nullable',
                'image',
                'mimes:jpeg,png,jpg,gif,svg,webp',
                'max:2048',
             ],
        ]);

        $updateData = [
            'title' => $validated['title'],
            'title_ar' => $validated['title_ar'],
            'description' => $validated['description'],
            'description_ar' => $validated['description_ar'],
            'discount_percentage' => $validated['discount_percentage'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'is_active' => filter_var($validated['is_active'], FILTER_VALIDATE_BOOLEAN),
        ];


        // 3. Handle the Image Upload CONDITIONALLY
        if ($request->hasFile('image')) {

            if ($offer->image && Storage::disk('public')->exists($offer->image)) {
                 Storage::disk('public')->delete($offer->image);
            }


            $imagePath = $request->file('image')->store('offers', 'public');

            $updateData['image'] = $imagePath;

        }

        $offer->update($updateData);

        return redirect()->route('offers.index')->with('success', 'Offer updated successfully.');

    }

    public function destroy(Offer $offer)
    {
        // Delete the image before deleting the offer
        if ($offer->image) {
            Storage::disk('public')->delete($offer->image);
        }

        $offer->delete();
        return Redirect::route('offers.index')->with('success', 'Offer deleted successfully.');
    }

    public function publicOffers()
    {
       $locale = App::getLocale();
        $offers = Offer::where('is_active', true)
            ->orderBy('start_date')
            ->get();

        return Inertia::render('Offers/ShowPublic/Index', ['offers' => $offers, 'locale' => $locale]);
    }

    // API endpoint to get available offers for the frontend
    public function getAvailableOffers()
    {
        $now = now();
        $offers = Offer::where('is_active', true)
            ->where('start_date', '<=', $now)
            ->where(function ($query) use ($now) {
                $query->whereNull('end_date')
                      ->orWhere('end_date', '>=', $now);
            })
            ->where(function ($query) {
                $query->whereNull('usage_limit')
                      ->orWhereColumn('usage_count', '<', 'usage_limit');
            })
            ->get();

        return response()->json($offers);
    }

    // Example method to apply an offer (this would be part of your checkout/cart logic)
    public function applyOffer(Request $request)
    {
        $offerCode = $request->input('offer_code'); // Assuming you have a field for entering a code
        $offer = Offer::where('code', $offerCode)->first(); // Find the offer by the code

        if (!$offer) {
            return response()->json(['error' => 'Invalid offer code.'], 400);
        }

        if (!$offer->is_active || ($offer->start_date && $offer->start_date > now()) || ($offer->end_date && $offer->end_date < now())) {
            return response()->json(['error' => 'Offer is not currently active.'], 400);
        }

        if ($offer->usage_limit !== null && $offer->usage_count >= $offer->usage_limit) {
            return response()->json(['error' => 'Offer has reached its usage limit.'], 400);
        }

        //Get the cart total amount
        $cartTotal = 100; //Example Value
        $discountAmount = 0;

        if ($offer->discount_percentage) {
            $discountAmount = $cartTotal * ($offer->discount_percentage / 100);
        } elseif ($offer->discount_amount) {
            $discountAmount = min($offer->discount_amount, $cartTotal); //Discount can't be more than the total
        }

        // Logic to apply the discount to the cart/order total here.  For now, just return the amount

        $offer->increment('usage_count');

        return response()->json(['success' => true, 'discount_amount' => $discountAmount]);
    }
}
