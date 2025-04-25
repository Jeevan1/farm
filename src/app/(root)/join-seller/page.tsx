import SellerForm from '@/app/components/form/SellerForm';
import HeroSection from '@/app/components/HeroSection';
import SectionHeading from '@/app/components/SectionHeading';
import { ArrowRight } from 'lucide-react';
import React from 'react';

const fields = [
  {
    section: {
      title: 'Personal Information',
      fields: [
        {
          label: 'First Name',
          type: 'text',
          placeholder: 'Enter your first name',
          name: 'firstName',
          width: 'col-span-3',
        },
        {
          label: 'Last Name',
          type: 'text',
          placeholder: 'Enter your last name',
          name: 'lastName',
          width: 'col-span-3',
        },
        {
          label: 'Email',
          type: 'email',
          placeholder: 'Enter your email',
          name: 'email',
          width: 'col-span-3',
        },
        {
          label: 'Phone Number',
          type: 'tel',
          placeholder: 'Enter your phone number',
          name: 'phone',
          width: 'col-span-3',
        },
      ],
    },
  },
  {
    section: {
      title: 'Business Information',
      fields: [
        {
          label: 'Business Name',
          type: 'text',
          placeholder: 'Enter your business name',
          name: 'businessName',
          width: 'col-span-3',
        },
        {
          label: 'Business Address',
          type: 'text',
          placeholder: 'Enter your business address',
          name: 'businessAddress',
          width: 'col-span-3',
        },
        {
          label: 'Business Description',
          type: 'textarea',
          placeholder: 'Enter your business description',
          name: 'businessDescription',
          width: 'col-span-6',
        },
      ],
    },
  },
  {
    section: {
      title: 'Business Address',
      fields: [
        {
          label: 'Address',
          type: 'text',
          placeholder: 'Enter your business address',
          name: 'businessAddress',
          width: 'col-span-6',
        },
        {
          label: 'City',
          type: 'text',
          placeholder: 'Enter your business city',
          name: 'businessCity',
          width: 'col-span-2',
        },
        {
          label: 'State',
          type: 'text',
          placeholder: 'Enter your business state',
          name: 'businessState',
          width: 'col-span-2',
        },
        {
          label: 'Zip Code',
          type: 'text',
          placeholder: 'Enter your business zip code',
          name: 'businessZipCode',
          width: 'col-span-2',
        },
      ],
    },
  },
];

const JoinPage = () => {
  return (
    <div>
      <HeroSection
        title="Join as a Seller"
        subtitle="We're here to help and answer any questions you may have."
      />
      <div className="container">
        <div className="py-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
            Why Sell on farmMart?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="group cursor-pointer rounded-xl bg-gray-50 p-6 transition-all duration-100 ease-in-out hover:bg-primary/10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 transition-all duration-100 ease-in-out group-hover:bg-primary/20">
                <ArrowRight className="text-primary" size={24} />
              </div>
              <h3 className="mb-3 text-xl font-semibold">
                Direct Access to Farmers
              </h3>
              <p className="text-gray-600">
                Connect directly with farmers who are actively looking for
                quality agricultural products and tools.
              </p>
            </div>

            <div className="group cursor-pointer rounded-xl bg-gray-50 p-6 transition-all duration-100 ease-in-out hover:bg-primary/10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 transition-all duration-100 ease-in-out group-hover:bg-primary/20">
                <ArrowRight className="text-primary" size={24} />
              </div>
              <h3 className="mb-3 text-xl font-semibold">
                Verified Seller Badge
              </h3>
              <p className="text-gray-600">
                Build trust with customers through our verified seller program,
                indicating your reliability and quality.
              </p>
            </div>

            <div className="group cursor-pointer rounded-xl bg-gray-50 p-6 transition-all duration-100 ease-in-out hover:bg-primary/10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 transition-all duration-100 ease-in-out group-hover:bg-primary/20">
                <ArrowRight className="text-primary" size={24} />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Powerful Tools</h3>
              <p className="text-gray-600">
                Manage your product listings, inventory, and inquiries all from
                one streamlined dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary/5 py-16">
        <div className="container">
          <SectionHeading
            title="Join as a Seller"
            subtitle="We're here to help and answer any questions you may have."
          />
          <SellerForm fields={fields} />
        </div>
      </div>
    </div>
  );
};

export default JoinPage;
