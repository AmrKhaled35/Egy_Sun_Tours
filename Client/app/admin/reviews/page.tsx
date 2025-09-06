"use client";
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Star, Calendar, User, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { allReviews } from '@/data/reviews-data';
import { apiClient } from '@/lib/api';
// import { apiClient } from '@/lib/api';

interface Review {
  id: number;
  name: string;
  username: string;
  rating: number;
  title: string;
  excerpt: string;
  fullText: string;
  date: string;
  location: string;
  tourType: string;
}

export default function ReviewsAdmin() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [formData, setFormData] = useState<Partial<Review>>({
    name: '',
    username: '',
    rating: 5,
    title: '',
    fullText: '',
    date: '',
    location: '',
    tourType: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      username: '',
      rating: 5,
      title: '',
      fullText: '',
      date: '',
      location: '',
      tourType: ''
    });
    setEditingReview(null);
    setShowForm(false);
  };
  useEffect(() => {
    const fetchReviewsItems = async () => {
      try {
        const data = await apiClient.getReviews();
        setReviews(data.results);
      } catch (error) {
        console.error("Error fetching trips:", error);
        alert("Failed to fetch GalleryItems from API");
      }
    };

    fetchReviewsItems();
  }, []);

  const handleEdit = (review: Review) => {
    setFormData(review);
    setEditingReview(review);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/reviews/${id}/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU3MTMyMDU2LCJpYXQiOjE3NTcxMjg0NTYsImp0aSI6IjYxZDY5MGVkYTQ4NTRhYjFhODhjYWJhNTE4MTZjZjkyIiwidXNlcl9pZCI6IjEifQ.rcD87Shq901jJm-4SFedeopVUtInB14N4lzvchgcE34"}`,
          },
        });

        if (!res.ok) throw new Error("Failed to delete item");

        setReviews(reviews.filter((item) => item.id !== id));
        alert("review item deleted successfully!");
      } catch (error) {
        console.error("Error deleting review item:", error);
        alert("Error deleting item. Please try again.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formData.name || !formData.title || !formData.fullText || !formData.location || !formData.tourType) {
      alert("Please fill in all required fields");
      return;
    }
  
    try {
      const reviewData = {
        name: formData.name,
        username: formData.username || "",
        rating: formData.rating || 5,
        title: formData.title,
        excerpt: (formData.fullText?.substring(0, 100) || "") + "...",
        fullText: formData.fullText,
        location: formData.location,
        tourType: formData.tourType,
      };
  
      let res;
      if (editingReview) {
        res = await fetch(`http://127.0.0.1:8000/api/reviews/${editingReview.id}/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU3MTMyMDU2LCJpYXQiOjE3NTcxMjg0NTYsImp0aSI6IjYxZDY5MGVkYTQ4NTRhYjFhODhjYWJhNTE4MTZjZjkyIiwidXNlcl9pZCI6IjEifQ.rcD87Shq901jJm-4SFedeopVUtInB14N4lzvchgcE34"}`
          },
          body: JSON.stringify(reviewData),
        });
      } else {
        res = await fetch("http://127.0.0.1:8000/api/reviews/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU3MTMyMDU2LCJpYXQiOjE3NTcxMjg0NTYsImp0aSI6IjYxZDY5MGVkYTQ4NTRhYjFhODhjYWJhNTE4MTZjZjkyIiwidXNlcl9pZCI6IjEifQ.rcD87Shq901jJm-4SFedeopVUtInB14N4lzvchgcE34"}`
          },
          body: JSON.stringify(reviewData),
        });
      }
  
      if (!res.ok) throw new Error("Failed to save review");
  
      const savedReview = await res.json();
  
      if (editingReview) {
        setReviews(
          reviews.map((review) =>
            review.id === editingReview.id ? savedReview : review
          )
        );
        alert("Review updated successfully!");
      } else {
        setReviews([...reviews, savedReview]);
        alert("Review added successfully!");
      }
  
      resetForm();
    } catch (error) {
      console.error("Error saving review:", error);
      alert("Error saving review. Please try again.");
    }
  };
  
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

      {/* Add/Edit Review Form */}
      {showForm && (
        <Card className="border-2 border-black">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {editingReview ? 'Edit Review' : 'Add New Review'}
              </h2>
              <Button variant="ghost" onClick={resetForm}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Customer Name *</label>
                  <Input 
                    value={formData.name || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter customer name"
                    className="border-gray-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Username</label>
                  <Input 
                    value={formData.username || ''}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    placeholder="Enter username"
                    className="border-gray-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Rating *</label>
                  <select 
                    value={formData.rating || 5}
                    onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Date *</label>
                  <Input 
                    value={formData.date || ''}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    placeholder="e.g., December 2024"
                    className="border-gray-300"
                    // required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Location *</label>
                  <Input 
                    value={formData.location || ''}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="e.g., Cairo, Egypt"
                    className="border-gray-300"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Review Title *</label>
                  <Input 
                    value={formData.title || ''}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Enter review title"
                    className="border-gray-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Tour Type *</label>
                  <Input 
                    value={formData.tourType || ''}
                    onChange={(e) => setFormData({...formData, tourType: e.target.value})}
                    placeholder="e.g., Cultural Tour"
                    className="border-gray-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Review Text *</label>
                <Textarea 
                  value={formData.fullText || ''}
                  onChange={(e) => setFormData({...formData, fullText: e.target.value})}
                  placeholder="Enter the full review text"
                  className="border-gray-300"
                  rows={6}
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                  <Save className="w-4 h-4 mr-2" />
                  {editingReview ? 'Update Review' : 'Add Review'}
                </Button>
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={resetForm}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Existing Reviews */}
      <div>
        <h2 className="text-xl font-bold mb-6">Customer Reviews ({reviews.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
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
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEdit(review)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDelete(review.id)}
                      >
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