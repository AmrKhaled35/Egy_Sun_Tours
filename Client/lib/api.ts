const API_BASE_URL = 'http://127.0.0.1:8000/api';

interface Trip {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  price: string;
  image: string;
  category: string;
  highlights: string[];
  timeline: {
    time: string;
    title: string;
    description: string;
    image: string;
  }[];
  gallery: string[];
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async getTrips(): Promise<Trip[]> {
    return this.request<Trip[]>('/trips');
  }

  async createTrip(formData: FormData): Promise<Trip> {
    return this.request<Trip>('/trips', {
      method: 'POST',
      body: formData, 
    });
  }

  async updateTrip(id: number, formData: FormData): Promise<Trip> {
    return this.request<Trip>(`/trips/${id}`, {
      method: 'PUT',
      body: formData, 
    });
  }

  async deleteTrip(id: number) {
    return this.request(`/trips/${id}`, { method: 'DELETE' });
  }

  async getGalleryItems() {
    return this.request('/gallery');
  }

  async createGalleryItem(item: any) {
    return this.request('/gallery', { method: 'POST', body: JSON.stringify(item) });
  }

  async deleteGalleryItem(id: number) {
    return this.request(`/gallery/${id}`, { method: 'DELETE' });
  }

  async getReviews() {
    return this.request('/reviews');
  }

  async getTripById(id: number) {
    return this.request(`/trips/${id}`);
  }

  async createReview(review: any) {
    return this.request('/reviews', { method: 'POST', body: JSON.stringify(review) });
  }

  async updateReview(id: number, review: any) {
    return this.request(`/reviews/${id}`, { method: 'PUT', body: JSON.stringify(review) });
  }

  async deleteReview(id: number) {
    return this.request(`/reviews/${id}`, { method: 'DELETE' });
  }

  async getContactInfo() {
    return this.request('/contact');
  }

  async updateContactInfo(contact: any) {
    return this.request('/contact', { method: 'PUT', body: JSON.stringify(contact) });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

export const localStorageApi = {
  getTrips: () => JSON.parse(localStorage.getItem('trips') || '[]'),
  saveTrips: (trips: any[]) => localStorage.setItem('trips', JSON.stringify(trips)),

  getGalleryItems: () => JSON.parse(localStorage.getItem('galleryItems') || '[]'),
  saveGalleryItems: (items: any[]) => localStorage.setItem('galleryItems', JSON.stringify(items)),

  getReviews: () => JSON.parse(localStorage.getItem('reviews') || '[]'),
  saveReviews: (reviews: any[]) => localStorage.setItem('reviews', JSON.stringify(reviews)),

  getContactInfo: () => JSON.parse(localStorage.getItem('contactInfo') || 'null'),
  saveContactInfo: (contact: any) => localStorage.setItem('contactInfo', JSON.stringify(contact)),
};
