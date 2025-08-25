"use client";
import { useState } from 'react';
import { Save, Phone, Mail, MapPin, Globe, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { siteData } from '@/data/site-data';

export default function ContactAdmin() {
  const [formData, setFormData] = useState({
    phone: siteData.contact.whatsapp,
    email: siteData.contact.email,
    address: 'Cairo, Egypt',
    website: 'https://egysuntours.com',
    facebook: '',
    instagram: '',
    twitter: '',
    tripadvisor: siteData.contact.tripadvisor,
    businessHours: 'Monday - Sunday: 8:00 AM - 10:00 PM',
    emergencyContact: siteData.contact.whatsapp,
    description: 'Your gateway to discovering the rich culture, history, and beauty of Egypt.'
  });

  const handleSave = () => {
    // Here you would typically save to a database or API
    alert('Contact information saved successfully!');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Management</h1>
          <p className="text-gray-600 mt-2">Manage contact information and social links</p>
        </div>
        <Button 
          onClick={handleSave}
          className="bg-black text-white hover:bg-gray-800"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Basic Contact Info */}
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              Basic Contact Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <Input 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="Enter phone number"
                  className="border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <Input 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Enter email address"
                  className="border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <Input 
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Enter business address"
                  className="border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Website</label>
                <Input 
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  placeholder="Enter website URL"
                  className="border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Emergency Contact</label>
                <Input 
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                  placeholder="Enter emergency contact"
                  className="border-gray-300"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media Links */}
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Social Media & Online Presence
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Facebook</label>
                <Input 
                  value={formData.facebook}
                  onChange={(e) => setFormData({...formData, facebook: e.target.value})}
                  placeholder="Enter Facebook URL"
                  className="border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Instagram</label>
                <Input 
                  value={formData.instagram}
                  onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                  placeholder="Enter Instagram URL"
                  className="border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Twitter</label>
                <Input 
                  value={formData.twitter}
                  onChange={(e) => setFormData({...formData, twitter: e.target.value})}
                  placeholder="Enter Twitter URL"
                  className="border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">TripAdvisor</label>
                <Input 
                  value={formData.tripadvisor}
                  onChange={(e) => setFormData({...formData, tripadvisor: e.target.value})}
                  placeholder="Enter TripAdvisor URL"
                  className="border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">WhatsApp Business</label>
                <Input 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="Enter WhatsApp number"
                  className="border-gray-300"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Hours */}
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Business Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Business Hours</label>
                <Textarea 
                  value={formData.businessHours}
                  onChange={(e) => setFormData({...formData, businessHours: e.target.value})}
                  placeholder="Enter business hours"
                  className="border-gray-300"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Business Description</label>
                <Textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter business description"
                  className="border-gray-300"
                  rows={4}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Preview */}
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-6">Contact Information Preview</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-gray-600">{formData.phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-gray-600">{formData.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-red-600" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-sm text-gray-600">{formData.address}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <MessageCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">WhatsApp</p>
                  <p className="text-sm text-gray-600">Available 24/7</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}