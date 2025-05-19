'use client';
import React from 'react';
import Input from '../ui/Input';
import Link from 'next/link';
import Button from '../ui/Button';
import { toast } from 'react-toastify';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const res = await fetch('/api/user/token', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      toast.error('Invalid credentials');
      throw new Error('Failed to login');
    }

    const data = await res.json();
    toast.success('Login successful');
    Cookies.set('token', data.token);
    router.push('/');
    console.log('data', data);
  };
  return (
    <div className="rounded-lg bg-white p-4 shadow-md md:min-w-sm md:p-6">
      <form action="" className="space-y-6" onSubmit={handleLogin}>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email Address
          </label>
          <Input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <Link href="/forgot-password" className="text-sm text-primary">
              Forgot Your Password?
            </Link>
          </div>
          <Input
            type="password"
            name="password"
            required
            placeholder="••••••••"
          />
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
        <Button type="submit" variant="primary" className="h-10 w-full">
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
            Don&apos;t have an account?
            <br />
            <Link href="/register" className="text-primary">
              Create an account
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
