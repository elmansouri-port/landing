"use client"
import { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, ArrowLeft, AlertTriangle } from 'lucide-react';

const SalarySimulationForm = () => {
  // Form phases
  const phases = [
    { id: 1, title: 'Informations personnelles' },
    { id: 2, title: 'Détails du contrat' },
    { id: 3, title: 'Paramètres de simulation' },
    { id: 4, title: 'Résultats' }
  ];

  // Form state
  const [currentPhase, setCurrentPhase] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [simulationResult, setSimulationResult] = useState(null);
  const [apiError, setApiError] = useState('');

  // Form data
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    convention: '',
    artiste: true,
    cadre: false,
    duree: '',
    montant: '',
    mode: 2
  });

  // Conventions options
  const conventions = [
    { value: '1285', label: '1285 Entreprises artistiques et culturelles' },
    { value: '1790', label: '1790 Espaces de loisirs, d\'attractions et culturels' },
    { value: '1922', label: '1922 Radiodiffusion' },
    { value: '2412', label: '2412 Production de films d\'animation' },
    { value: '2642', label: '2642 Production audiovisuelle' },
    { value: '2717', label: '2717 Entreprises techniques au service de la création et de l\'événement' },
    { value: '2770', label: '2770 Edition phonographique (annexée à 2121)' },
    { value: '3090', label: '3090 Entreprises du secteur privé du spectacle vivant' },
    { value: '3097', label: '3097 Production cinématographique' }
  ];

  // Calculation modes
  const calculationModes = [
    { value: 2, label: 'Salaire brut' },
    { value: 3, label: 'Salaire net' },
    { value: 4, label: 'Coût employeur' }
  ];

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem('salarySimulationFormData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (e) {
        console.error('Error parsing saved form data', e);
      }
    }
  }, []);

  // Save data to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem('salarySimulationFormData', JSON.stringify(formData));
  }, [formData]);

  // Handle input changes
  const handleChange = (e) => {
    const { id, name, value, type, checked } = e.target;
    
    // Get the field name (prefer name over id)
    const fieldName = name || id;
    
    // Handle different input types
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [fieldName]: checked }));
    } else if (type === 'radio') {
      setFormData(prev => ({ ...prev, [fieldName]: value === 'true' }));
    } else {
      setFormData(prev => ({ ...prev, [fieldName]: value }));
    }
  };

  // Navigate between phases
  const goToNextPhase = () => {
    if (currentPhase < phases.length) {
      setCurrentPhase(currentPhase + 1);
    }
  };

  const goToPreviousPhase = () => {
    if (currentPhase > 1) {
      setCurrentPhase(currentPhase - 1);
    }
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
  };

  // Simulate salary - API request function
  const simulateSalary = async (data) => {
    const url = 'https://app.intuitiverh.fr:5091/api/Simulations/Calcul';
    const payload = {
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      convention: data.convention,
      mode: parseInt(data.mode),
      montant: parseFloat(data.montant),
      duree: parseInt(data.duree),
      artiste: data.artiste,
      cadre: data.cadre
    };
    
    const headers = {
      'Content-Type': 'application/json; charset=utf-8'
    };
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error making request:", error);
      throw error;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setApiError('');
    
    try {
      // Validate form data
      if (!formData.nom || !formData.prenom || !formData.email || !formData.convention || 
          !formData.duree || !formData.montant || !formData.mode) {
        throw new Error('Veuillez remplir tous les champs obligatoires.');
      }
      
      // Make API request
      const result = await simulateSalary(formData);
      
      // Check if the API returned an error
      if (result.error && result.error.trim() !== '') {
        setApiError(result.error);
        setSimulationResult(null);
      } else {
        setSimulationResult(result);
        setApiError('');
        console.log("Simulation Results:", result);
      }
      
      goToNextPhase();
    } catch (error) {
      setError(error.message || 'Une erreur est survenue. Veuillez réessayer.');
      setSimulationResult(null);
    } finally {
      setLoading(false);
    }
  };

  // Check if current phase is valid
  const isCurrentPhaseValid = () => {
    switch (currentPhase) {
      case 1:
        return formData.nom && formData.prenom && 
               formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      case 2:
        return formData.convention && (formData.artiste !== undefined);
      case 3:
        return formData.duree && formData.montant && formData.mode;
      default:
        return true;
    }
  };

  // Render form based on current phase
  const renderFormContent = () => {
    switch (currentPhase) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">Nom:</label>
              <input
                required
                id="nom"
                value={formData.nom}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-700"
                type="text"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">Prénom:</label>
              <input
                required
                id="prenom"
                value={formData.prenom}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-700"
                type="text"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">Email:</label>
              <input
                required
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-700"
                type="email"
              />
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">Convention collective:</label>
              <select
                id="convention"
                value={formData.convention}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-700"
              >
                <option value="" disabled>Sélectionnez une convention</option>
                {conventions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">Emploi:</label>
              <div className="flex items-center space-x-4 mb-2">
                <label className="flex items-center text-gray-700">
                  <input
                    type="radio"
                    name="artiste"
                    value="true"
                    checked={formData.artiste === true}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span>Artiste</span>
                </label>
                <label className="flex items-center text-gray-700">
                  <input
                    type="radio"
                    name="artiste"
                    value="false"
                    checked={formData.artiste === false}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span>Technicien</span>
                </label>
              </div>
              
              <label className="flex items-center text-gray-700">
                <input
                  type="checkbox"
                  id="cadre"
                  checked={formData.cadre}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span>Cadre</span>
              </label>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">Durée du contrat en jour(s):</label>
              <input
                required
                id="duree"
                value={formData.duree}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-700"
                type="number"
                min="1"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">Montant en euros:</label>
              <input
                required
                id="montant"
                value={formData.montant}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-700"
                type="number"
                min="0"
                step="0.01"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">Mode de calcul:</label>
              <select
                id="mode"
                value={formData.mode}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-700"
              >
                <option value="" disabled>Sélectionnez un mode</option>
                {calculationModes.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Résultats de la simulation</h3>
            
            {apiError ? (
              <div className="bg-red-50 p-6 rounded-lg border border-red-200 text-center">
                <div className="flex justify-center mb-4">
                  <AlertTriangle size={48} className="text-red-500" />
                </div>
                <h4 className="text-lg font-semibold text-red-700 mb-2">Erreur</h4>
                <p className="text-red-600">{apiError}</p>
              </div>
            ) : simulationResult ? (
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Informations</h4>
                    <div className="space-y-2">
                      <p className="flex justify-between">
                        <span className="text-gray-600">Convention:</span>
                        <span className="font-medium">{simulationResult.convention}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-600">Type d'emploi:</span>
                        <span className="font-medium">{simulationResult.artiste ? 'Artiste' : 'Technicien'}{simulationResult.cadre ? ' (Cadre)' : ''}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-600">Durée du contrat:</span>
                        <span className="font-medium">{simulationResult.duree} jour(s)</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Montants</h4>
                    <div className="space-y-3">
                      <p className="flex justify-between">
                        <span className="text-gray-600">Salaire brut:</span>
                        <span className="font-bold">{formatCurrency(simulationResult.brut)}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-600">Charges salariales:</span>
                        <span className="font-medium">{formatCurrency(simulationResult.salariales)}</span>
                      </p>
                      <p className="flex justify-between border-t pt-2">
                        <span className="text-gray-600">Salaire net:</span>
                        <span className="font-bold text-green-600">{formatCurrency(simulationResult.net)}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm md:col-span-2">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Coût employeur</h4>
                    <div className="space-y-3">
                      <p className="flex justify-between">
                        <span className="text-gray-600">Charges patronales:</span>
                        <span className="font-medium">{formatCurrency(simulationResult.patronales)}</span>
                      </p>
                      <p className="flex justify-between border-t pt-2">
                        <span className="text-gray-600">Coût total employeur:</span>
                        <span className="font-bold text-blue-600">{formatCurrency(simulationResult.cout)}</span>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 bg-gray-100 p-3 rounded text-sm text-gray-500">
                  <p>Simulation effectuée pour {simulationResult.prenom} {simulationResult.nom}{simulationResult.duration ? ` en ${simulationResult.duration} ms` : ''}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Aucun résultat disponible</p>
              </div>
            )}
            
            <div className="flex justify-center mt-6">
              <button
                type="button"
                onClick={() => {
                  setCurrentPhase(1);
                  setSimulationResult(null);
                  setApiError('');
                }}
                className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-all"
              >
                Nouvelle simulation
              </button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll">
          <div className="inline-flex px-3 py-2 bg-red-100 rounded-lg mb-4">
            <span className="text-red-600 text-sm font-medium">
              Simulation
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Simulateur de salaire</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Estimez rapidement votre salaire selon votre convention collective et vos paramètres spécifiques
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Progress bar */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between mb-2">
              {phases.map((phase) => (
                <div 
                  key={phase.id}
                  className={`text-xs font-medium ${
                    currentPhase >= phase.id ? 'text-red-600' : 'text-gray-400'
                  }`}
                >
                  {phase.title}
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentPhase - 1) / (phases.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Form content */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            {renderFormContent()}
            
            {/* Error message */}
            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg mt-6">
                {error}
              </div>
            )}
            
            {/* Navigation buttons */}
            {currentPhase < 4 && (
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={goToPreviousPhase}
                  disabled={currentPhase === 1}
                  className={`flex items-center ${
                    currentPhase === 1
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-700 hover:text-red-600'
                  }`}
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Précédent
                </button>
                
                {currentPhase === 3 ? (
                  <button
                    type="submit"
                    disabled={!isCurrentPhaseValid() || loading}
                    className={`bg-red-600 text-white px-6 py-3 rounded-md flex items-center ${
                      !isCurrentPhaseValid() || loading
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-red-700'
                    }`}
                  >
                    {loading ? 'Chargement...' : 'Simuler'}
                    {!loading && <ArrowRight size={16} className="ml-2" />}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={goToNextPhase}
                    disabled={!isCurrentPhaseValid()}
                    className={`bg-red-600 text-white px-6 py-3 rounded-md flex items-center ${
                      !isCurrentPhaseValid()
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-red-700'
                    }`}
                  >
                    Suivant
                    <ArrowRight size={16} className="ml-2" />
                  </button>
                )}
              </div>
            )}
          </form>
        </div>
        
        {/* Disclaimer/Info box */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 mt-12 max-w-2xl mx-auto animate-on-scroll">
          <div className="text-white">
            <h3 className="text-lg font-bold mb-2">Information importante</h3>
            <p className="text-gray-300">
              Cette simulation est donnée à titre indicatif et peut varier selon votre situation spécifique. 
              Pour des informations précises, veuillez consulter un expert-comptable ou un professionnel 
              des ressources humaines.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalarySimulationForm;