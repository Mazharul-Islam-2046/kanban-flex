import React from 'react';
import { Chrome, Facebook, Twitter, Github } from 'lucide-react';

const Login: React.FC = () => {
  const handleSocialLogin = (provider: string) => {
    // This is where you'd integrate with your authentication service
    // For example, with NextAuth.js, Firebase Auth, or Auth0
    console.log(`Logging in with ${provider}`);
    
    // Example implementation would be:
    // signIn(provider) for NextAuth.js
    // or redirect to OAuth provider URL
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account using your preferred platform</p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-4">
            {/* Google Login */}
            <button
              onClick={() => handleSocialLogin('google')}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 font-medium"
            >
              <Chrome className="w-5 h-5 mr-3 text-blue-500" />
              Continue with Google
            </button>

            {/* Facebook Login */}
            <button
              onClick={() => handleSocialLogin('facebook')}
              className="w-full flex items-center justify-center px-4 py-3 border border-blue-600 rounded-lg shadow-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              <Facebook className="w-5 h-5 mr-3" />
              Continue with Facebook
            </button>

            {/* X (Twitter) Login */}
            <button
              onClick={() => handleSocialLogin('twitter')}
              className="w-full flex items-center justify-center px-4 py-3 border border-black rounded-lg shadow-sm bg-black text-white hover:bg-gray-800 transition-colors duration-200 font-medium"
            >
              <Twitter className="w-5 h-5 mr-3" />
              Continue with X
            </button>

            {/* GitHub Login */}
            <button
              onClick={() => handleSocialLogin('github')}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-800 rounded-lg shadow-sm bg-gray-800 text-white hover:bg-gray-900 transition-colors duration-200 font-medium"
            >
              <Github className="w-5 h-5 mr-3" />
              Continue with GitHub
            </button>
          </div>

          {/* Terms and Privacy */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              By signing in, you agree to our{' '}
              <a href="#" className="text-blue-600 hover:text-blue-500">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-600 hover:text-blue-500">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;