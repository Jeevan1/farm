import React from 'react';
import SectionHeading from './SectionHeading';
import * as Icons from 'lucide-react';
import { ApiResponse, apiService } from '@/utils/apiService';
import Button from './ui/Button';
import Link from 'next/link';

const ServiceSection = async () => {
  const { data, error, loading }: ApiResponse<any> = await apiService(
    'http://localhost:3000/data.json',
  );
  return (
    <section className="bg-muted/30 py-16">
      <div className="container">
        <SectionHeading
          title="Our Services"
          subtitle="Discover the best farming tools and fresh agricultural products."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.services.map((service: any) => {
            const Icon = Icons[
              service.icon as keyof typeof Icons
            ] as React.ElementType;
            return (
              <div
                key={service.id}
                className="flex flex-col rounded-lg bg-white p-6 shadow transition-all duration-300 ease-in-out hover:shadow-lg"
              >
                <span className="mb-4 w-max rounded-md bg-primary/10 p-4 text-secondary">
                  {Icon && <Icon className="h-6 w-6" />}
                </span>
                <h3 className="mb-2 text-lg font-bold text-textdark">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            );
          })}
          <div className="flex flex-col justify-between rounded-lg bg-secondary p-6 shadow">
            <div>
              <h3 className="mb-2 text-lg font-bold text-textdark text-white">
                Ready to Get Started?
              </h3>
              <p className="text-gray-100">
                Join thousands of farmers who are already growing their
                operations with us.
              </p>
            </div>
            <button className="mt-4 w-full rounded-md bg-white">
              <Link href="/register" className="block px-4 py-2 text-secondary">
                Start Managing
              </Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
