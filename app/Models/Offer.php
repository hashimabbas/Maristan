<?php
// app/Models/Offer.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\App; // Import App facade

class Offer extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'title_ar',
        'slug',
        'description',
        'description_ar',
        'discount_percentage',
        'start_date',
        'end_date',
        'is_active',
        "image",
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'is_active' => 'boolean',
    ];


    protected static function boot()
    {
        parent::boot();

        static::creating(function ($offer) {
            $offer->slug = Str::slug($offer->title); // Default to English title for slug

            $count = static::where('slug', $offer->slug)->count();

            if ($count > 0) {
                $offer->slug = $offer->slug . '-' . ($count + 1);
            }
        });
    }

    // Accessors for localized fields
    public function getTitleAttribute($value)
    {
        $locale = App::getLocale();
        if ($locale === 'ar' && !empty($this->attributes['title_ar'])) {
            return $this->attributes['title_ar'];
        }
        return $value; // Return English title by default
    }

    public function getDescriptionAttribute($value)
    {
        $locale = App::getLocale();
        if ($locale === 'ar' && !empty($this->attributes['description_ar'])) {
            return $this->attributes['description_ar'];
        }
        return $value; // Return English description by default
    }
}
