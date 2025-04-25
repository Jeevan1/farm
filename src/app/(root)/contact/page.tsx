import ContactForm from '@/app/components/form/ContactForm';
import HeroSection from '@/app/components/HeroSection';
import { Mail, MapPin, Phone } from 'lucide-react';
import React from 'react';

const ContactPage = () => {
  return (
    <section>
      <HeroSection
        title="Get in Touch"
        subtitle="We're here to help and answer any questions you may have."
      />
      <div className="container py-16">
        <div className="grid grid-cols-1 gap-4 rounded-xl bg-gradient-to-t from-secondary/30 to-white p-2 md:grid-cols-3">
          <div className="relative space-y-1 overflow-hidden rounded-lg bg-primary px-7 py-8 text-white">
            <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-gradient-to-br from-white/50 to-transparent"></div>
            <h2 className="text-2xl font-bold">Contact Information</h2>
            <p className="mb-6 text-gray-200 md:mb-8">
              We're here to help and answer any questions you may have.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Phone fill="#fff" />
                <span className="text-sm">+1 (123) 456-7890</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail />
                <span className="text-sm">o5k5o@example.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin />
                <span className="text-sm">123 Main Street, City, Country</span>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
      <section className="bg-gray-50">
        <div className="h-[400px] w-full">
          <iframe
            src="https://www.google.com/maps/embed/v1/place?q=chunikhel&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            title="Office Location"
          ></iframe>
        </div>
      </section>
    </section>
  );
};

export default ContactPage;
