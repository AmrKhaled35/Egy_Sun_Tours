"use client";
import { useState } from 'react';
import { Plus, Edit, Trash2, Star, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { allReviews } from '@/data/reviews-data';

export default function ReviewsAdmin() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    rating: 5,
    title: '',
    fullText: '',
    date: '',
    location: '',
    tourType: ''
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reviews Management</h1>
          <p className="text-gray-600 mt-2">Manage customer reviews and testimonials</p>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-black text-white hover:bg-gray-800"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Review
        </Button>
      </div>

      {/* Add Review Form */}
      {showForm && (
        <Card className="border-2 border-black">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-6">Add New Review</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Customer Name</label>
                  <Input 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter customer name"
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Username</label>
                  <Input 
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    placeholder="Enter username"
                    className="border-gray-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <select 
                    value={formData.rating}
                    onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <Input 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    placeholder="e.g., December 2024"
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <Input 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="e.g., Cairo, Egypt"
                    className="border-gray-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Review Title</label>
                  <Input 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Enter review title"
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Tour Type</label>
                  <Input 
                    value={formData.tourType}
                    onChange={(e) => setFormData({...formData, tourType: e.target.value})}
                    placeholder="e.g., Cultural Tour"
                    className="border-gray-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Review Text</label>
                <Textarea 
                  value={formData.fullText}
                  onChange={(e) => setFormData({...formData, fullText: e.target.value})}
                  placeholder="Enter the full review text"
                  className="border-gray-300"
                  rows={6}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button className="bg-black text-white hover:bg-gray-800">
                  Add Review
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Reviews */}
      <div>
        <h2 className="text-xl font-bold mb-6">Customer Reviews ({allReviews.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allReviews.map((review) => (
            <Card key={review.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {renderStars(review.rating)}
                      <span className="ml-2 text-sm text-gray-600">({review.rating}/5)</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-bold text-gray-900 line-clamp-2">{review.title}</h3>
                  
                  {/* Review Text */}
                  <p className="text-sm text-gray-600 line-clamp-3">{review.fullText}</p>
                  
                  {/* Meta Info */}
                  <div className="space-y-2 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3" />
                      <span>{review.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      <span>{review.date}</span>
                    </div>
                    <div className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs inline-block">
                      {review.tourType}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}