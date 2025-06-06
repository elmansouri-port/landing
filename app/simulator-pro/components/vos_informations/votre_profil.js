export default function votre_profil({
  data,
  setData,
  onNext,
  onPrev,
  isLastStep,
  isCurrentStepComplete,
}) {
  const handleprofileNameChange = (e) => {
    setData({ ...data, profileName: e.target.value });
  };

  const clearprofileName = () => {
    setData({ ...data, profileName: "" });
  };

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
          <div className="flex flex-wrap items-baseline gap-2 pb-7">
            <div className="text-teal-950 text-4xl font-semibold">
              Vos informations
            </div>
            <div className="text-[#99C2E1] text-2xl">/ Votre profil</div>
          </div>
        </div>
      </div>

      {/* profile name input - new section */}
      <div className="text-base" style={{ color: "#0A2C2D" }}>
        <div className="flex flex-wrap items-center gap-1">
          <div className="text-teal-950 font-normal">
            Je m’appelle
          </div>

          <div className="p-3 rounded-lg outline-2 outline-offset-[-1px] outline-cyan-700 inline-flex items-center gap-px relative">
            <input
              type="text"
              value={data?.profileName || ""}
              onChange={handleprofileNameChange}
              className="text-[#285E86] font-medium leading-tight bg-transparent outline-none placeholder:text-blue-300 min-w-[80px] pr-6"
              placeholder="Donald Draper"
              style={{
                "--input-width": `${Math.max(
                  data?.profileName?.length * 8 || "Donald Draper  ".length * 9,
                  90
                )}px`,
                width: "var(--input-width)",
                maxWidth: "100%",
              }}
            />

            {/* Clear button */}
            {data?.profileName && (
              <button
                onClick={clearprofileName}
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

          <div className="text-teal-950 font-normal">.</div>
        </div>
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
