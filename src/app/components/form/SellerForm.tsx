'use client';
import React from 'react';
import Textarea from '../ui/Textarea';
import Input from '../ui/Input';
import Button from '../ui/Button';

const SellerForm = ({ fields }: { fields: any }) => {
  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Seller Application Form</h2>
      <p className="mb-4 text-gray-600">
        Please fill out the form below to apply as a seller. All fields are
        required unless marked optional.
      </p>

      <form>
        {fields.map((fields: any) => (
          <div key={fields.section.title} className="mb-4">
            <h3 className="mb-4 text-lg font-semibold">
              {fields.section.title}
            </h3>
            <div className="grid grid-cols-6 gap-4">
              {fields.section.fields.map((field: any) => (
                <div key={field.name} className={`mb-2 ${field.width}`}>
                  <label
                    htmlFor={field.name}
                    className="mb-2 block text-sm font-medium"
                  >
                    {field.label}
                  </label>
                  {field.type !== 'textarea' ? (
                    <Input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                    />
                  ) : (
                    <Textarea
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="mb-4 flex items-center gap-2 rounded-md border border-gray-200 p-3">
          <input
            type="checkbox"
            className="h-4 w-4 cursor-pointer"
            name="terms"
          />
          <span>
            I agree to the{' '}
            <a href="#" className="text-primary">
              terms and conditions.
            </a>
          </span>
        </div>
        <Button className="w-full">
          <span className="block py-1">Submit Application</span>
        </Button>
      </form>
    </div>
  );
};

export default SellerForm;
