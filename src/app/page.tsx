'use client'
import React from 'react';
import { ArrowRight, MessageSquare, Video, Mic, Users, Globe, Shield } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SignOutBtn from '@/components/special/SignOutBtn';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  const routes = useRouter();
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <Image
            src="/dg.jpg"
            height={100}
            width={100}
            alt="Hero background" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        {/* Simplified Navbar */}
        <div className="relative z-10 p-6">
          <nav className="flex justify-between items-center max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-white">PANGAT</h1>
            <div className='flex justify-center gap-3'>
            <SignOutBtn /> 
            <Button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={()=>{
                routes.push('/sign-in')
              }}
            >
              Sign Up
            </Button>
            </div>
          </nav>
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-20">
          <div className="max-w-3xl">
            <h2 className="text-6xl font-bold text-white mb-6 leading-tight">
              Where Communities <br />Come Alive
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Experience the future of social connection with our innovative platform that brings 
              together text, voice, and video in one seamless space.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-black px-8 py-4 rounded-full hover:bg-gray-100 flex items-center gap-2"
              onClick={()=>{
                routes.push('/channels')
              }}
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-32 bg-black">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-white text-center mb-16">
            Communication Reimagined
          </h3>
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard 
              image="/chat-bg.jpg"
              icon={<MessageSquare className="w-8 h-8" />}
              title="Text Channels"
              description="Rich conversations between groups and one to one"
            />
            <FeatureCard 
              image="/audio-bg.jpg"
              icon={<Mic className="w-8 h-8" />}
              title="Voice Rooms"
              description="Crystal-clear audio spaces for immersive discussions and music."
            />
            <FeatureCard 
              image="/video-bg.jpg"
              icon={<Video className="w-8 h-8" />}
              title="Video Channels"
              description="Face-to-face interactions with 4K quality and screen sharing."
            />
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-4xl font-bold text-black mb-6">
                Join a Thriving Community
              </h3>
              <p className="text-xl text-gray-600 mb-8">
                Connect with millions of users worldwide. Create your own space or join existing 
                communities that match your interests.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <Stat number="XX+" label="Active Users" />
                <Stat number="XX+" label="Communities" />
                <Stat number="99.9%" label="Uptime" />
                <Stat number="24/7" label="Support" />
              </div>
            </div>
            <div className="relative h-[500px]">
              <img 
                src="https://media.istockphoto.com/id/1134291628/photo/male-manager-shaking-hands-with-female-applicant.webp?a=1&b=1&s=612x612&w=0&k=20&c=l4G_8KqhvmlEw9iYL6rrOK6lDSmmKY-k-P_3VMPbhxM="
                alt="Community" 
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-32 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <BenefitCard 
              icon={<Users className="w-6 h-6 text-white" />}
              title="Community First"
              description="Build meaningful connections in a safe, moderated environment."
            />
            <BenefitCard 
              icon={<Globe className="w-6 h-6 text-white" />}
              title="Global Reach"
              description="Connect with people from around the world in real-time."
            />
            <BenefitCard 
              icon={<Shield className="w-6 h-6 text-white" />}
              title="Privacy Focused"
              description="Your data is protected with enterprise-grade security."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Component type definitions
interface FeatureCardProps {
  image: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface StatProps {
  number: string;
  label: string;
}

const FeatureCard = ({ image, icon, title, description }: FeatureCardProps) => (
  <div className="group">
    <div className="relative mb-6 overflow-hidden rounded-xl h-[300px]">
      <Image
        height={50}
        width={50}
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        {icon}
      </div>
    </div>
    <h4 className="text-xl font-semibold text-white mb-2">{title}</h4>
    <p className="text-gray-400">{description}</p>
  </div>
);

const BenefitCard = ({ icon, title, description }: BenefitCardProps) => (
  <div className="border border-gray-800 p-8 rounded-2xl">
    <div className="bg-white bg-opacity-10 p-4 rounded-xl w-fit mb-6">{icon}</div>
    <h4 className="text-xl font-semibold text-white mb-2">{title}</h4>
    <p className="text-gray-400">{description}</p>
  </div>
);

const Stat = ({ number, label }: StatProps) => (
  <div>
    <div className="text-3xl font-bold text-black mb-1">{number}</div>
    <div className="text-gray-600">{label}</div>
  </div>
);

const Page = () => {
  return (
    <div>
      <LandingPage />
    </div>
  );
}

export default Page;