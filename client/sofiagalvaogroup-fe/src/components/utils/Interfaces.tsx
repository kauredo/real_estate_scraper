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
  listing_prices?: [string, string[]];
}

export interface Listing {
  id: number;
  stats: {
    [key: string]: string;
  };
  address: string;
  features: string[];
  price: string;
  title: string;
  url: string;
  description: string;
  photos: string[];
  listing_complex_id: number;
  status: string;
  slug: string;
  video_link: string;
  order?: number;
}

export interface Pagy {
  count: number;
  firstUrl: string;
  from: number;
  in: number;
  items: number;
  last: number;
  lastUrl: string;
  next: number;
  nextUrl: string;
  page: number;
  pageUrl: string;
  pages: number;
  prev: null;
  prevUrl: string;
  scaffoldUrl: string;
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
  url: string;
  turbo?: string;
  hover?: string;
  img?: any;
  items?: NavbarItemProps[];
}

export interface BlogPost {
  id: number;
  meta_title: string;
  meta_description: string;
  main_photo: string;
  slug: string;
  title: string;
  date_created: string;
  text: string;
}
