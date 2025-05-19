'use client';
import React from 'react';
import Input from '../ui/Input';
import Link from 'next/link';
import Button from '../ui/Button';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const registerFields = [
  {
    id: 1,
    name: 'fname',
    type: 'text',
    label: 'First Name',
    placeholder: 'First Name',
    width: 'col-span-1',
  },
  {
    id: 2,
    name: 'lname',
    type: 'text',
    label: 'Last Name',
    placeholder: 'Last Name',
    width: 'col-span-1',
  },
  {
    id: 3,
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Email',
    width: 'col-span-2',
  },
  {
    id: 4,
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: '••••••••',
    width: 'col-span-2',
  },
  {
    id: 5,
    name: 'confirmPassword',
    type: 'password',
    label: 'Confirm Password',
    placeholder: '••••••••',
    width: 'col-span-2',
  },
];

const RegisterForm = () => {
  const router = useRouter();
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('fname') as string;
    const lastName = formData.get('lname') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const acceptsMarketing = true;

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          password,
          acceptsMarketing,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        toast.error(error?.error || 'Failed to register');
        return;
      }

      const data = await res.json();
      toast.success('Register successful');
      router.push('/signin');
      console.log('data', data);
    } catch (err) {
      toast.error('Something went wrong');
      console.error(err);
    }
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow-md md:min-w-sm md:p-6">
      <form action="" className="space-y-6" onSubmit={handleRegister}>
        <div className="grid grid-cols-2 gap-4">
          {registerFields.map((field) => (
            <div className={`space-y-2 ${field.width}`}>
              <label htmlFor={field.name} className="block text-sm font-medium">
                {field.label}
              </label>
              <Input
                key={field.id}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                label={field.label}
                className={field.width}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="remember"
            id="remember"
            className="h-4 w-4"
          />
          <label htmlFor="remember" className="text-sm">
            Remember me
          </label>
        </div>
        <Button variant="primary" type="submit" className="h-10 w-full">
          Sign In
        </Button>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant="primary" className="w-full">
              <span className="flex items-center justify-center py-1">
                <svg
                  className="mr-2 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z"
                    clipRule="evenodd"
                  />
                </svg>
                GitHub
              </span>
            </Button>
            <Button variant="primary" className="w-full">
              <span className="flex items-center justify-center py-1">
                <svg
                  className="mr-2 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" />
                </svg>
                Google
              </span>
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center text-center">
          <span className="text-sm">
            Already have an account?
            <br />
            <Link href="/signin" className="text-primary">
              Sign In
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
