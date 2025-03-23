import React from 'react';

export default function VotreProjet1({ data, setData }) {
  // Handler for when a domain option is selected
  const handleDomainSelect = (domain) => {
    setData({ ...data, domain });
  };

  // Domain options
  const domainOptions = [
    ['le spectacle vivant', 'l\'audiovisuel', 'le cinéma', 'la radiodiffusion'],
    ['la musique', 'la télédiffusion', 'l\'enregistrement sonore', 'autres']
  ];

  return (
    <div className="pl-6 bottom-3 max-w-4xl mx-auto bg-gray-50">

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
  </div>
</div>
      {/* Sentence with placeholder */}
      <div className="mb-8 text-lg" style={{ color: "#0A2C2D" }}>
        <p>
          Le domaine de mon projet est{' '}
          <div className="px-2 py-1 bg-slate-100 rounded-lg inline-flex justify-start items-center gap-2">
          <span className="text-[#285E86] font-medium">
            {data?.domain || 'le cinéma'}
          </span>
          
          </div>
          {' '}.
        </p>
      </div>

      {/* Domain options - using flex-wrap for each row */}
      {domainOptions.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-wrap gap-4 mb-4">
          {row.map((domain) => (
            data?.domain === domain ? (
              // Selected state
              <div 
                key={domain}
                onClick={() => handleDomainSelect(domain)}
                data-property-1="Selected" 
                className="p-4 bg-[#E7F1F8] rounded-lg outline outline-3 outline-offset-[-2px] outline-[#9DC4E2] inline-flex justify-center items-center gap-2 cursor-pointer"
                style={{ whiteSpace: 'nowrap' }}
              >
                <div className="justify-start text-[#285E86] text-base font-semibold font-['Figtree']">
                  {domain}
                </div>
              </div>
            ) : (
              // Default state
              <div 
                key={domain}
                onClick={() => handleDomainSelect(domain)}
                data-property-1="Default" 
                className="p-4 rounded-lg outline outline-3 outline-offset-[-2px] outline-[#BFD9EC] inline-flex justify-center items-center gap-2 cursor-pointer hover:bg-slate-50"
                style={{ whiteSpace: 'nowrap' }}
              >
                <div className="justify-start text-teal-950 text-base font-semibold font-['Figtree']">
                  {domain}
                </div>
              </div>
            )
          ))}
        </div>
      ))}
    </div>
  );
}