"use client";
import { useState } from "react";

import VotreProjet1 from "./components/votre_projet/votre_projet1";
import VotreProjet2 from "./components/votre_projet/votre_projet2";
import VotreProjet3 from "./components/votre_projet/votre_projet3";
import VotreProjet4 from "./components/votre_projet/votre_projet4";
import VotreActivite1 from "./components/vos_informations/votre_activite1";
import VotreActivite2 from "./components/vos_informations/votre_activite2";
import VotreProfil from "./components/vos_informations/votre_profil";
import VotreSalaire1 from "./components/la_remuneration/votre_salarie1";
//import VotreSalaire2 from "./components/la_remuneration/votre_salarie2";
import VotreBulletinDePaie1 from "./components/la_remuneration/votre_bulletin_de_paie1";
import VotreBulletinDePaie2 from "./components/la_remuneration/votre_bulletin_de_paie2";
import VotreEstimation from "./components/votre_estimation";
import Email from "./components/email";

export default function SimulatorPro() {
  // State landing page or steps
  const [isLandingPage, setIsLandingPage] = useState(true);

  // State current step
  const [currentStep, setCurrentStep] = useState(0);

  // form data
  const [formData, setFormData] = useState({});

  // My steps
  
  /*excluded ,
    {
      id: "votre_salaire2",
      component: VotreSalaire2,
      section: "la_remuneration",
      title: "Votre salaire",
    }*/
  const steps = [
    {
      id: "votre_projet1",
      component: VotreProjet1,
      section: "votre_projet",
      title: "Votre projet",
    },
    {
      id: "votre_projet2",
      component: VotreProjet2,
      section: "votre_projet",
      title: "Votre projet",
    },
    {
      id: "votre_projet3",
      component: VotreProjet3,
      section: "votre_projet",
      title: "Votre projet",
    },
    {
      id: "votre_projet4",
      component: VotreProjet4,
      section: "votre_projet",
      title: "Votre projet",
    },
    {
      id: "votre_profil",
      component: VotreProfil,
      section: "vos_informations",
      title: "Votre profil",
    },
    {
      id: "votre_activite1",
      component: VotreActivite1,
      section: "vos_informations",
      title: "Votre activité",
    },
    {
      id: "votre_activite2",
      component: VotreActivite2,
      section: "vos_informations",
      title: "Votre activité",
    },
    {
      id: "votre_salaire1",
      component: VotreSalaire1,
      section: "la_remuneration",
      title: "Votre salaire",
    },
    {
      id: "votre_bulletin_de_paie1",
      component: VotreBulletinDePaie1,
      section: "la_remuneration",
      title: "Votre bulletin de paie",
    },
    {
      id: "votre_bulletin_de_paie2",
      component: VotreBulletinDePaie2,
      section: "la_remuneration",
      title: "Votre bulletin de paie",
    },
    { id: "email", component: Email, section: "email", title: "Email" },
    {
      id: "votre_estimation",
      component: VotreEstimation,
      section: "votre_estimation",
      title: "Votre estimation",
    },
  ];

  // Handler for the start button on landing page
  const handleStartEstimation = () => {
    setIsLandingPage(false);
    setCurrentStep(0);
  };

  // Navigation handlers

  const isStepComplete = () => {
    return Object.keys(formData).length > currentStep;
  };

  const handleNext = () => {
    if (!isStepComplete(formData, currentStep)) {
      return false;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      return true;
    }

    return true;
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      setIsLandingPage(true);
    }
  };

  const getActiveSection = () => {
    if (isLandingPage) return "landing";
    return steps[currentStep].section;
  };

  const getActiveStepId = () => {
    if (isLandingPage) return null;
    return steps[currentStep].id;
  };

  const isStepCompleted = (stepId) => {
    const stepIndex = steps.findIndex((step) => step.id === stepId);
    return stepIndex < currentStep;
  };

  const CurrentStepComponent = isLandingPage
    ? null
    : steps[currentStep].component;

  // Section order for completion checks
  const sectionOrder = [
    "landing",
    "votre_projet",
    "vos_informations",
    "la_remuneration",
    "email",
    "votre_estimation",
  ];

  const isSectionCompleted = (section) => {
    const currentSection = getActiveSection();
    const currentIdx = sectionOrder.indexOf(currentSection);
    const targetIdx = sectionOrder.indexOf(section);
    return targetIdx < currentIdx;
  };

  const getNavigationStyles = (type, targetIds) => {
    const activeSection = getActiveSection();
    const activeStepId = getActiveStepId();

    const targetIdArray = Array.isArray(targetIds) ? targetIds : [targetIds];

    const step = steps.find((s) => targetIdArray.includes(s.id));
    const sectionId = step?.section || targetIdArray[0];

    const isTargetSectionActive = activeSection === sectionId;
    const isTargetSectionCompleted = isSectionCompleted(sectionId);

    const isActiveStep = targetIdArray.includes(activeStepId);
    const areAllCompleted = targetIdArray.every((id) => isStepCompleted(id));

    if (type === "section") {
      return activeSection === sectionId
        ? "text-[#E42724]"
        : isTargetSectionCompleted
        ? "text-[#092C2D]"
        : "text-[#F7BCBB]";
    }

    if (isTargetSectionActive) {
      if (type === "bullet" && isActiveStep) {
        return "bg-[#E42724] ring-3 ring-[#F7BCBB]";
      }
      return "bg-[#E42724]";
    } else if (areAllCompleted) {
      return "bg-[#092C2D]";
    } else {
      return "bg-[#F7BCBB]";
    }
  };

  return (
    <div className="flex h-lvh bg-[#FCFCFC] max-lg:justify-center max-lg:items-center">
      {/* Left sidebar - Navigation Menu */}

      <div className="max-lg:hidden relative flex flex-col justify-center bg-blue-50 pl-30 pr-15 py-70">
        {/* Votre projet section */}
        <h2
          className={`text-lg font-semibold mb-6 ${getNavigationStyles(
            "section",
            "votre_projet"
          )}`}
        >
          Votre projet
        </h2>

        {/* Vos informations section */}
        <div className="mb-6">
          <h3
            className={`text-sm font-medium mb-3 ${getNavigationStyles(
              "section",
              "vos_informations"
            )}`}
          >
            Vos informations
          </h3>

          <div className="relative ml-1">
            {/* Votre profil item */}
            <div className="flex items-start mb-3">
              <div className="relative w-3 flex justify-center">
                {/* Bullet */}
                <div
                  className={`absolute top-1 w-2 h-2 rounded-full ${getNavigationStyles(
                    "bullet",
                    "votre_profil"
                  )}`}
                />

                {/* Vertical Line */}
                <div
                  className={`absolute top-4 w-1/5 h-4 ${getNavigationStyles(
                    "line",
                    "votre_profil"
                  )}`}
                />
              </div>

              {/* Text */}
              <span
                className={`text-sm ml-3 ${getNavigationStyles(
                  "section",
                  "votre_profil"
                )}`}
              >
                Votre profil
              </span>
            </div>

            {/* Votre activité item */}
            <div className="flex items-start">
              <div className="relative w-3 flex justify-center">
                {/* Bullet */}
                <div
                  className={`absolute top-1 w-2 h-2 rounded-full ${getNavigationStyles(
                    "bullet",
                    ["votre_activite1", "votre_activite2"]
                  )}`}
                />
              </div>

              {/* Text */}
              <span
                className={`text-sm ml-3 ${getNavigationStyles("section", [
                  "votre_activite1",
                  "votre_activite2",
                ])}`}
              >
                Votre activité
              </span>
            </div>
          </div>
        </div>

        {/* La rémunération section */}
        <div>
          <h3
            className={`text-sm font-medium mb-3 ${getNavigationStyles(
              "section",
              ["la_remuneration"]
            )}`}
          >
            La rémunération
          </h3>

          <div className="relative ml-1">
            {/* Votre salaire item */}
            <div className="flex items-start mb-3">
              <div className="relative w-3 flex justify-center">
                {/* Bullet */}
                <div
                  className={`absolute top-1 w-2 h-2 rounded-full ${getNavigationStyles(
                    "bullet",
                    ["votre_salaire1", "votre_salaire2"]
                  )}`}
                />

                {/* Vertical Line */}
                <div
                  className={`absolute top-4 w-1/5 h-4 ${getNavigationStyles(
                    "line",
                    ["votre_salaire1", "votre_salaire2"]
                  )}`}
                />
              </div>

              {/* Text */}
              <span
                className={`text-sm ml-3 ${getNavigationStyles("section", [
                  "votre_salaire1",
                  "votre_salaire2",
                ])}`}
              >
                Votre salarié
              </span>
            </div>

            {/* Votre bulletin de paie item */}
            <div className="flex items-start">
              <div className="relative w-3 flex justify-center">
                {/* Bullet */}
                <div
                  className={`absolute top-1 w-2 h-2 rounded-full ${getNavigationStyles(
                    "bullet",
                    ["votre_bulletin_de_paie1", "votre_bulletin_de_paie2"]
                  )}`}
                />
              </div>

              {/* Text */}
              <span
                className={`text-sm ml-3 ${getNavigationStyles("section", [
                  "votre_bulletin_de_paie1",
                  "votre_bulletin_de_paie2",
                ])}`}
              >
                Votre bulletin de paie
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative flex-1 flex flex-col lg:pl-20 max-lg:px-4 bg-[#FCFCFC] max-lg:justify-center max-lg:items-center">
        {isLandingPage ? (
          // Landing page content
          <div className="flex-1 flex flex-col items-start justify-start pt-45 px-4 bg-[#FCFCFC]">
            {/* Content container */}
            <div className="w-full max-w-[500px] text-left">
              {/* SVG illustration */}
              <div className="mb-6 w-[150px] h-[112.5px] sm:w-[200px] sm:h-[150px] flex items-center max-sm:mb-10">
                <img
                  src="/simulator-pro/first-estimation.svg"
                  alt="Estimation illustration"
                  width="151px"
                  height="163px"
                />
              </div>
              {/* Text content */}
              <h1 className="mb-7 w-full max-w-[518px] text-[#0A2C2D] font-figtree text-2xl sm:text-[32px] font-semibold leading-none">
                Estimez votre bulletin de <br className="hidden sm:block" />{" "}
                <span className="block mt-2">paie en moins de 2 minutes !</span>
              </h1>

              <p className="mb-6 w-full max-w-[316px] text-[#0A2C2D]/70 font-figtree text-sm sm:text-base font-medium leading-[25px]">
              Coût d’un recrutement ? Estimez facilement les charges (patronales, salariales) et le coût total à partir du salaire (brut, net ou coût employeur)
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
          <div className="flex flex-col h-full pt-35 pb-8">
            {/* Content area with fixed positioning */}
            <div className="flex-1 overflow-y-auto">
              {CurrentStepComponent && (
                <CurrentStepComponent
                  data={formData}
                  setData={setFormData}
                  onNext={handleNext}
                  onPrev={handlePrev}
                  isLastStep={currentStep === steps.length - 1}
                  isCurrentStepComplete={isStepComplete(formData, currentStep)}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
