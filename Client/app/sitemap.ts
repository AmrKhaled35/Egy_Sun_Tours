import { MetadataRoute } from 'next';
import { allReviews } from '@/data/reviews-data';
import { allTrips } from '@/data/trips-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://egysuntours.com';
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/trips`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];
  const reviewPages = allReviews.map((review) => ({
    url: `${baseUrl}/reviews/${review.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  const tripPages = allTrips.map((trip) => ({
    url: `${baseUrl}/trips/${trip.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...reviewPages, ...tripPages];
}