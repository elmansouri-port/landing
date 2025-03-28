export default function VotreEstimation({ data, setData }) {
  return (
    <div className="flex flex-col items-start px-2 sm:px-0">
      <div className="flex flex-col bg-[#FCFCFC] w-full">
        <div className="w-full max-w-[700px] text-left">
          <div className="mb-4 w-[100px] h-[80px] sm:w-[160px] sm:h-[90px] relative">
            <div className="absolute inset-0 animate-float">
              <img
                src="/simulator-pro/flydamme.png"
                alt="Estimation"
                width="139"
                height="129"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div className="text-teal-950 text-xl sm:text-2xl font-semibold pb-3 sm:pb-5">
            Votre estimation
          </div>
        </div>
      </div>
      <div className="w-full max-w-[550px] p-4 sm:p-6 bg-oklch(0.977 0.013 236.62) border-2 rounded-xl border-gray-300">
        <div className="text-red-600 text-2xl sm:text-3xl font-bold mb-4">
          1245 € - 1489 €
        </div>
        <div className="flex flex-col sm:flex-row items-stretch mb-10 border border-gray-200 rounded-lg p-3 sm:p-4 bg-white">
          {/* Illustration container */}
          <div className="w-full sm:w-[171px] h-[132px] flex-shrink-0 sm:mr-4 mb-4 sm:mb-0 flex items-center justify-center">
            <img
              src="/simulator-pro/fsimulation.png"
              alt="Estimation"
              width="171"
              height="132"
              className="object-contain w-full h-full"
            />
          </div>
          
          <div className="flex flex-col justify-between w-full">
            <p className="text-gray-600 mb-4 text-[13px] sm:text-[14px]">
              Cette fourchette représente <b>une estimation indicative.</b> Pour
              un résultat plus précis et personnalisé, explorez les options
              disponibles.
            </p>
            <button className="bg-red-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-red-700 transition w-full text-sm sm:text-base">
              Obtenez un résultat plus détaillé
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="w-full sm:w-1/2 mb-4 sm:mb-0 p-3 sm:p-4 rounded-lg bg-white shadow-sm">
            <div className="text-sm mb-2 font-semibold text-black">
              Retrouvez votre simulation
            </div>
            <div className="text-xs text-gray-600 mb-2">
              Créez un compte et retrouvez votre simulation
            </div>
            <button className="bg-[#D5F5F6] w-full text-[#0A2C2D] py-2 rounded-lg hover:bg-blue-200 transition text-sm">
              Créez un compte
            </button>
          </div>
          <div className="w-full sm:w-1/2 p-3 sm:p-4 rounded-lg bg-white shadow-sm">
            <div className="text-sm mb-2 font-semibold text-black">
              Besoin d'aide ?
            </div>
            <div className="text-xs text-gray-600 mb-2">
              Nos experts sont là pour vous aider
            </div>
            <button className="bg-[#D5F5F6] w-full text-[#0A2C2D] py-2 rounded-lg hover:bg-blue-200 transition text-sm">
              Prenez rendez-vous
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}