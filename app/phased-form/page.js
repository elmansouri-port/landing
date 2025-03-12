"use client"; // Ensure this is at the top

import React, { useState, useEffect } from 'react';

const LeadCapture = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessType: '',
    businessSize: '',
    challenge: '',
    goals: '',
    budget: '',
    timeline: '',
    email: '',
    name: '',
    phone: '',
    companyName: '',
    jobTitle: ''
  });
  
  const [formStarted, setFormStarted] = useState(false);
  const [formId, setFormId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Load saved form data on component mount
  useEffect(() => {
    const savedFormId = localStorage.getItem('leadCaptureFormId');
    const savedFormData = localStorage.getItem('leadCaptureFormData');
    const savedStep = localStorage.getItem('leadCaptureStep');
    
    if (savedFormId && savedFormData) {
      setFormId(savedFormId);
      setFormData(JSON.parse(savedFormData));
      
      if (savedStep) {
        setStep(parseInt(savedStep));
        setFormStarted(true);
      }
    } else {
      // Generate a unique form ID if none exists
      const newFormId = `form_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setFormId(newFormId);
      localStorage.setItem('leadCaptureFormId', newFormId);
    }
  }, []);
  
  // Save form data whenever it changes
  useEffect(() => {
    if (formStarted) {
      localStorage.setItem('leadCaptureFormData', JSON.stringify(formData));
      localStorage.setItem('leadCaptureStep', step.toString());
    }
  }, [formData, step, formStarted]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (!formStarted) setFormStarted(true);
  };

  const handleStepChange = (newStep) => {
    setStep(newStep);
    if (!formStarted) setFormStarted(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      console.log('Form submitted:', formData);
      
      // Here you would submit the data to your backend
      // await submitFormToBackend(formId, formData);
      
      // Clear localStorage after successful submission
      localStorage.removeItem('leadCaptureFormId');
      localStorage.removeItem('leadCaptureFormData');
      localStorage.removeItem('leadCaptureStep');
      
      // Move to success step
      setStep(6);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle submission error
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    localStorage.removeItem('leadCaptureFormId');
    localStorage.removeItem('leadCaptureFormData');
    localStorage.removeItem('leadCaptureStep');
    
    const newFormId = `form_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setFormId(newFormId);
    localStorage.setItem('leadCaptureFormId', newFormId);
    
    setFormData({
      businessType: '',
      businessSize: '',
      challenge: '',
      goals: '',
      budget: '',
      timeline: '',
      email: '',
      name: '',
      phone: '',
      companyName: '',
      jobTitle: ''
    });
    
    setStep(1);
    setFormStarted(false);
  };

  const handleSelectionChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (!formStarted) setFormStarted(true);
    // Wait a moment before advancing to the next step for better UX
    setTimeout(() => handleStepChange(step + 1), 300);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^[0-9+\-\s()]{6,20}$/.test(phone);
  };

  const isStepComplete = () => {
    if (step === 5) {
      return (
        formData.name.trim() !== '' &&
        validateEmail(formData.email) &&
        formData.companyName.trim() !== ''
      );
    }
    return true;
  };

  // Business type options with relevant icons
  const businessTypes = [
    {
      type: 'E-commerce',
      icon: (
        <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
        </svg>
      ),
      description: 'Vente de produits en ligne',
    },
    {
      type: 'Service',
      icon: (
        <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      ),
      description: 'Services aux particuliers ou entreprises',
    },
    {
      type: 'SaaS',
      icon: (
        <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
        </svg>
      ),
      description: 'Logiciel en tant que service',
    },
    {
      type: 'Autre',
      icon: (
        <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
      ),
      description: 'Autre type d\'activité',
    },
  ];

  // Business size options with appropriate icons
  const businessSizes = [
    {
      size: 'Petite entreprise',
      icon: (
        <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>
      ),
      description: '1 - 10 employés',
    },
    {
      size: 'Entreprise moyenne',
      icon: (
        <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
      ),
      description: '11 - 50 employés',
    },
    {
      size: 'Grande entreprise',
      icon: (
        <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      ),
      description: '51 - 200 employés',
    },
    {
      size: 'Très grande entreprise',
      icon: (
        <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
      ),
      description: '200+ employés',
    },
  ];

  // Budget options
  const budgetOptions = [
    'Moins de 5 000€',
    '5 000€ - 15 000€',
    '15 000€ - 50 000€',
    'Plus de 50 000€'
  ];
  
  // Timeline options
  const timelineOptions = [
    'Immédiatement',
    'Dans les prochains 3 mois',
    'Dans les prochains 6 mois',
    'Pas encore décidé'
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="container mx-auto px-4 relative">
        {formStarted && (
          <div className="absolute top-0 right-0 p-2 bg-white rounded-full shadow-sm">
            <button 
              onClick={() => resetForm()}
              className="text-gray-400 hover:text-red-600 transition-all duration-300"
              title="Réinitialiser le formulaire"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        )}
        
        <div className="text-center mb-8">
          <div className="inline-flex px-3 py-2 bg-red-100 rounded-lg mb-4 animate-fade-in">
            <span className="text-red-600 text-sm font-medium">
              Diagnostic stratégique gratuit
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in">
            Découvrez comment augmenter vos conversions de <span className="text-red-600">30%</span> en 90 jours
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto animate-fade-in">
            Répondez à ces 5 questions pour recevoir un plan d'action personnalisé basé sur notre expérience avec +200 entreprises comme la vôtre
          </p>
          
          {/* Testimonial Banner */}
          <div className="max-w-2xl mx-auto mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center">
            <div className="mr-4 flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
            <div className="text-left text-sm">
              <p className="text-blue-800 font-medium">"Grâce à ce diagnostic, nous avons augmenté notre taux de conversion de 43% en moins de 60 jours."</p>
              <p className="text-blue-600 text-xs mt-1">Marie L., Directrice Marketing - SoftTech Solutions</p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-100 animate-fade-in-up">
          {/* Progress Line and Steps */}
          <div className="flex justify-between mb-8 relative">
            {/* Progress Line */}
            <div className="absolute top-5 left-10 right-10 h-1 bg-gray-200">
              <div
                className="h-1 bg-red-600 transition-all duration-500"
                style={{
                  width: step === 1 ? '0%' : step === 2 ? '25%' : step === 3 ? '50%' : step === 4 ? '75%' : step === 5 ? '100%' : '100%',
                }}
              ></div>
            </div>

            {/* Steps */}
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="flex flex-col items-center z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${step >= num ? 'bg-red-600 text-white scale-110' : 'bg-gray-200 text-gray-600'}`}>
                  {num}
                </div>
                <div className={`text-xs mt-2 transition-all duration-300 ${step >= num ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                  {num === 1 ? 'Activité' : 
                   num === 2 ? 'Taille' : 
                   num === 3 ? 'Défis' : 
                   num === 4 ? 'Objectifs' : 
                   'Contact'}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={step === 5 ? handleSubmit : (e) => e.preventDefault()}>
            {/* Step 1 - Business Type */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-xl font-semibold text-gray-900">Quel type d'activité exercez-vous ?</h3>
                <p className="text-gray-700 text-sm">Cette information nous permet d'adapter notre approche à votre secteur d'activité</p>
                
                <div className="grid grid-cols-2 gap-4">
                  {businessTypes.map((business) => (
                    <button
                      key={business.type}
                      type="button"
                      className={`p-4 border rounded-lg text-left transition-all duration-300 hover:scale-105 ${formData.businessType === business.type ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:border-red-300'}`}
                      onClick={() => handleSelectionChange('businessType', business.type)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {business.icon}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">{business.type}</div>
                          <div className="text-sm text-gray-600">{business.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                
                {/* Form Saving Indicator */}
                <div className="text-xs text-gray-500 italic mt-4 flex items-center">
                  <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Votre progression est sauvegardée automatiquement
                </div>
              </div>
            )}

            {/* Step 2 - Business Size */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-xl font-semibold text-gray-900">Quelle est la taille de votre entreprise ?</h3>
                <p className="text-gray-700 text-sm">Cette information nous aide à adapter nos solutions à l'échelle de votre organisation</p>
                
                <div className="grid grid-cols-2 gap-4">
                  {businessSizes.map((size) => (
                    <button
                      key={size.size}
                      type="button"
                      className={`p-4 border rounded-lg text-left transition-all duration-300 hover:scale-105 ${formData.businessSize === size.size ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:border-red-300'}`}
                      onClick={() => handleSelectionChange('businessSize', size.size)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {size.icon}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">{size.size}</div>
                          <div className="text-sm text-gray-600">{size.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                
                <button 
                  type="button" 
                  onClick={() => handleStepChange(1)}
                  className="text-red-600 hover:text-red-700 flex items-center text-sm font-medium transition-all duration-300"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                  Retour
                </button>
              </div>
            )}

            {/* Step 3 - Challenge */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-xl font-semibold text-gray-900">Quel est votre plus grand défi actuellement ?</h3>
                <p className="text-gray-700 text-sm">Sélectionnez le problème qui vous empêche le plus d'atteindre vos objectifs</p>
                
                <div className="grid grid-cols-1 gap-4">
                  {[
                    {
                      challenge: 'Trafic élevé mais conversions faibles',
                      icon: (
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                        </svg>
                      )
                    },
                    {
                      challenge: 'Message peu convaincant',
                      icon: (
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                        </svg>
                      )
                    },
                    {
                      challenge: "Coût d'acquisition client trop élevé",
                      icon: (
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      )
                    },
                    {
                      challenge: 'Manque de données exploitables',
                      icon: (
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                      )
                    },
                    {
                      challenge: 'Difficulté à fidéliser les clients',
                      icon: (
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                      )
                    }
                  ].map((item) => (
                    <button
                      key={item.challenge}
                      type="button"
                      className={`p-4 border rounded-lg text-left transition-all duration-300 hover:scale-105 ${formData.challenge === item.challenge ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:border-red-300'}`}
                      onClick={() => handleSelectionChange('challenge', item.challenge)}
                    >
                      <div className="flex items-center">
                        <div className="mr-4">
                          {item.icon}
                        </div>
                        <div className="font-medium text-gray-800">{item.challenge}</div>
                      </div>
                    </button>
                  ))}
                </div>
                
                <button 
                  type="button" 
                  onClick={() => handleStepChange(2)}
                  className="text-red-600 hover:text-red-700 flex items-center text-sm font-medium transition-all duration-300"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                  Retour
                </button>
              </div>
            )}
            
            {/* Step 4 - Goals and Budget */}
            {step === 4 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-xl font-semibold text-gray-900">Quels sont vos objectifs et budget ?</h3>
                <p className="text-gray-700 text-sm">Ces informations nous aideront à proposer des solutions adaptées à vos ambitions</p>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vos principaux objectifs pour les 12 prochains mois</label>
                  <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                    placeholder="Augmenter le taux de conversion, lancer un nouveau produit, etc."
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget estimé pour ce projet</label>
                  <div className="grid grid-cols-2 gap-3">
                    {budgetOptions.map((budget) => (
                      <button
                        key={budget}
                        type="button"
                        className={`p-3 border rounded-lg text-center transition-all duration-300 ${formData.budget === budget ? 'border-red-600 bg-red-50 font-medium' : 'border-gray-200 hover:border-red-300'}`}
                        onClick={() => setFormData({ ...formData, budget: budget })}
                      >
                        {budget}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Délai de mise en œuvre souhaité</label>
                  <div className="grid grid-cols-2 gap-3">
                    {timelineOptions.map((timeline) => (
                      <button
                        key={timeline}
                        type="button"
                        className={`p-3 border rounded-lg text-center transition-all duration-300 ${formData.timeline === timeline ? 'border-red-600 bg-red-50 font-medium' : 'border-gray-200 hover:border-red-300'}`}
                        onClick={() => setFormData({ ...formData, timeline: timeline })}
                      >
                        {timeline}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <button 
                    type="button" 
                    onClick={() => handleStepChange(3)}
                    className="text-red-600 hover:text-red-700 flex items-center text-sm font-medium transition-all duration-300"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    Retour
                  </button>
                  
                  <button 
                    type="button" 
                    onClick={() => handleStepChange(5)}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center transition-all duration-300"
                  >
                    Continuer
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 5 - Contact Information */}
            {step === 5 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-xl font-semibold text-gray-900">Vos informations de contact</h3>
                <p className="text-gray-700 text-sm">Nous utiliserons ces informations pour vous envoyer votre plan d'action personnalisé</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet <span className="text-red-600">*</span></label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                      placeholder="Jean Dupont"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email professionnel <span className="text-red-600">*</span></label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-red-500 focus:border-red-500 transition-all duration-300 ${formData.email && !validateEmail(formData.email) ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                      placeholder="jean@entreprise.com"
                      required
                    />
                    {formData.email && !validateEmail(formData.email) && (
                      <p className="text-red-600 text-xs mt-1">Veuillez entrer une adresse email valide</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-red-500 focus:border-red-500 transition-all duration-300 ${formData.phone && !validatePhone(formData.phone) ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                      placeholder="+33 6 12 34 56 78"
                    />
                    {formData.phone && !validatePhone(formData.phone) && (
                      <p className="text-red-600 text-xs mt-1">Veuillez entrer un numéro de téléphone valide</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'entreprise <span className="text-red-600">*</span></label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                      placeholder="Entreprise SAS"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fonction / Poste</label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                      placeholder="Directeur Marketing, CEO, etc."
                    />
                  </div>
                </div>
                
                <div className="flex items-center mt-4">
                  <input
                    id="privacy-consent"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label htmlFor="privacy-consent" className="ml-2 block text-sm text-gray-700">
                    J'accepte que mes données soient utilisées conformément à la <a href="#" className="text-red-600 hover:underline">politique de confidentialité</a>
                  </label>
                </div>
                
                <div className="flex justify-between pt-4">
                  <button 
                    type="button" 
                    onClick={() => handleStepChange(4)}
                    className="text-red-600 hover:text-red-700 flex items-center text-sm font-medium transition-all duration-300"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    Retour
                  </button>
                  
                  <button 
                    type="submit"
                    disabled={!isStepComplete() || isSubmitting}
                    className={`bg-red-600 text-white px-6 py-2 rounded-lg flex items-center transition-all duration-300 ${!isStepComplete() || isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red-700'}`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Traitement...
                      </>
                    ) : (
                      <>
                        Recevoir mon plan d'action
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 6 - Success */}
            {step === 6 && (
              <div className="text-center py-8 animate-fade-in">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Merci pour votre demande !</h3>
                <p className="text-gray-700 mb-6">
                  Nous avons bien reçu vos informations et nous préparons votre plan d'action personnalisé. <br />
                  Vous le recevrez dans votre boîte mail dans les 24 heures.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg max-w-md mx-auto">
                  <p className="text-blue-800 text-sm font-medium">
                    En attendant, consultez notre guide gratuit "7 tactiques pour augmenter vos conversions immédiatement"
                  </p>
                  <a 
                    href="#" 
                    className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-300"
                  >
                    Télécharger le guide
                  </a>
                </div>
              </div>
            )}
          </form>
        </div>
        
        {/* Trust Signals */}
        <div className="max-w-3xl mx-auto mt-10">
          <div className="text-center">
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Ils nous font confiance</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {['SoftTech', 'GlobalCorp', 'InnovateSAS', 'DigiTrends'].map((company) => (
                <div key={company} className="flex items-center justify-center">
                  <div className="h-8 w-24 bg-gray-200 rounded-md flex items-center justify-center">
                    <span className="text-gray-800 font-medium">{company}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadCapture;