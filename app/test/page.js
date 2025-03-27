"use client";

export default function Email({
  data,
  setData,
  onNext,
  onPrev,
  isLastStep,
  isCurrentStepComplete,
}) {
  // If loading, render the loading screen
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <div className="relative">
        <img
          src="/simulator-pro/the-guy.svg"
          alt="Flying illustration"
          className="animate-fly w-64 h-64 object-contain"
        />
      </div>
    </div>
  );
}