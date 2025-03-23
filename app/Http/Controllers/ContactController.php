<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Contact/index');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'message' => 'required|string',
            'attachment' => 'nullable|file|mimes:jpeg,png,pdf|max:2048', // Example file types
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $data = $validator->validated();

        if ($request->hasFile('attachment')) {
            $file = $request->file('attachment');
            $path = $file->store('attachments', 'public'); // Store in storage/app/public/attachments
            $data['attachment'] = $path; // Store the path in the database
        }

        Contact::create($data);

        return redirect()->route('contact.index')->with('success', 'Your message has been sent!');
    }

    public function dashboard(): Response
    {
        return Inertia::render('Dashboard');
    }

    public function getContacts()
    {
        $contacts = Contact::orderBy('created_at', 'desc')->get();
        return response()->json($contacts);
    }
}
