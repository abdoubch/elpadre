import React, { useState } from 'react';
import { Waves, Trophy } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { useAuth } from '../contexts/AuthContext';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="flex">
              <Waves className="w-12 h-12 text-blue-600" />
              <Trophy className="w-12 h-12 text-yellow-500 -ml-3" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AquaRegistration
          </h1>
          <p className="text-gray-600">
            Gestion des inscriptions de natation
          </p>
        </div>

        {/* Auth Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {isLogin ? (
            <LoginForm
              onSubmit={login}
              onSwitchToRegister={() => setIsLogin(false)}
              isLoading={isLoading}
            />
          ) : (
            <RegisterForm
              onSubmit={register}
              onSwitchToLogin={() => setIsLogin(true)}
              isLoading={isLoading}
            />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>© 2025 AquaRegistration - Gestion professionnelle des inscriptions</p>
        </div>
      </div>
    </div>
  );
};