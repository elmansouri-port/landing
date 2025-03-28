import React, { useState } from "react";

export default function Email({
  data,
  setData,
  onNext,
  onPrev,
  isLastStep,
  isCurrentStepComplete,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e) => {
    setData({ ...data, Email: e.target.value, Consent: false });
  };

  const clearEmail = () => {
    setData({ ...data, Email: "" });
  };

  const [selected, setSelected] = useState(false);

  const isChecked = (e) => {
    setSelected(e.target.checked);
  };

  // Email validation function
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isEmailValid = data.Email ? isValidEmail(data.Email) : false;

  const handleNext = () => {
    if (isEmailValid && data.Consent) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onNext();
      }, 8000); // 2 seconds loading screen
    }
  };

  // If loading, render the loading screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center">
        <div className="relative">
          <img
            src="/simulator-pro/flydammefull.png"
            alt="Flying illustration"
            className="animate-fly w-64 h-64 object-contain"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 pl-4 max-w-2xl bg-[#FCFCFC]">
      <div className="flex flex-col bg-[#FCFCFC]">
        <div className="w-full max-w-[700px] text-left">
          <div className="mb-4 w-[120px] h-[90px] sm:w-[160px] sm:h-[90px]">
            <img
              src="/simulator-pro/the-guy.svg"
              alt="Estimation"
              width="121px"
              height="130px"
            />
          </div>
          <div className="text-teal-950 text-3xl font-semibold pb-5">
            Plus qu'un pas avant votre estimation !
          </div>
        </div>
      </div>

      {/* Structure name input - new section */}
      <div className="text-base" style={{ color: "#0A2C2D" }}>
        {/* Flex container that will wrap on small screens */}
        <div className="flex flex-wrap items-center gap-1">
          <div className="text-teal-950 font-normal font-['Figtree'] pb-3 max-w-[500px]">
            Pour obtenir votre estimation nous avons besoin de votre e-mail
            professionnel (pas de panique nous ne vous enverrons aucune pub)
          </div>
        </div>
        {/* Input container with padding to prevent overlap */}
        <div className="p-3 rounded-lg outline-2 outline-offset-[-1px] outline-cyan-700 inline-flex items-center gap-px relative">
          <input
            type="email"
            value={data?.Email || ""}
            onChange={handleEmailChange}
            className="text-[#285E86] font-medium font-['Figtree'] leading-tight bg-transparent outline-none placeholder:text-blue-300 min-w-[30px] pr-6"
            placeholder="exemple@email.com"
            style={{
              "--input-width": `${Math.max(
                data?.Email?.length * 8 || "Compagnie Deconcerto  ".length * 8, // Start with placeholder width
                195 // Ensure a reasonable minimum width
              )}px`,
              width: "var(--input-width)",
              maxWidth: "100%", // Prevent overflow
            }}
          />

          {/* Clear button */}
          {data?.Email && (
            <button
              onClick={clearEmail}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      {/* Radio button updated to use data.Consent */}
      <label className="flex items-center cursor-pointer mt-3">
        <input
          type="radio"
          name="consent"
          checked={data.Consent}
          onChange={(e) => setData({ ...data, Consent: e.target.checked })}
          className="hidden"
        />
        <div className="w-3.5 h-3.5 rounded border border-cyan-700 flex items-center justify-center">
          {data.Consent && (
            <div className="w-2 h-2 bg-cyan-700 rounded-full" />
          )}
        </div>
        <div className="ml-2 text-teal-950 text-opacity-60 text-xs font-normal font-['Figtree']">
          J'accepte les RGPD
        </div>
      </label>

      {/* Navigation buttons */}
      <div className="mt-8 flex gap-4">
        {/* Previous button remains the same */}
        <button
          onClick={onPrev}
          className="flex items-center gap-2 px-8 py-3 rounded-md bg-[#D5F5F6] text-gray-700 hover:bg-blue-100 transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Précédent
        </button>

        {/* Next button with updated disabled condition */}
        <button
          onClick={handleNext}
          disabled={!(isEmailValid && data.Consent)}
          className={`flex items-center gap-2 px-8 py-3 rounded-md transition-colors duration-200 shadow-md hover:shadow-lg 
          ${isEmailValid && data.Consent ? "bg-[#E42724] text-white hover:bg-red-700" : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          {isLastStep ? "Terminer" : "Suivant"}
          {!isLastStep && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}