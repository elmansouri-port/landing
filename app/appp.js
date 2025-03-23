"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const FeatureCard = () => {
  // Define tabs and their content
  const tabs = [
    {
      id: 'integrations',
      icon: '/icons/integrations.svg',
      label: 'Integrations',
      content: {
        title: 'Integrations',
        description: 'Integrate with different apps so you can collaborate from one place.',
        image: '/images/integrations-preview.png',
      },
    },
    {
      id: 'external-guests',
      icon: '/icons/external-guests.svg',
      label: 'External Guests',
      content: {
        title: 'External Guests',
        description: 'Invite clients and external partners to join your workspace.',
        image: '/images/external-guests-preview.png',
      },
    },
    {
      id: 'google-calendar',
      icon: '/icons/google-calendar.svg',
      label: 'Google Calendar',
      content: {
        title: 'Google Calendar',
        description: 'Seamlessly sync with your Google Calendar events.',
        image: '/images/google-calendar-preview.png',
      },
    },
    {
      id: 'voice-messages',
      icon: '/icons/voice-messages.svg',
      label: 'Voice Messages',
      content: {
        title: 'Voice messages',
        description: 'Sending voice notes in Pumble instead of text and increase your efficiency. Share ideas and updates, or just say hello to your teammates.',
        image: '/images/voice-messages-preview.png',
      },
    },
    {
      id: 'video-messages',
      icon: '/icons/video-messages.svg',
      label: 'Video Messages',
      content: {
        title: 'Video Messages',
        description: 'Share screen recordings and video messages with your team.',
        image: '/images/video-messages-preview.png',
      },
    },
    {
      id: 'scheduling',
      icon: '/icons/scheduling.svg',
      label: 'Scheduling',
      content: {
        title: 'Scheduling',
        description: 'Schedule messages and meetings directly in the app.',
        image: '/images/scheduling-preview.png',
      },
    },
    {
      id: 'permissions',
      icon: '/icons/permissions.svg',
      label: 'Permissions',
      content: {
        title: 'Permissions',
        description: 'Control who can access what in your workspace.',
        image: '/images/permissions-preview.png',
      },
    },
  ];

  const [activeTab, setActiveTab] = useState('voice-messages');
  const [previousTab, setPreviousTab] = useState('voice-messages');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle tab change with animation sequence
  const handleTabChange = (tabId) => {
    if (tabId !== activeTab && !isTransitioning) {
      setIsTransitioning(true);
      setPreviousTab(activeTab);
      setActiveTab(tabId);
      
      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 400);
    }
  };

  // Find active tab content
  const activeContent = tabs.find(tab => tab.id === activeTab)?.content;
  
  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <div className="bg-purple-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-4xl font-bold text-center text-purple-900 mb-3">
          Packed with Useful Features
        </h2>
        <p className="text-center text-gray-700 mb-8">
          From integrations to security, Pumble has everything a modern team needs.
        </p>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-10 flex flex-wrap justify-between">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex flex-col items-center py-3 px-2 transition-all duration-300 relative
                ${activeTab === tab.id ? 'text-purple-700' : 'text-gray-600'}
                hover:text-purple-600 hover:bg-purple-50 rounded-t-lg group`}
            >
              <div className="w-6 h-6 mb-1 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                <Image 
                  src={tab.icon} 
                  alt={tab.label} 
                  width={24} 
                  height={24} 
                  className={`transition-all duration-300 ${activeTab === tab.id ? 'text-purple-700' : 'text-gray-600'}`}
                />
              </div>
              <span className="text-xs">{tab.label}</span>
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-purple-700 rounded-t-md transform transition-all duration-300 ease-in-out ${
                activeTab === tab.id ? 'scale-x-100' : 'scale-x-0'
              }`}></div>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="grid md:grid-cols-2 gap-8 items-center min-h-[350px]">
          {/* Left side: Image */}
          <div className="relative overflow-hidden rounded-lg">
            {tabs.map((tab) => (
              <div 
                key={tab.id}
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                  tab.id === activeTab 
                    ? 'opacity-100 translate-x-0 z-10' 
                    : tab.id === previousTab && isTransitioning
                      ? 'opacity-0 -translate-x-10 z-0' 
                      : 'opacity-0 translate-x-10 z-0'
                }`}
              >
                <Image
                  src={tab.content.image}
                  alt={tab.content.title}
                  width={550}
                  height={350}
                  className="rounded-lg object-contain w-full h-full"
                />
              </div>
            ))}
          </div>
          
          {/* Right side: Content */}
          <div className="relative overflow-hidden min-h-[200px]">
            {tabs.map((tab) => (
              <div 
                key={tab.id}
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                  tab.id === activeTab 
                    ? 'opacity-100 translate-y-0 z-10' 
                    : tab.id === previousTab && isTransitioning
                      ? 'opacity-0 translate-y-8 z-0' 
                      : 'opacity-0 -translate-y-8 z-0'
                }`}
              >
                <h3 className="text-3xl font-bold text-purple-900 mb-4">
                  {tab.content.title}
                </h3>
                <p className="text-gray-700 mb-6">
                  {tab.content.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium group transition-all duration-300"
                >
                  Learn more{' '}
                  <svg
                    className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;




// Landing page content
          <div className="">
            
            
            {/* CTA Button - positioned to match the image */}
            <div className="mt-4">
              <button 
                onClick={handleStartEstimation}
                className=""
              >
                Estimer mon bulletin de paie
              </button>
            </div>
          </div>