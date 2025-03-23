'use client'; // Required for client-side interactivity
import { useState } from 'react';
import Image from 'next/image';

// Import your step components
// These will be purely presentational components without navigation logic
import VotreProjet1 from './components/votre_projet/votre_projet1';
import VotreProjet2 from './components/votre_projet/votre_projet2';
import VotreProjet3 from './components/votre_projet/votre_projet3';
import VotreProjet4 from './components/votre_projet/votre_projet4';
import VotreActivite1 from './components/vos_informations/votre_activite1';
import VotreActivite2 from './components/vos_informations/votre_activite2';
import VotreProfil from './components/vos_informations/votre_profil';
import VotreSalaire1 from './components/la_remuneration/votre_salarie1';
import VotreSalaire2 from './components/la_remuneration/votre_salarie2';
import VotreBulletinDePaie1 from './components/la_remuneration/votre_bulletin_de_paie1';
import VotreBulletinDePaie2 from './components/la_remuneration/votre_bulletin_de_paie2';
import VotreEstimation from './components/votre_estimation';
import Email from './components/email';

export default function SimulatorPro() {
  // State for tracking whether we're on the landing page or in the steps
  const [isLandingPage, setIsLandingPage] = useState(true);
  
  // State for tracking the current step when not on landing page
  const [currentStep, setCurrentStep] = useState(0);
  
  // State for storing form data across all steps
  const [formData, setFormData] = useState({});

  // Define all the steps in your flow
  const steps = [
    { id: 'votre_projet1', component: VotreProjet1, section: 'votre_projet', title: 'Votre projet' },
    { id: 'votre_projet2', component: VotreProjet2, section: 'votre_projet', title: 'Votre projet' },
    { id: 'votre_projet3', component: VotreProjet3, section: 'votre_projet', title: 'Votre projet' },
    { id: 'votre_projet4', component: VotreProjet4, section: 'votre_projet', title: 'Votre projet' },
    { id: 'votre_profil', component: VotreProfil, section: 'vos_informations', title: 'Votre profil' },
    { id: 'votre_activite1', component: VotreActivite1, section: 'vos_informations', title: 'Votre activité' },
    { id: 'votre_activite2', component: VotreActivite2, section: 'vos_informations', title: 'Votre activité' },
    { id: 'votre_salaire1', component: VotreSalaire1, section: 'la_remuneration', title: 'Votre salaire' },
    { id: 'votre_salaire2', component: VotreSalaire2, section: 'la_remuneration', title: 'Votre salaire' },
    { id: 'votre_bulletin_de_paie1', component: VotreBulletinDePaie1, section: 'la_remuneration', title: 'Votre bulletin de paie' },
    { id: 'votre_bulletin_de_paie2', component: VotreBulletinDePaie2, section: 'la_remuneration', title: 'Votre bulletin de paie' },
    { id: 'email', component: Email, section: 'email', title: 'Email' },
    { id: 'votre_estimation', component: VotreEstimation, section: 'votre_estimation', title: 'Votre estimation' }
  ];

  // Handler for the start button on landing page
  const handleStartEstimation = () => {
    setIsLandingPage(false);
    setCurrentStep(0); // Start with the first step
  };

  // Navigation handlers
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      // If we're on the first step, go back to landing page
      setIsLandingPage(true);
    }
  };

  // Helper function to get the active section
  const getActiveSection = () => {
    if (isLandingPage) return 'landing';
    return steps[currentStep].section;
  };

  // Helper function to get the active step within a section
  const getActiveStepId = () => {
    if (isLandingPage) return null;
    return steps[currentStep].id;
  };
  
  // Helper function to check if a section is completed
  const isSectionCompleted = (section) => {
    if (section === 'votre_projet') {
      return getActiveSection() === 'vos_informations' || getActiveSection() === 'la_remuneration';
    }
    if (section === 'vos_informations') {
      return getActiveSection() === 'la_remuneration';
    }
    return false;
  };

  // Helper function to check if a step is completed
  const isStepCompleted = (stepId) => {
    const stepIndex = steps.findIndex(step => step.id === stepId);
    return stepIndex < currentStep;
  };

  // Current step component
  const CurrentStepComponent = isLandingPage ? null : steps[currentStep].component;

  return (
    <div className="flex h-screen">
      {/* Left sidebar - Navigation Menu - UPDATED with new design */}
      
      <div className="bg-blue-50 pl-30 pr-15 py-70">
  {/* Votre projet section */}
  <h2 className={`text-lg font-semibold mb-6 ${
    getActiveSection() === 'votre_projet'
      ? 'text-[#E42724]'
      : isSectionCompleted('votre_projet') || getActiveSection() === 'vos_informations' || getActiveSection() === 'email' || getActiveSection() === 'votre_estimation'
          ? 'text-[#092C2D]'  // Dark teal when completed or moved to next section
          : 'text-[#F7BCBB]'
  }`}>
    Votre projet
  </h2>
  
  {/* Vos informations section */}
  <div className="mb-6">
    <h3 className={`text-sm font-medium mb-3 ${
      getActiveSection() === 'vos_informations' 
        ? 'text-[#E42724]' 
        : isSectionCompleted('vos_informations') || getActiveSection() === 'la_remuneration' || getActiveSection() === 'email' || getActiveSection() === 'votre_estimation'
          ? 'text-[#092C2D]'  // Dark teal when completed or moved to next section
          : 'text-[#F7BCBB]'
    }`}>
      Vos informations
    </h3>
    
    <div className="relative ml-1">
      {/* Votre profil item */}
      <div className="flex items-start mb-3">
        <div className="relative w-3 flex justify-center">
          {/* Bullet */}
          <div className={`absolute top-1 w-2 h-2 rounded-full ${
            getActiveSection() === 'vos_informations'
              ? getActiveStepId() === 'votre_profil'
                ? 'bg-[#E42724] ring-3 ring-[#F7BCBB]'
                : 'bg-[#E42724]'
              : getActiveSection() === 'la_remuneration' || isStepCompleted('votre_profil')
                ? 'bg-[#092C2D]'  // Dark teal when section is passed
                : 'bg-[#F7BCBB]'
          }`}
          />
          
          {/* Vertical Line */}
          <div className={`absolute top-4 w-1/5 h-4 ${
            getActiveSection() === 'vos_informations'
              ? 'bg-[#E42724]'
              : getActiveSection() === 'la_remuneration' || isStepCompleted('votre_profil')
                ? 'bg-[#092C2D]'  // Dark teal when section is passed
                : 'bg-[#F7BCBB]'
          }`}
          />
        </div>
        
        {/* Text */}
        <span className={`text-sm ml-3 ${
          getActiveStepId() === 'votre_profil'
            ? 'text-[#E42724] font-medium'
            : getActiveSection() === 'vos_informations'
              ? 'text-[#E42724]'
              : getActiveSection() === 'la_remuneration' || isStepCompleted('votre_profil')
                ? 'text-[#092C2D]'
                : 'text-[#F7BCBB]'
        }`}>
          Votre profil
        </span>
      </div>
      
      {/* Votre activité item */}
      <div className="flex items-start">
        <div className="relative w-3 flex justify-center">
          {/* Bullet */}
          <div className={`absolute top-1 w-2 h-2 rounded-full ${
            getActiveSection() === 'vos_informations'
              ? (getActiveStepId() === 'votre_activite1' || getActiveStepId() === 'votre_activite2')
                ? 'bg-[#E42724] ring-3 ring-[#F7BCBB]'
                : 'bg-[#E42724]'
              : getActiveSection() === 'la_remuneration' || (isStepCompleted('votre_activite1') || isStepCompleted('votre_activite2'))
                ? 'bg-[#092C2D]'
                : 'bg-[#F7BCBB]'
          }`}
          />
        </div>
        
        {/* Text */}
        <span className={`text-sm ml-3 ${
          (getActiveStepId() === 'votre_activite1' || getActiveStepId() === 'votre_activite2')
            ? 'text-[#E42724] font-medium'
            : getActiveSection() === 'vos_informations'
              ? 'text-[#E42724]'
              : getActiveSection() === 'la_remuneration' || (isStepCompleted('votre_activite1') || isStepCompleted('votre_activite2'))
                ? 'text-[#092C2D]'
                : 'text-[#F7BCBB]'
        }`}>
          Votre activité
        </span>
      </div>
    </div>
  </div>
  
  {/* La rémunération section */}
  <div>
    <h3 className={`text-sm font-medium mb-3 ${
      getActiveSection() === 'la_remuneration' 
        ? 'text-[#E42724]' 
        : isSectionCompleted('la_remuneration') || getActiveSection() === 'email' || getActiveSection() === 'votre_estimation'
          ? 'text-[#092C2D]'  // Dark teal when completed or moved to next section
          : 'text-[#F7BCBB]'
    }`}>
      La rémunération
    </h3>
    
    <div className="relative ml-1">
      {/* Votre salaire item */}
      <div className="flex items-start mb-3">
        <div className="relative w-3 flex justify-center">
          {/* Bullet */}
          <div className={`absolute top-1 w-2 h-2 rounded-full ${
            getActiveSection() === 'la_remuneration'
              ? (getActiveStepId() === 'votre_salaire1' || getActiveStepId() === 'votre_salaire2')
                ? 'bg-[#E42724] ring-3 ring-[#F7BCBB]'
                : 'bg-[#E42724]'
              : isSectionCompleted('la_remuneration') || (isStepCompleted('votre_salaire1') && isStepCompleted('votre_salaire2'))
                ? 'bg-[#092C2D]'
                : 'bg-[#F7BCBB]'
          }`}
          />
          
          {/* Vertical Line */}
          <div className={`absolute top-4 w-1/5 h-4 ${
            getActiveSection() === 'la_remuneration'
              ? 'bg-[#E42724]'
              : isSectionCompleted('la_remuneration') || (isStepCompleted('votre_salaire1') && isStepCompleted('votre_salaire2'))
                ? 'bg-[#092C2D]'
                : 'bg-[#F7BCBB]'
          }`}
          />
        </div>
        
        {/* Text */}
        <span className={`text-sm ml-3 ${
          (getActiveStepId() === 'votre_salaire1' || getActiveStepId() === 'votre_salaire2')
            ? 'text-[#E42724] font-medium'
            : getActiveSection() === 'la_remuneration'
              ? 'text-[#E42724]'
              : isSectionCompleted('la_remuneration') || (isStepCompleted('votre_salaire1') && isStepCompleted('votre_salaire2'))
                ? 'text-[#092C2D]'
                : 'text-[#F7BCBB]'
        }`}>
          Votre salaire
        </span>
      </div>
      
      {/* Votre bulletin de paie item */}
      <div className="flex items-start">
        <div className="relative w-3 flex justify-center">
          {/* Bullet */}
          <div className={`absolute top-1 w-2 h-2 rounded-full ${
            getActiveSection() === 'la_remuneration'
              ? (getActiveStepId() === 'votre_bulletin_de_paie1' || getActiveStepId() === 'votre_bulletin_de_paie2')
                ? 'bg-[#E42724] ring-3 ring-[#F7BCBB]'
                : 'bg-[#E42724]'
              : isSectionCompleted('la_remuneration') || (isStepCompleted('votre_bulletin_de_paie1') || isStepCompleted('votre_bulletin_de_paie2'))
                ? 'bg-[#092C2D]'
                : 'bg-[#F7BCBB]'
          }`}
          />
        </div>
        
        {/* Text */}
        <span className={`text-sm ml-3 ${
          (getActiveStepId() === 'votre_bulletin_de_paie1' || getActiveStepId() === 'votre_bulletin_de_paie2')
            ? 'text-[#E42724] font-medium'
            : getActiveSection() === 'la_remuneration'
              ? 'text-[#E42724]'
              : isSectionCompleted('la_remuneration') || (isStepCompleted('votre_bulletin_de_paie1') || isStepCompleted('votre_bulletin_de_paie2'))
                ? 'text-[#092C2D]'
                : 'text-[#F7BCBB]'
        }`}>
          Votre bulletin de paie
        </span>
      </div>
    </div>
  </div>
</div>
      

      {/* Main content */}
      <div className="relative flex-1 flex flex-col pl-20 bg-[#FCFCFC]">
        {isLandingPage ? (
// Landing page content
<div className="flex-1 flex flex-col items-start justify-center p-4 bg-[#FCFCFC]">
  {/* Content container */}
  <div className="w-full max-w-[500px] text-left">
    {/* SVG illustration */}
<div className="mb-6 w-[150px] h-[112.5px] sm:w-[200px] sm:h-[150px] flex items-center ">
  <img 
    src="/simulator-pro/first-estimation.svg"
    alt="Estimation illustration"
    width="151px"
    height="163px"
  />
</div>
    {/* Text content */}
    <h1
      className="mb-4 w-full max-w-[518px] text-[#0A2C2D] font-figtree text-2xl sm:text-[32px] font-semibold leading-none"
    >
      Estimez votre bulletin de <br className="hidden sm:block" /> <span className="block mt-2">paie en moins de 4 minutes !</span>
    </h1>
   
    <p
      className="mb-6 w-full max-w-[316px] text-[#0A2C2D]/70 font-figtree text-sm sm:text-base font-medium leading-[25px]"
    >
      Un peu de texte pour préciser de quoi il est question et pour éviter d'avoir un titre trop long qui manque de punch
    </p>
    {/* CTA Button */}
    <button
      onClick={handleStartEstimation}
      className="inline-flex px-4 py-4 justify-center items-center gap-1 rounded-lg bg-[#E42724] text-white font-figtree text-base font-medium leading-none hover:bg-[#c82333] transition-colors duration-200"
    >
      Estimer mon bulletin de paie
    </button>
  </div>
</div>
        ) : (
          // Step content when not on landing page
          <div className="flex flex-col h-full">
            {/* Header with title and icon ################################################*/}
            
            
            {/* Dynamic step content #######################################################*/}
            <div className="flex-1 mb-12">
              {CurrentStepComponent && <CurrentStepComponent data={formData} setData={setFormData} />}
            </div>
            
{/* Navigation buttons - fixed at bottom with no background */}
<div className="absolute bottom-44 left-26 flex gap-4"> {/* Adjust bottom-8 to control height from bottom */}
  {/* Previous button */}
  <button 
    onClick={handlePrev}
    className="flex items-center gap-2 px-8 py-3 rounded-md bg-[#D5F5F6] text-gray-700 hover:bg-blue-100 transition-colors duration-200 shadow-sm hover:shadow-md"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
    Précédent
  </button>
  
  {/* Next button */}
  {currentStep < steps.length - 1 && (
    <button 
      onClick={handleNext}
      className="flex items-center gap-2 px-8 py-3 rounded-md bg-[#E42724] text-white hover:bg-red-700 transition-colors duration-200 shadow-md hover:shadow-lg"
    >
      Suivant
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
    </button>
  )}
</div>
          </div>
        )}
      </div>
    </div>
  );
}