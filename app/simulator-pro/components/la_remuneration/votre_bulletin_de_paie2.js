import React, { useState, useEffect } from "react";

export default function VotreBulletinDePaie2({
  data,
  setData,
  onNext,
  onPrev,
  isLastStep,
}) {
  const [localData, setLocalData] = useState({
    bulletinDePaie2: data?.bulletinDePaie2 || "",
    NbTime: data?.NbTime || "",
  });

  const isCurrentStepComplete = !!(
    localData.bulletinDePaie2 && localData.NbTime
  );

  // Handle selection of Bulletin de Paie type
  const handleBulletinDePaie2Select = (selectedOption) => {
    const updatedData = { ...localData, bulletinDePaie2: selectedOption };
    setLocalData(updatedData);
    setData({ ...data, ...updatedData });
  };

  const handleNbTimeChange = (e) => {
    const updatedData = { ...localData, NbTime: e.target.value };
    setLocalData(updatedData);
    setData({ ...data, ...updatedData });
  };

  const clearNbTime = () => {
    const updatedData = { ...localData, NbTime: "" };
    setLocalData(updatedData);
    setData({ ...data, ...updatedData });
  };

  // Bulletin de Paie options
  const bulletinDePaie2Options = [
    "salaire net",
    "salaire brut",
    "coût employeur",
  ];

  return (
    <div className="mt-10 pl-4 max-w-23xl bg-[#FCFCFC]">
      <div className="flex flex-col bg-[#FCFCFC]">
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
            <div className="flex flex-wrap items-baseline gap-2 pb-5">
              <div className="text-teal-950 text-4xl font-semibold">
                La rémunération
              </div>
              <div className="text-[#99C2E1] text-2xl">
                / Votre bulletin de paie
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4 text-base" style={{ color: "#0A2C2D" }}>
        <div>
          Je souhaite que le bulletin de paie soit calculé selon:{" "}
          <span
            className={`px-2 py-0.5 rounded-md ${
              localData.bulletinDePaie2
                ? "bg-[#E7F1F8] text-[#285E86]"
                : "bg-slate-100 text-[#99C2E1]"
            }`}
          >
            <span className="font-medium">
              {localData.bulletinDePaie2 || "salaire net"}
            </span>
          </span>{" "}
          fixé à
          <div className="p-3 rounded-lg outline-2 outline-offset-[-1px] outline-cyan-700 inline-flex items-center gap-px relative">
            <input
              type="Number"
              value={localData.NbTime}
              onChange={handleNbTimeChange}
              className="text-[#285E86] font-medium font-['Figtree'] leading-tight bg-transparent outline-none placeholder:text-blue-300 w-[80px] pr-6 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              placeholder="2 300"
              style={{
                appearance: "none",
                MozAppearance: "none",
              }}
            />

            {/* Clear button */}
            {localData.NbTime && (
              <button
                onClick={clearNbTime}
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
          </div>{" "}
          €
        </div>
      </div>
      <div className="max-w-[500px] flex flex-wrap gap-1.5">
        {bulletinDePaie2Options.map((option) => (
          <div
            key={option}
            onClick={() => handleBulletinDePaie2Select(option)}
            className={`p-3 rounded-md cursor-pointer ${
              localData.bulletinDePaie2 === option
                ? "bg-[#E7F1F8] outline-3 outline-[#9DC4E2]"
                : "outline-2 outline-slate-300 hover:bg-slate-50"
            }`}
          >
            <div
              className={`text-sm font-semibold ${
                localData.bulletinDePaie2 === option
                  ? "text-[#285E86]"
                  : "text-teal-950"
              }`}
            >
              {option}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="mt-8 flex gap-4">
        {/* Previous button */}
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

        {/* Next button */}
        <button
          onClick={onNext}
          disabled={!isCurrentStepComplete}
          className={`flex items-center gap-2 px-8 py-3 rounded-md transition-colors duration-200 shadow-md hover:shadow-lg 
            ${
              isCurrentStepComplete
                ? "bg-[#E42724] text-white hover:bg-red-700"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
        >
          Suivant 
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
        </button>
      </div>
    </div>
  );
}
