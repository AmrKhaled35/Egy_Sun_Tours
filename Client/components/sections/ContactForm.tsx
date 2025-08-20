"use client";
import { useState } from "react";
import Image from "next/image";
import { MessageCircle, Mail, MapPin, Phone, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteData } from "@/data/site-data";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const contactMethods = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: siteData.contact.whatsapp,
      href: `https://wa.me/${siteData.contact.whatsapp.replace(/[^0-9]/g, "")}`,
      color: "text-green-600",
      description: "Quick response, available 24/7",
    },
    {
      icon: Mail,
      label: "Email",
      value: siteData.contact.email,
      href: `mailto:${siteData.contact.email}`,
      color: "text-blue-600",
      description: "Detailed inquiries and planning",
    },
    {
      icon: Phone,
      label: "Call Us",
      value: siteData.contact.whatsapp,
      href: `tel:${siteData.contact.whatsapp}`,
      color: "text-amber-600",
      description: "Direct phone consultation",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Cairo, Egypt",
      href: "#",
      color: "text-red-600",
      description: "Based in the heart of Egypt",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Hello! I'm interested in booking a tour.%0A%0AName: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0A%0AMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/${siteData.contact.whatsapp.replace(
      /[^0-9]/g,
      ""
    )}?text=${whatsappMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative mb-16">
          <div className="aspect-[21/15] md:aspect-[21/9] lg:aspect-[21/6]relative rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.pexels.com/photos/3722818/pexels-photo-3722818.jpeg"
              alt="Get In Touch - Explore Egypt"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl min-[400px]:text-5xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Get In Touch
                </h1>
                <p className="text-sm md:text-xl lg:text-2xl  max-w-3xl mx-auto">
                  Ready to explore the wonders of ancient Egypt? Contact us
                  today to plan your perfect Egyptian adventure with our expert
                  guides.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <div className="animate-fade-in">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Let&apos;s Plan Your Egyptian Adventure
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We&apos;re here to help you create unforgettable memories in Egypt.
                Whether you&apos;re interested in exploring ancient pyramids, sailing
                the Nile, or discovering hidden gems, our expert guides will
                ensure an authentic and safe experience.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow duration-300 border border-amber-100"
                  >
                    <CardContent className="p-6">
                      <a href={method.href} className="block">
                        <div className="flex items-start space-x-4">
                          <IconComponent
                            className={`w-8 h-8 ${method.color} mt-1`}
                          />
                          <div>
                            <h3 className="font-bold text-gray-900 mb-1">
                              {method.label}
                            </h3>
                            <p className="text-gray-700 font-medium mb-1">
                              {method.value}
                            </p>
                            <p className="text-sm text-gray-500">
                              {method.description}
                            </p>
                          </div>
                        </div>
                      </a>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Business Hours */}
            <Card className="border border-amber-100">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Clock className="w-8 h-8 text-amber-600 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      Business Hours
                    </h3>
                    <div className="space-y-1 text-gray-600">
                      <p>Monday - Sunday: 8:00 AM - 10:00 PM</p>
                      <p>WhatsApp: Available 24/7</p>
                      <p>Emergency Contact: Always available</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="animate-fade-in">
            <Card className="shadow-xl border border-amber-100">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Send Us a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="border-amber-200 focus:border-amber-600"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="border-amber-200 focus:border-amber-600"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="border-amber-200 focus:border-amber-600"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="border-amber-200 focus:border-amber-600"
                      placeholder="Tell us about your travel plans, interests, and any specific requirements..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send via WhatsApp
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-amber-100">
                  <p className="text-sm text-gray-500 text-center">
                    By submitting this form, your message will be sent directly
                    to our WhatsApp for the fastest response.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Image Section */}
        <div className="mt-20 animate-fade-in">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <div className="aspect-[21/9] relative">
              <Image
                src="https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg"
                alt="Contact Egy Sun Tours for your Egyptian adventure"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">
                    Your Egyptian Adventure Awaits
                  </h3>
                  <p className="text-xl mb-6">
                    Let us guide you through the wonders of ancient Egypt
                  </p>
                  <Button
                    size="lg"
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                    asChild
                  >
                    <a
                      href={`https://wa.me/${siteData.contact.whatsapp.replace(
                        /[^0-9]/g,
                        ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Start Planning Now
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
