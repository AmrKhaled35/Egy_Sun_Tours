import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Camera, Star, Phone, TrendingUp, Users, Globe, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Dashboard - Admin Panel',
  description: 'Admin dashboard overview',
};

const quickAccessCards = [
  {
    title: 'Trips',
    description: 'Manage tours and experiences',
    icon: MapPin,
    href: '/admin/trips',
    color: 'bg-blue-500',
    count: '6 Active Tours'
  },
  {
    title: 'Gallery',
    description: 'Manage photos and videos',
    icon: Camera,
    href: '/admin/gallery',
    color: 'bg-green-500',
    count: '24 Images'
  },
  {
    title: 'Reviews',
    description: 'Manage customer reviews',
    icon: Star,
    href: '/admin/reviews',
    color: 'bg-yellow-500',
    count: '161 Reviews'
  },
  {
    title: 'Contact',
    description: 'Manage contact information',
    icon: Phone,
    href: '/admin/contact',
    color: 'bg-purple-500',
    count: 'Contact Info'
  },
];

const stats = [
  {
    title: 'Total Trips',
    value: '6',
    icon: MapPin,
    change: '+2 this month'
  },
  {
    title: 'Gallery Items',
    value: '24',
    icon: Camera,
    change: '+8 this week'
  },
  {
    title: 'Customer Reviews',
    value: '161',
    icon: Star,
    change: '5.0 avg rating'
  },
  {
    title: 'Happy Travelers',
    value: '500+',
    icon: Users,
    change: '+50 this month'
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to Egy Sun Tours Admin Panel</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-full">
                    <Icon className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickAccessCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Link key={index} href={card.href}>
                <Card className="border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`${card.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{card.description}</p>
                    <p className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full inline-block">
                      {card.count}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-green-100 p-2 rounded-full">
                  <Star className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">New 5-star review received</p>
                  <p className="text-sm text-gray-600">Sarah Johnson left a review for Pyramids tour</p>
                </div>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Camera className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Gallery updated</p>
                  <p className="text-sm text-gray-600">8 new photos added to gallery</p>
                </div>
                <span className="text-xs text-gray-500">1 day ago</span>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-purple-100 p-2 rounded-full">
                  <MapPin className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">New trip added</p>
                  <p className="text-sm text-gray-600">Coptic Cairo Heritage Tour created</p>
                </div>
                <span className="text-xs text-gray-500">3 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}