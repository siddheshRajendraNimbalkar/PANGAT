"use client"
import React from 'react';
import { Users, Utensils, Heart } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding and Info */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-orange-600 to-purple-700 items-center justify-center p-8 overflow-hidden">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative max-w-md text-center">
          <div className="mb-8 flex flex-col items-center">
            <h1 className="text-5xl font-bold text-white mb-4">PANGAT</h1>
            <div className="flex items-center space-x-4 text-white/80">
              <Utensils className="w-6 h-6" />
              <Users className="w-6 h-6" />
              <Heart className="w-6 h-6" />
            </div>
          </div>
          
          <p className="text-white/90 text-lg mb-12 leading-relaxed">
            Where communities gather, share, and grow together. Experience a new way of connecting with people who share your passions.
          </p>

          <div className="grid grid-cols-3 gap-6 text-white">
            <div className="text-center p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <div className="text-3xl font-bold mb-1">10M+</div>
              <div className="text-sm text-white/80">Members</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <div className="text-3xl font-bold mb-1">50K+</div>
              <div className="text-sm text-white/80">Communities</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <div className="text-3xl font-bold mb-1">180+</div>
              <div className="text-sm text-white/80">Countries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="flex-1 flex flex-col bg-zinc-50">
        {/* Mobile Header */}
        <div className="lg:hidden p-6 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-purple-700 bg-clip-text text-transparent">
            PANGAT
          </h1>
        </div>

        {/* Auth Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100">
              {children}
            </div>

            {/* Footer Links */}
            <div className="text-center space-y-4">
              <div className="flex justify-center space-x-4 text-sm text-zinc-500">
                <a href="#" className="hover:text-zinc-800 transition-colors">Terms</a>
                <span className="text-zinc-300">|</span>
                <a href="#" className="hover:text-zinc-800 transition-colors">Privacy</a>
                <span className="text-zinc-300">|</span>
                <a href="#" className="hover:text-zinc-800 transition-colors">Help</a>
              </div>
              
              <p className="text-xs text-zinc-400">
                © {new Date().getFullYear()} PANGAT. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}