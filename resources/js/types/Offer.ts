//resources/js/type/Offer.ts
export interface Offer {
  id?: number; // Make id optional
  title: string;
  slug: string;
  description: string;
  discount_percentage: number;
  start_date: string; // Consider using Date objects after parsing from JSON
  end_date: string;
  image: string | null;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  image_url?: string;
}
