import axios from "axios";

export const BASE_URL = "http://localhost:3000";
export const API_URL = `${BASE_URL}/api/v1`;

function current_locale() {
  const locale = window.location.pathname.split("/")[1];

  if (locale === "en" || locale === "pt") {
    return locale;
  } else {
    return "pt";
  }
}

export async function find_all_listings(page = 1) {
  return axios
    .get(`${API_URL}/listings?page=${page}&locale=${current_locale()}`)
    .then(response => response.data);
}

export async function find_all_backoffice_listings(order = "order") {
  return axios
    .get(
      `${API_URL}/backoffice/listings?&locale=${current_locale()}&order=${order}`
    )
    .then(response => response.data);
}

export async function find_listing_by_id(id) {
  return axios
    .get(`${API_URL}/listings/${id}?locale=${current_locale()}`)
    .then(response => response.data);
}

export async function find_all_listings_by_geography() {
  const response = await axios.get(
    `${API_URL}/listings/by_geography?locale=${current_locale()}`
  );
  return response.data;
}

export async function find_all_photos() {
  return axios
    .get(`${API_URL}/photos?locale=${current_locale()}`)
    .then(response => response.data);
}

export async function find_all_testimonials() {
  return axios
    .get(`${API_URL}/testimonials?locale=${current_locale()}`)
    .then(response => response.data);
}

export async function find_all_results() {
  return axios
    .get(`${API_URL}/results?locale=${current_locale()}`)
    .then(response => response.data);
}

export async function find_all_listing_complexes(page = 1) {
  return axios
    .get(`${API_URL}/listing_complexes?page=${page}&locale=${current_locale()}`)
    .then(response => response.data);
}

export async function find_all_backoffice_listing_complexes() {
  return axios
    .get(`${API_URL}/backoffice/listing_complexes?&locale=${current_locale()}`)
    .then(response => response.data);
}

export async function find_listing_complex_by_id(id) {
  return axios
    .get(`${API_URL}/listing_complexes/${id}?locale=${current_locale()}`)
    .then(response => response.data);
}

export async function find_all_blog_posts(page = 1) {
  return axios
    .get(`${API_URL}/blog_posts?page=${page}&locale=${current_locale()}`)
    .then(response => response.data);
}

export async function find_blog_post_by_id(id) {
  return axios
    .get(`${API_URL}/blog_posts/${id}?locale=${current_locale()}`)
    .then(response => response.data);
}

export async function find_all_backoffice_variables() {
  return axios
    .get(`${API_URL}/backoffice/variables`)
    .then(response => response.data);
}

export async function find_all_backoffice_newsletter_subscriptions() {
  return axios
    .get(`${API_URL}/backoffice/newsletter_subscriptions`)
    .then(response => response.data);
}
