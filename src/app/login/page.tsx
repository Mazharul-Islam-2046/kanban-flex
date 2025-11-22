
'use client';

import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push(callbackUrl);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: string) => {
    setError('');
    try {
      await signIn(provider, { callbackUrl });
    } catch (err) {
      console.log(err);
      setError('Failed to sign in with ' + provider);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-dark rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <form onSubmit={handleCredentialsLogin}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full p-2 rounded text-white ${isLoading ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'} mb-4`}
        >
          {isLoading ? 'Signing in...' : 'Login'}
        </button>
      </form>
      
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      
      <div className="space-y-2">
        <button
          onClick={() => handleOAuthLogin('google')}
          className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 flex items-center justify-center"
        >
          <span>Sign in with Google</span>
        </button>
      </div>
      
      <p className="mt-4 text-center">
        Do not have an account?{' '}
        <Link href="/register" className="text-blue-500 hover:underline">
          Register
        </Link>
      </p>
    </div>

  );
}