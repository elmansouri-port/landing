export default function VotreProjet1({
  data,
  setData,
  onNext,
  onPrev,
  isCurrentStepComplete,
}) {
  const handleconventionCollectiveSelect = (option) => {
    setData({ ...data, conventionCollective: option.id });
  };

  const conventionCollectiveOptions = [
    { id: "1285", text: "1285 Entreprises artistiques et culturelles" },
    { id: "3097", text: "3097 Production cinématographique" },
    { id: "1790", text: "1790 Espaces de loisirs, d'attractions et culturels" },
    { id: "2412", text: "2412 Production de films d'animation" },
    { id: "3252", text: "3252 Entreprises techniques au service de la création et de l'événement" },
    { id: "2642", text: "2642 Production audiovisuelle" },
    { id: "2770", text: "2770 Edition phonographique (annexée à 2121)" },
    { id: "3090", text: "3090 Entreprises du secteur privé du spectacle vivant" },
    { id: "1922", text: "1922 Radiodiffusion" },
  ];

  return (
    <div className="mt-10 pl-4 max-w-2xl bg-[#FCFCFC]">
      <div className="flex flex-col bg-[#FCFCFC]">
        <div className="w-full max-w-[400px] text-left">
          <div className="mb-4 w-[120px] h-[90px] sm:w-[160px] sm:h-[90px]">
            <img
              src="/simulator-pro/the-guy.svg"
              alt="Estimation"
              width="121px"
              height="130px"
            />
          </div>
          <div className="text-teal-950 text-4xl font-semibold pb-7">
            Votre projet
          </div>
        </div>
      </div>
      <div className="mb-4 text-base" style={{ color: "#0A2C2D" }}>
        <p>
          Ma convention collective est{" "}
          <span
            className={`px-2 py-0.5 rounded-md ${
              data?.conventionCollective
                ? "bg-[#E7F1F8] text-[#285E86]"
                : "bg-slate-100 text-[#99C2E1]"
            }`}
          >
            <span className="font-medium">{data?.conventionCollective || "1285"}</span>
          </span>
          .
        </p>
      </div>
      <div className="flex flex-wrap gap-2.5 w-full">
        {conventionCollectiveOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => handleconventionCollectiveSelect(option)}
            className={`p-3 rounded-md cursor-pointer ${
              data?.conventionCollective === option.id
                ? "bg-[#E7F1F8] outline-3 outline-[#9DC4E2]"
                : "outline-2 outline-slate-300 hover:bg-slate-50"
            }`}
          >
            <div 
              className={`text-sm font-semibold ${
                data?.conventionCollective === option.id
                  ? "text-[#285E86]"
                  : "text-teal-950"
              }`}
            >
              {option.text}
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