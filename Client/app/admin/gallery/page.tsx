"use client";
import { useState } from 'react';
import { Plus, Edit, Trash2, Image as ImageIcon, Video } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const galleryItems = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg",
    alt: "Great Pyramids of Giza at sunset",
    category: "Pyramids",
    type: "image"
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/5935658/pexels-photo-5935658.jpeg",
    alt: "Ancient Egyptian hieroglyphs on temple walls",
    category: "Temples",
    type: "image"
  },
  {
    id: 3,
    image: "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4",
    alt: "Ancient Egyptian temple tour video",
    category: "Temples",
    type: "video"
  },
  // Add more items as needed
];

export default function GalleryAdmin() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    image: '',
    alt: '',
    category: '',
    type: 'image'
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
          <p className="text-gray-600 mt-2">Manage photos and videos</p>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-black text-white hover:bg-gray-800"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Media
        </Button>
      </div>

      {/* Add Media Form */}
      {showForm && (
        <Card className="border-2 border-black">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-6">Add New Media</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Media URL</label>
                  <Input 
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    placeholder="Enter image/video URL"
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Input 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    placeholder="e.g., Pyramids, Temples"
                    className="border-gray-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Alt Text</label>
                  <Input 
                    value={formData.alt}
                    onChange={(e) => setFormData({...formData, alt: e.target.value})}
                    placeholder="Describe the image/video"
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button className="bg-black text-white hover:bg-gray-800">
                  Add Media
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

      <div>
        <h2 className="text-xl font-bold mb-6">Gallery Items ({galleryItems.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryItems.map((item) => (
            <Card key={item.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4 overflow-hidden relative">
                  {item.type === 'video' ? (
                    <>
                      <video 
                        src={item.image} 
                        className="w-full h-full object-cover"
                        muted
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Video className="w-8 h-8 text-white" />
                      </div>
                    </>
                  ) : (
                    <Image 
                      src={item.image} 
                      alt={item.alt}
                      className="w-full h-full object-cover"
                      layout="fill"
                      objectFit="cover"
                    />
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1">
                      {item.type === 'video' ? (
                        <Video className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ImageIcon className="w-4 h-4 text-gray-500" />
                      )}
                      <span className="text-xs text-gray-500 capitalize">{item.type}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2">{item.alt}</p>
                  
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
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