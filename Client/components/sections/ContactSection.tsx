"use client";
import Image from 'next/image';
import { MessageCircle, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { siteData } from '@/data/site-data';

const ContactSection = () => {
  const contactMethods = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: siteData.contact.whatsapp,
      href: `https://wa.me/${siteData.contact.whatsapp.replace(/[^0-9]/g, '')}`,
      color: "text-green-600"
    },
    {
      icon: Mail,
      label: "Email",
      value: siteData.contact.email,
      href: `mailto:${siteData.contact.email}`,
      color: "text-blue-600"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Cairo, Egypt",
      href: "#",
      color: "text-red-600"
    },
    {
      icon: Phone,
      label: "Call Us",
      value: siteData.contact.whatsapp,
      href: `tel:${siteData.contact.whatsapp}`,
      color: "text-amber-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="animate-fade-in">
            <div className="relative">
              <div className="aspect-square relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg"
                  alt="Get in touch with Egy Sun Tours"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Get In Touch <span className="text-amber-600">With Us</span>
          </h2>
            <p className="text-lg text-gray-600 mb-8">
              Ready to explore Egypt? Contact us today to plan your perfect Egyptian adventure. 
              We&apos;re here to answer all your questions and create a customized experience just for you.
            </p>

            {/* Contact Methods */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-4">
                      <a href={method.href} className="flex items-center space-x-3">
                        <IconComponent className={`w-6 h-6 ${method.color}`} />
                        <div>
                          <p className="font-medium text-gray-900">{method.label}</p>
                          <p className="text-sm text-gray-600">{method.value}</p>
                        </div>
                      </a>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white flex-1"
                asChild
              >
                <a 
                  href={`https://wa.me/${siteData.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2"
                >
                  <MessageCircle size={20} />
                  <span>Chat on WhatsApp</span>
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white flex-1"
                asChild
              >
                <a 
                  href={`mailto:${siteData.contact.email}`}
                  className="inline-flex items-center justify-center space-x-2"
                >
                  <Mail size={20} />
                  <span>Send Email</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;