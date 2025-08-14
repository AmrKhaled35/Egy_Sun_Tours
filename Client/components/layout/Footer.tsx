import Link from 'next/link';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { siteData } from '@/data/site-data';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-amber-400 mb-4">Egy Sun Tours</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Your gateway to discovering the rich culture, history, and beauty of Egypt. 
              We specialize in providing personalized and immersive tours.
            </p>
            <div className="flex space-x-4">
              <a 
                href={`https://wa.me/${siteData.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 p-2 rounded-full transition-colors"
              >
                <MessageCircle size={20} />
              </a>
              <a 
                href={`mailto:${siteData.contact.email}`}
                className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <MapPin size={16} className="text-amber-400" />
                <span className="text-gray-300">Cairo, Egypt</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-amber-400" />
                <span className="text-gray-300">{siteData.contact.whatsapp}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-amber-400" />
                <span className="text-gray-300">{siteData.contact.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Egy Sun Tours. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;