"use client"
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const StepperMenu = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    // Step 0 - Initial state
    {
      title: { text: 'Votre projet', color: 'text-red-500' },
      sections: [
        {
          header: { text: 'Vos informations', color: 'text-pink-300' },
          items: [
            { text: 'Votre profil', color: 'text-pink-300', active: false, bullet: false },
            { text: 'Votre activité', color: 'text-pink-300', active: false, bullet: false }
          ],
          lineColor: 'border-pink-300'
        },
        {
          header: { text: 'La rémunération', color: 'text-pink-300' },
          items: [
            { text: 'Votre salarié', color: 'text-pink-300', active: false, bullet: false },
            { text: 'Votre bulletin de paie', color: 'text-pink-300', active: false, bullet: false }
          ],
          lineColor: 'border-pink-300'
        }
      ]
    },
    // Step 1 - First section active
    {
      title: { text: 'Votre projet', color: 'text-gray-800' },
      sections: [
        {
          header: { text: 'Vos informations', color: 'text-red-500' },
          items: [
            { text: 'Votre profil', color: 'text-red-500', active: true, bullet: true },
            { text: 'Votre activité', color: 'text-gray-400', active: false, bullet: false }
          ],
          lineColor: 'border-red-500'
        },
        {
          header: { text: 'La rémunération', color: 'text-pink-300' },
          items: [
            { text: 'Votre salarié', color: 'text-pink-300', active: false, bullet: false },
            { text: 'Votre bulletin de paie', color: 'text-pink-300', active: false, bullet: false }
          ],
          lineColor: 'border-pink-300'
        }
      ]
    },
    // Step 2 - Votre activité active
    {
      title: { text: 'Votre projet', color: 'text-gray-800' },
      sections: [
        {
          header: { text: 'Vos informations', color: 'text-red-500' },
          items: [
            { text: 'Votre profil', color: 'text-gray-600', active: false, bullet: true },
            { text: 'Votre activité', color: 'text-red-500', active: true, bullet: true }
          ],
          lineColor: 'border-red-500'
        },
        {
          header: { text: 'La rémunération', color: 'text-pink-300' },
          items: [
            { text: 'Votre salarié', color: 'text-pink-300', active: false, bullet: false },
            { text: 'Votre bulletin de paie', color: 'text-pink-300', active: false, bullet: false }
          ],
          lineColor: 'border-pink-300'
        }
      ]
    },
    // Step 3 - First section completed, second section started
    {
      title: { text: 'Votre projet', color: 'text-gray-800' },
      sections: [
        {
          header: { text: 'Vos informations', color: 'text-gray-800' },
          items: [
            { text: 'Votre profil', color: 'text-gray-600', active: false, bullet: true },
            { text: 'Votre activité', color: 'text-gray-600', active: false, bullet: true }
          ],
          lineColor: 'border-gray-300'
        },
        {
          header: { text: 'La rémunération', color: 'text-red-500' },
          items: [
            { text: 'Votre salarié', color: 'text-red-500', active: true, bullet: true },
            { text: 'Votre bulletin de paie', color: 'text-gray-400', active: false, bullet: false }
          ],
          lineColor: 'border-red-500'
        }
      ]
    },
    // Step 4 - All completed with last item active
    {
      title: { text: 'Votre projet', color: 'text-gray-800' },
      sections: [
        {
          header: { text: 'Vos informations', color: 'text-gray-800' },
          items: [
            { text: 'Votre profil', color: 'text-gray-600', active: false, bullet: true },
            { text: 'Votre activité', color: 'text-gray-600', active: false, bullet: true }
          ],
          lineColor: 'border-gray-300'
        },
        {
          header: { text: 'La rémunération', color: 'text-red-500' },
          items: [
            { text: 'Votre salarié', color: 'text-gray-600', active: false, bullet: true },
            { text: 'Votre bulletin de paie', color: 'text-red-500', active: true, bullet: true }
          ],
          lineColor: 'border-red-500'
        }
      ]
    }
  ];

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const currentState = steps[currentStep];

  return (
    <div className="flex flex-col items-center font-sans antialiased">
      <div className="bg-white p-6 w-80 rounded-xl shadow-lg border border-gray-100">
        {/* Title */}
        <h2 className={`text-lg font-semibold ${currentState.title.color} mb-6`}>
          {currentState.title.text}
        </h2>

        {/* Sections */}
        <div className="space-y-8">
          {currentState.sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {/* Section Header */}
              <h3 className={`text-sm font-medium ${section.header.color} mb-4`}>
                {section.header.text}
              </h3>

              {/* Items */}
              <div className="relative ml-4">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start mb-7 last:mb-0">
                    {/* Bullet and Line Container */}
                    <div className="relative w-3 flex justify-center">
                      {/* Bullet */}
                      <div className={`absolute top-1 w-2 h-2 rounded-full 
                        ${item.bullet ? (item.active ? 'bg-red-500' : 'bg-gray-400') : 'bg-transparent'}
                        ${item.active ? 'ring-2 ring-red-200' : ''}`}
                      />
                      
                      {/* Vertical Line - Perfectly centered under the bullet */}
                      {itemIndex < section.items.length - 1 && (
                        <div className={`absolute top-4 w-1/5 h-8
                          ${item.active || section.items[itemIndex+1].active ? 'bg-red-500' : 
                          section.lineColor === 'border-pink-300' ? 'bg-pink-300' : 'bg-gray-300'}`}
                        />
                      )}
                    </div>

                    {/* Item Text */}
                    <span className={`text-sm ${item.color} ${item.active ? 'font-medium' : 'font-normal'} ml-3`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Progress Dots */}
        <div className="mt-8 flex justify-center space-x-1.5">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`h-1 rounded-full transition-all duration-300
                ${idx === currentStep ? 'w-6 bg-red-500' : 'w-1 bg-gray-300'}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 w-80 flex justify-between">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg 
          shadow-sm flex items-center text-sm disabled:opacity-50 disabled:hover:bg-white"
        >
          <ChevronLeft size={16} className="mr-2 -ml-1" />
          Précédent
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg 
          shadow-sm flex items-center text-sm disabled:opacity-50 disabled:hover:bg-blue-600"
        >
          Suivant
          <ChevronRight size={16} className="ml-2 -mr-1" />
        </button>
      </div>
    </div>
  );
};

export default StepperMenu;