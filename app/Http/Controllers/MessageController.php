<?php

namespace App\Http\Controllers;

use App\Models\Message; // Use the correct model
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\MessageResource; // Optional: For consistent data shaping

class MessageController extends Controller
{
    /**
     * Display the public contact form.
     * (Keep this if you still need the public form separate)
     */
    // In MessageController.php
    public function publicIndex(): Response
    {
        // Assuming you have a separate public contact page component
        return Inertia::render('Contact/index'); // Or your actual public form component path
    }

public function adminIndex(Request $request): Response
{
    $paginatedMessages = Message::latest()->paginate(15)->withQueryString();

    return Inertia::render('Admin/Messages/Index', [
        // Use the resource collection - this wraps the paginator automatically
        'messages' => MessageResource::collection($paginatedMessages),
        'breadcrumbs' => [
            ['title' => 'Dashboard', 'href' => route('dashboard')],
            ['title' => 'Messages', 'href' => route('messages.index')]
        ],
        'filters' => $request->only(['search', 'status']),
    ]);
}
    /**
     * Store a new message from the public contact form.
     * (Keep this as is)
     */
    public function store(Request $request): RedirectResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'message' => 'required|string',
            // Adjust max size and mime types as needed
            'attachment' => 'nullable|file|mimes:jpg,jpeg,png,pdf,doc,docx,txt|max:5120', // 5MB Example
        ]);

        // Use validate() for automatic redirection with errors
        $validatedData = $validator->validate();

        if ($request->hasFile('attachment')) {
            // Store in storage/app/public/attachments - ensure storage link exists
            $path = $request->file('attachment')->store('attachments', 'public');
            $validatedData['attachment'] = $path; // Store the relative path
        }

        Message::create($validatedData);

        // Redirect back to the page they came from (usually the contact form)
        // or to a dedicated success page.
        return back()->with('success', 'Your message has been sent!');
    }

// In MessageController.php

    public function show(Message $message): Response
    {
        // ...
        return Inertia::render('Admin/Messages/Show', [
            'message' => new MessageResource($message), // Assuming MessageResource is set up
            'breadcrumbs' => [
                ['title' => 'Dashboard', 'href' => route('dashboard')],
                ['title' => 'Messages', 'href' => route('messages.index')], // CORRECTED
                ['title' => 'View Message', 'href' => route('messages.show', $message->id)], // CORRECTED
            ]
        ]);
    }

    public function destroy(Message $message): RedirectResponse
    {
        // ... delete logic ...

        return redirect()->route('messages.index') // CORRECTED
                        ->with('success', 'Message deleted successfully.');
    }

    // Also update the breadcrumbs in adminIndex if they were wrong initially (though the code snippet looks correct there)


    // Note: An 'edit' or 'update' method for contact messages is uncommon.
    // You might add methods to mark as read/unread or add internal notes instead.
}
