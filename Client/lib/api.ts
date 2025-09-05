const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async getTrips() {
    return this.request('/trips');
  }

  async createTrip(trip: any) {
    return this.request('/trips', {
      method: 'POST',
      body: JSON.stringify(trip),
    });
  }

  async updateTrip(id: number, trip: any) {
    return this.request(`/trips/${id}`, {
      method: 'PUT',
      body: JSON.stringify(trip),
    });
  }

  async deleteTrip(id: number) {
    return this.request(`/trips/${id}`, {
      method: 'DELETE',
    });
  }
  async getGalleryItems() {
    return this.request('/gallery');
  }

  async createGalleryItem(item: any) {
    return this.request('/gallery', {
      method: 'POST',
      body: JSON.stringify(item),
    });
  }

  async deleteGalleryItem(id: number) {
    return this.request(`/gallery/${id}`, {
      method: 'DELETE',
    });
  }
  async getReviews() {
    return this.request('/reviews');
  }
  async getTripById(id: number) {
    return this.request(`/trips/${id}`);
  }

  async createReview(review: any) {
    return this.request('/reviews', {
      method: 'POST',
      body: JSON.stringify(review),
    });
  }

  async updateReview(id: number, review: any) {
    return this.request(`/reviews/${id}`, {
      method: 'PUT',
      body: JSON.stringify(review),
    });
  }

  async deleteReview(id: number) {
    return this.request(`/reviews/${id}`, {
      method: 'DELETE',
    });
  }
  async getContactInfo() {
    return this.request('/contact');
  }

  async updateContactInfo(contact: any) {
    return this.request('/contact', {
      method: 'PUT',
      body: JSON.stringify(contact),
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export const localStorageApi = {
  // Trips
  getTrips: () => {
    const trips = localStorage.getItem('trips');
    return trips ? JSON.parse(trips) : [];
  },
  
  saveTrips: (trips: any[]) => {
    localStorage.setItem('trips', JSON.stringify(trips));
  },
  getGalleryItems: () => {
    const items = localStorage.getItem('galleryItems');
    return items ? JSON.parse(items) : [];
  },
  
  saveGalleryItems: (items: any[]) => {
    localStorage.setItem('galleryItems', JSON.stringify(items));
  },
  getReviews: () => {
    const reviews = localStorage.getItem('reviews');
    return reviews ? JSON.parse(reviews) : [];
  },
  
  saveReviews: (reviews: any[]) => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  },
  getContactInfo: () => {
    const contact = localStorage.getItem('contactInfo');
    return contact ? JSON.parse(contact) : null;
  },
  
  saveContactInfo: (contact: any) => {
    localStorage.setItem('contactInfo', JSON.stringify(contact));
  }
};