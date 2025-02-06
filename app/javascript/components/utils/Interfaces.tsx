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
  listings: Listing[];
  main_photo: Photo;
  photos: Photo[];
  slug: string;
  listing_prices?: [string, [string[]]];
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
  children?: any;
  method?: string;
}

export interface StatsFilter {
  Quartos: string;
  Casas_de_Banho: string;
  Area_do_terreno: string;
  Area_util: string;
  Area_bruta_CP: string;
  Ano_de_construção: string;
}
