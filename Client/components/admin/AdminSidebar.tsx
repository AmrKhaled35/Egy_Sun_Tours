"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Logo from '../../images/logo.png'
import { 
  LayoutDashboard, 
  MapPin, 
  Camera, 
  Star, 
  Phone,
  Sun
} from 'lucide-react';

const AdminSidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Trips',
      href: '/admin/trips',
      icon: MapPin,
    },
    {
      name: 'Gallery',
      href: '/admin/gallery',
      icon: Camera,
    },
    {
      name: 'Reviews',
      href: '/admin/reviews',
      icon: Star,
    },
    {
      name: 'Contact',
      href: '/admin/contact',
      icon: Phone,
    },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-[17rem] bg-black text-white shadow-lg">
      <div className="p-6 border-b border-gray-800">
        <Link href="/admin" className="flex items-center space-x-1">
        <Image
              src={Logo}
              alt="Egy Sun Tours Logo"
              width={70}
              height={70}
              className="rounded-full"
            />
          <div>
            <h1 className="text-xl font-bold">Egy Sun Tours</h1>
            <p className="text-sm text-gray-400">Admin Panel</p>
          </div>
        </Link>
      </div>
      <nav className="mt-8">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-amber-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
        <Link
          href="/"
          className="flex items-center justify-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <span className="text-sm">← Back to Website</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;