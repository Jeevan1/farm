import CTASection from '@/app/components/CTASection';
import HeroSection from '@/app/components/HeroSection';
import SectionHeading from '@/app/components/SectionHeading';
import Button from '@/app/components/ui/Button';
import Link from 'next/link';
import React from 'react';

type Mission = {
  id: number;
  title: string;
  description: string;
};

const mission: Mission[] = [
  {
    id: 1,
    title: 'Simplify Farm Management',
    description:
      "FarmMart's mission is to empower farmers with technology that simplifies farm management, connecting them with quality agricultural products, and enabling sustainable growth and prosperity.",
  },
  {
    id: 2,
    title: 'Empower Farmers',
    description:
      'At FarmMart, we believe in empowering farmers with the tools they need to manage their farms effectively and connect with trusted suppliers for quality agricultural products.',
  },
  {
    id: 3,
    title: 'Sustainable Farming',
    description:
      'We are committed to promoting sustainable farming practices, reducing environmental impact, and supporting farmers in their agricultural endeavors.',
  },
];

const AboutPage = () => {
  return (
    <div>
      <HeroSection
        title="About FarmMart"
        subtitle="Discover the best farming tools and fresh agricultural products."
      />
      <div className="container">
        <div className="py-16">
          <section className="section-padding">
            <div className="">
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                <div>
                  <h2 className="mb-6 text-3xl font-bold text-gray-800">
                    Our Story
                  </h2>
                  <p className="mb-4 text-gray-600">
                    AgroConnect provides a suite of digital tools designed
                    specifically for the needs of modern farmers. Our platform
                    helps you manage every aspect of your farm operations while
                    connecting you with trusted suppliers.
                  </p>
                  <p className="mb-4 text-gray-600">
                    Whether you're running a small family farm or a large
                    agricultural operation, our services can be customized to
                    meet your specific needs and help you achieve greater
                    efficiency and productivity.
                  </p>
                  {/* <Button className="mt-2 h-10" position="start">
                    <Link href="/register">Get Started</Link>
                  </Button> */}
                </div>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&q=80"
                    alt="Farmer using tablet in field"
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="bg-primary/5 py-16">
        <div className="container">
          <SectionHeading
            title="Our Mission"
            subtitle="To empower farmers with technology that simplifies farm management and connects them with quality agricultural products, enabling sustainable growth and prosperity."
          />
          <div className="grid grid-cols-1 gap-8 text-left md:grid-cols-3">
            {mission.map((item) => (
              <div className="rounded-xl bg-white p-6 shadow-sm" key={item.id}>
                <h3 className="mb-3 text-xl font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CTASection />
    </div>
  );
};

export default AboutPage;
