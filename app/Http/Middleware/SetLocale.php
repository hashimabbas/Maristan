<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\URL; // Import the URL facade
use Inertia\Inertia;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $locale = $request->route('locale');

        if ($locale && in_array($locale, ['en', 'ar'])) {
            App::setLocale($locale);
            Session::put('locale', $locale); // Store locale in session
            Inertia::share('locale', $locale);  // Share with Inertia
        } else {
            // If no locale is in the URL, or the locale is invalid, use the session locale or the default
            $locale = Session::get('locale', config('app.locale'));
            App::setLocale($locale);
            Inertia::share('locale', $locale);  // Share with Inertia

            // Redirect to the default URL
            // return redirect('/en');
        }

        return $next($request);
    }
}
