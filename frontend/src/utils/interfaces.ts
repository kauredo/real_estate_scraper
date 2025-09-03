declare global {
  interface Window {
    Routes: any;
  }
}

export interface Variable {
  name: string;
  value: string;
  icon: string;
}

export interface ResultNumbers {
  listingCount: number;
  variables: Variable[];
}

export interface Photo {
  id: number;
  image: { url: string };
  image_url: string;
  main: boolean;
  order: number;
  listing_complex_id: number;
  listings: Listing[];
}

export interface ListingComplex {
  id: number;
  name: string;
  video_link: string;
  description: string;
  subtext: string;
  final_text: string;
  location: string;
  price_from: number;
  features: string[];
  listings: Listing[];
  main_photo: Photo;
  photos: Photo[];
  thumbnail_url: string;
  banner_image_url?: string;
  slug: string;
  listing_prices?: [string, [string[]]];
  new_format: boolean;
}

export interface Listing {
  id: number;
  stats: {
    [key: string]: string;
  };
  address: string;
  features: string[];
  price: number;
  title: string;
  url: string;
  description: string;
  photos: string[];
  listing_complex_id: number;
  status: string;
  slug: string;
  video_link: string;
  virtual_tour_url: string;
  objective: string;
  kind: string;
  order?: number;
  deleted_at?: string;
}

export interface Pagy {
  count: number;
  first_url: string;
  from: number;
  in: number;
  items: number;
  last: number;
  last_url: string;
  next: number;
  next_url: string;
  page: number;
  page_url: string;
  pages: number;
  prev: null;
  prev_url: string;
  scaffold_url: string;
  series: string[];
  to: number;
}

export interface Testimonial {
  id: number;
  text: string;
  name: string;
}

export interface NavbarItemProps {
  title: string;
  url?: string;
  turbo?: string;
  hover?: string;
  img?: any;
  items?: NavbarItemProps[];
  children?: React.ReactNode;
  method?: string;
  onClick?: () => void;
}

export interface SubNavItem {
  routeName: string;
  title: string;
  description?: string;
}

export interface StatsFilter {
  Quartos: string;
  Casas_de_Banho: string;
  Area_do_terreno: string;
  Area_util: string;
  Area_bruta_CP: string;
  Ano_de_construção: string;
}

export interface ClubStory {
  id: number;
  title: string;
  small_description: string;
  text: string;
  slug: string;
  main_photo?: string;
  sample_text: string;
  meta_title?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
  video_link?: string;
  club_story_photos?: ClubStoryPhoto[];
}

export interface ClubStoryPhoto {
  id: number;
  image_url: string;
  main: boolean;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  small_description: string;
  text: string;
  sanitized_text: string;
  sample_text: string;
  video_link: string;
  meta_title: string;
  meta_description: string;
  hidden: boolean;
  created_at: string;
  updated_at: string;
  main_photo: string;
  blog_photos: BlogPostPhoto[];
}

export interface BlogPostPhoto {
  id: number;
  image_url: string;
  main: boolean;
}
