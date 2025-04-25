import RegisterForm from '@/app/components/form/RegisterForm';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-primary/5 py-12">
      <div className="container">
        <div className="flex flex-col items-center justify-center">
          <Link href="/">
            <Image
              src="/assets/logo.png"
              alt="logo"
              width={150}
              height={100}
              className="h-10"
            />
          </Link>
          <h2 className="mt-4 text-2xl font-semibold">Create your account</h2>
          <span className="mt-2 mb-6 text-sm">
            Already have an account?
            <Link href="/signin" className="ms-1 text-primary">
              Sign In
            </Link>
          </span>

          <div className="w-full max-w-md">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
