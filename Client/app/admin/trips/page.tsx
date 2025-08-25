"use client";
import { useState } from 'react';
import { Plus, Edit, Trash2, Clock, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { allTrips } from '@/data/trips-data';

export default function TripsAdmin() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    duration: '',
    price: '',
    category: '',
    highlights: [''],
    timeline: [{ time: '', title: '', description: '', image: '' }]
  });

  const handleAddHighlight = () => {
    setFormData({
      ...formData,
      highlights: [...formData.highlights, '']
    });
  };

  const handleAddTimelineStep = () => {
    setFormData({
      ...formData,
      timeline: [...formData.timeline, { time: '', title: '', description: '', image: '' }]
    });
  };

  const handleHighlightChange = (index: number, value: string) => {
    const newHighlights = [...formData.highlights];
    newHighlights[index] = value;
    setFormData({ ...formData, highlights: newHighlights });
  };

  const handleTimelineChange = (index: number, field: string, value: string) => {
    const newTimeline = [...formData.timeline];
    newTimeline[index] = { ...newTimeline[index], [field]: value };
    setFormData({ ...formData, timeline: newTimeline });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Trips Management</h1>
          <p className="text-gray-600 mt-2">Manage tours and experiences</p>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-black text-white hover:bg-gray-800"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Trip
        </Button>
      </div>

      {/* Add Trip Form */}
      {showForm && (
        <Card className="border-2 border-black">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-6">Add New Trip</h2>
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Trip Name</label>
                  <Input 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Enter trip name"
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Input 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    placeholder="e.g., Historical, Cultural"
                    className="border-gray-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <Input 
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    placeholder="e.g., Full Day (8 hours)"
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Price</label>
                  <Input 
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="e.g., From $80 per person"
                    className="border-gray-300"
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label className="block text-sm font-medium mb-2">Short Description</label>
                <Textarea 
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                  placeholder="Brief description for cards"
                  className="border-gray-300"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Full Description</label>
                <Textarea 
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({...formData, fullDescription: e.target.value})}
                  placeholder="Detailed description for trip page"
                  className="border-gray-300"
                  rows={4}
                />
              </div>

              {/* Highlights */}
              <div>
                <label className="block text-sm font-medium mb-2">What's Included</label>
                {formData.highlights.map((highlight, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input 
                      value={highlight}
                      onChange={(e) => handleHighlightChange(index, e.target.value)}
                      placeholder="Enter highlight"
                      className="border-gray-300"
                    />
                  </div>
                ))}
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleAddHighlight}
                  className="mt-2"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Highlight
                </Button>
              </div>

              {/* Timeline */}
              <div>
                <label className="block text-sm font-medium mb-2">Journey Timeline</label>
                {formData.timeline.map((step, index) => (
                  <div key={index} className="border border-gray-200 p-4 rounded-lg mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <Input 
                        value={step.time}
                        onChange={(e) => handleTimelineChange(index, 'time', e.target.value)}
                        placeholder="Time (e.g., 9:00 AM)"
                        className="border-gray-300"
                      />
                      <Input 
                        value={step.title}
                        onChange={(e) => handleTimelineChange(index, 'title', e.target.value)}
                        placeholder="Step title"
                        className="border-gray-300"
                      />
                    </div>
                    <Textarea 
                      value={step.description}
                      onChange={(e) => handleTimelineChange(index, 'description', e.target.value)}
                      placeholder="Step description"
                      className="border-gray-300 mb-4"
                      rows={2}
                    />
                    <Input 
                      value={step.image}
                      onChange={(e) => handleTimelineChange(index, 'image', e.target.value)}
                      placeholder="Image URL"
                      className="border-gray-300"
                    />
                  </div>
                ))}
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleAddTimelineStep}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Timeline Step
                </Button>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <Button className="bg-black text-white hover:bg-gray-800">
                  Save Trip
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

      {/* Existing Trips */}
      <div>
        <h2 className="text-xl font-bold mb-6">Existing Trips ({allTrips.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allTrips.map((trip) => (
            <Card key={trip.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  <img 
                    src={trip.image} 
                    alt={trip.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                      {trip.category}
                    </span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-gray-900">{trip.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{trip.shortDescription}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{trip.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{trip.price}</span>
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