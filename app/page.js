"use client"
import React, { useEffect, useState, useRef} from 'react';
import { ChevronRight, Users, Headphones, Zap, CheckCircle, Star, Mail, Phone, MessageSquare, ArrowRight, Award, Calendar, Clock, Database, Menu, X } from 'lucide-react';
import Image from 'next/image';

import {
  LinkIcon,          // For Integrations
  UserGroupIcon,     // For External Guests
  CalendarIcon,      // For Google Calendar
  MicrophoneIcon,    // For Voice Messages
  VideoCameraIcon,   // For Video Messages
  ClockIcon,         // For Scheduling
  LockClosedIcon,    // For Permissions
} from '@heroicons/react/24/outline'; // Use "solid" for filled icons if needed


const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });

/////////////////////////////////////////////////////////////////////////////////////////////////////

const features = [
  {
    id: 'integrations',
    title: 'Integrations',
    description: 'Connect Pumble with your favorite tools and services for a seamless workflow experience.',
    isNew: false,
    benefits: [
      'Integration with 100+ popular tools and services',
      'Automated workflow triggers and actions',
      'Custom API access for enterprise solutions'
    ]
  },
  {
    id: 'external-guests',
    title: 'External Guests',
    description: 'Simplify the way you collaborate with external guests and invite them to a Pumble meeting even if they dont have a Pumble account. No registrations required, just share a link and get started immediately.',
    isNew: true,
    benefits: [
      'No account creation required for guests',
      'Secure, time-limited access controls',
      'Full meeting capabilities for external participants'
    ]
  },
  {
    id: 'google-calendar',
    title: 'Google Calendar',
    description: 'Seamlessly integrate with Google Calendar to schedule meetings, get reminders, and manage your availability.',
    isNew: false,
    benefits: [
      'Two-way sync with Google Calendar',
      'Meeting scheduling with conflict detection',
      'Automated reminders and notifications'
    ]
  },
  {
    id: 'voice-messages',
    title: 'Voice Messages',
    description: 'Send voice messages to your team members when text on the go.',
    isNew: false,
    benefits: [
      'High-quality audio compression',
      'Playback speed controls',
      'Automatic transcription available'
    ]
  },
  {
    id: 'video-messages',
    title: 'Video Messages',
    description: 'Record and share video messages for more personal and engaging team communication.',
    isNew: false,
    benefits: [
      'Screen recording with annotation tools',
      'Expiring video links for sensitive content',
      'Customizable privacy settings'
    ]
  },
  {
    id: 'scheduling',
    title: 'Scheduling',
    description: 'Plan meetings and events with your team using our powerful scheduling tools.',
    isNew: false,
    benefits: [
      'Team availability view',
      'Recurring meeting templates',
      'Time zone intelligent scheduling'
    ]
  },
  {
    id: 'permissions',
    title: 'Permissions',
    description: 'Control access to channels, conversations, and features with granular permission settings.',
    isNew: false,
    benefits: [
      'Role-based access control',
      'Custom permission sets',
      'Compliance and audit logs'
    ]
  }
];



// State for active feature (default to external-guests)
const [activeFeature, setActiveFeature] = useState('external-guests');
const [isAnimating, setIsAnimating] = useState(false);

// Get current feature
const currentFeature = features.find(feature => feature.id === activeFeature);

// Handle feature change with animation
const handleFeatureChange = (featureId) => {
  if (featureId === activeFeature || isAnimating) return;
  
  setIsAnimating(true);
  setTimeout(() => {
    setActiveFeature(featureId);
    setIsAnimating(false);
  }, 300);
};



/////////////////////THIS IS FOR THE TESTIMONIAL SLIDING EVERY 1 SEC ////////////////////////////////

const [touchStart, setTouchStart] = useState(null);
const timerRef = useRef(null);


// Feature Card state
const [activeFeatureTab, setActiveFeatureTab] = useState('voice-messages');
const [previousFeatureTab, setPreviousFeatureTab] = useState('voice-messages');
const [isTransitioning, setIsTransitioning] = useState(false);

// Define feature tabs and their content
const featureTabs = [
  {
    id: 'integrations',
    icon: <LinkIcon className="w-6 h-6" />, // Use the LinkIcon for Integrations
    label: 'Integrations',
    content: {
      title: 'Integrations',
      description: 'Integrate with different apps so you can collaborate from one place.',
      image: '/preview/1.png',
    },
  },
  {
    id: 'external-guests',
    icon: <UserGroupIcon className="w-6 h-6" />, // Use the UserGroupIcon for External Guests
    label: 'External Guests',
    content: {
      title: 'External Guests',
      description: 'Invite clients and external partners to join your workspace.',
      image: '/images/external-guests-preview.png',
    },
  },
  {
    id: 'google-calendar',
    icon: <CalendarIcon className="w-6 h-6" />, // Use the CalendarIcon for Google Calendar
    label: 'Google Calendar',
    content: {
      title: 'Google Calendar',
      description: 'Seamlessly sync with your Google Calendar events.',
      image: '/images/google-calendar-preview.png',
    },
  },
  {
    id: 'voice-messages',
    icon: <MicrophoneIcon className="w-6 h-6" />, // Use the MicrophoneIcon for Voice Messages
    label: 'Voice Messages',
    content: {
      title: 'Voice messages',
      description: 'Sending voice notes in Pumble instead of text and increase your efficiency. Share ideas and updates, or just say hello to your teammates.',
      image: '/images/voice-messages-preview.png',
    },
  },
  {
    id: 'video-messages',
    icon: <VideoCameraIcon className="w-6 h-6" />, // Use the VideoCameraIcon for Video Messages
    label: 'Video Messages',
    content: {
      title: 'Video Messages',
      description: 'Share screen recordings and video messages with your team.',
      image: '/images/video-messages-preview.png',
    },
  },
  {
    id: 'scheduling',
    icon: <ClockIcon className="w-6 h-6" />, // Use the ClockIcon for Scheduling
    label: 'Scheduling',
    content: {
      title: 'Scheduling',
      description: 'Schedule messages and meetings directly in the app.',
      image: '/images/scheduling-preview.png',
    },
  },
  {
    id: 'permissions',
    icon: <LockClosedIcon className="w-6 h-6" />, // Use the LockClosedIcon for Permissions
    label: 'Permissions',
    content: {
      title: 'Permissions',
      description: 'Control who can access what in your workspace.',
      image: '/images/permissions-preview.png',
    },
  },
];

// Handle feature tab change with animation sequence
const handleFeatureTabChange = (tabId) => {
  if (tabId !== activeFeatureTab && !isTransitioning) {
    setIsTransitioning(true);
    setPreviousFeatureTab(activeFeatureTab);
    setActiveFeatureTab(tabId);
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  }
};

// Auto-slide effect
useEffect(() => {
  timerRef.current = setInterval(() => {
    setActiveTab((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  }, 3000);
  
  return () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };
}, []);

// Reset timer when manually changing slides
useEffect(() => {
  if (timerRef.current) {
    clearInterval(timerRef.current);
  }
  
  timerRef.current = setInterval(() => {
    setActiveTab((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  }, 3000);
  
  return () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };
}, [activeTab]);

/////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    setIsVisible(true);
    
    // Add scroll animation for elements
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    console.log('Form submitted:', formData);
    // Reset form or show success message
  };

  // Testimonials data
  const testimonials = [
    {
      quote: "HeroShare a complètement transformé notre approche marketing. Nous avons augmenté nos conversions de 67% en seulement trois mois.",
      name: "Sophie Martin",
      position: "Directrice Marketing, TechVision",
      image: "/client-1.jpg"
    },
    {
      quote: "Grâce à HeroShare, notre entreprise a pu se développer plus rapidement que prévu. Le retour sur investissement a été impressionnant.",
      name: "Thomas Dubois",
      position: "CEO, GrowthLabs",
      image: "/client-2.jpg"
    },
    {
      quote: "L'équipe de HeroShare est exceptionnelle. Leur stratégie nous a permis de doubler notre audience en moins de six mois.",
      name: "Emma Leclerc",
      position: "Fondatrice, Innovative Solutions",
      image: "/client-3.jpg"
    }
  ];

  // Pricing plans
  const pricingPlans = [
    {
      name: "Essentiel",
      price: "499€",
      period: "par mois",
      description: "Parfait pour les petites entreprises qui débutent",
      features: [
        "Analyse complète de votre audience",
        "Optimisation de 3 pages principales",
        "Rapport mensuel de performance",
        "Support par email",
        "1 révision par mois"
      ],
      isPopular: false,
      ctaText: "Commencer"
    },
    {
      name: "Professionnel",
      price: "999€",
      period: "par mois",
      description: "Idéal pour les entreprises en croissance",
      features: [
        "Tout ce qui est inclus dans Essentiel",
        "Optimisation de 10 pages",
        "Stratégie de contenu personnalisée",
        "Support prioritaire",
        "Tests A/B continus",
        "4 révisions par mois"
      ],
      isPopular: true,
      ctaText: "Essayer maintenant"
    },
    {
      name: "Entreprise",
      price: "Sur mesure",
      period: "",
      description: "Pour les grandes organisations avec des besoins spécifiques",
      features: [
        "Tout ce qui est inclus dans Professionnel",
        "Optimisation complète du site",
        "Stratégie omnicanale",
        "Gestionnaire de compte dédié",
        "Réunions stratégiques hebdomadaires",
        "Révisions illimitées"
      ],
      isPopular: false,
      ctaText: "Contactez-nous"
    }
  ];

  // FAQ items
  const faqItems = [
    {
      question: "Combien de temps faut-il pour voir des résultats?",
      answer: "La plupart de nos clients commencent à voir des améliorations dès les 30 premiers jours. Cependant, pour des résultats optimaux et durables, nous recommandons un engagement d'au moins 3 mois. Notre approche est basée sur des données et s'améliore continuellement au fil du temps."
    },
    {
      question: "Comment mesurez-vous le succès de vos stratégies?",
      answer: "Nous utilisons une combinaison de métriques clés adaptées à vos objectifs spécifiques. Cela inclut généralement le taux de conversion, le coût par acquisition, la valeur vie client, et d'autres KPIs pertinents pour votre industrie. Vous recevrez des rapports détaillés montrant clairement les progrès réalisés."
    },
    {
      question: "Travaillez-vous avec des entreprises de toutes tailles?",
      answer: "Oui, notre solution est adaptable aux besoins de différentes entreprises. Nous avons des clients allant des startups aux grandes entreprises. Nos forfaits sont conçus pour s'adapter à différents budgets et objectifs, avec une attention particulière portée à maximiser votre retour sur investissement."
    },
    {
      question: "Est-ce que je peux changer de forfait plus tard?",
      answer: "Absolument! Nous comprenons que les besoins évoluent. Vous pouvez facilement passer à un forfait supérieur à tout moment. Si vous souhaitez réduire votre forfait, ce changement prendra effet à la fin de votre période de facturation actuelle."
    },
    {
      question: "Quel est votre processus de travail?",
      answer: "Notre processus commence par une analyse approfondie de votre situation actuelle et de vos objectifs. Nous développons ensuite une stratégie personnalisée, la mettons en œuvre, mesurons les résultats, et optimisons continuellement. Tout au long du processus, vous recevez des mises à jour régulières et avez accès à notre équipe pour toute question."
    }
  ];

  // Process steps
  const processSteps = [
    {
      icon: <Database size={32} />,
      title: "Analyse Approfondie",
      description: "Nous étudions votre audience, votre marché et votre proposition de valeur pour identifier les meilleures opportunités."
    },
    {
      icon: <Award size={32} />,
      title: "Stratégie Personnalisée",
      description: "Création d'une stratégie sur mesure alignée avec vos objectifs spécifiques et votre positionnement unique."
    },
    {
      icon: <Clock size={32} />,
      title: "Mise en Œuvre",
      description: "Déploiement rapide et efficace des solutions optimisées pour maximiser vos conversions."
    },
    {
      icon: <Calendar size={32} />,
      title: "Analyse et Optimisation",
      description: "Suivi continu des performances et ajustements stratégiques pour améliorer constamment les résultats."
    }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  return (
    <div className="min-h-screen bg-white font-sans">
      
      <header className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-screen-lg bg-white/80 backdrop-blur-lg shadow-lg rounded-lg z-50">
  <nav className="flex justify-between items-center px-3 sm:px-4 md:px-6 py-3">
    {/* Logo Section */}
    <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
      <img 
        src="https://www.cheque-intermittents.com/wp-content/uploads/2024/09/logo-cheque-intermittents-vector.svg" 
        alt="Logo" 
        className="h-7 sm:h-8 md:h-10 w-auto"
      />
    </div>
    
    {/* Desktop Navigation Container */}
    <div className="hidden md:flex flex-1 justify-end items-center">
      {/* Navigation Links - Adjusted for better spacing */}
      <div className="flex flex-1 justify-center">
        <div className="flex space-x-1 lg:space-x-4 xl:space-x-6 mx-2 lg:mx-4 overflow-x-auto no-scrollbar">
          {[
            "Nos solutions",
            "Estimer mes pales",
            "Tarif",
            "Ressources",
            "À propos",
            "Contact"
          ].map((text, index) => (
            <a
              key={index}
              href="#"
              className="text-gray-900 hover:text-red-700 transition-colors 
                whitespace-nowrap text-xs lg:text-sm xl:text-base font-medium px-1 lg:px-2"
            >
              {text}
            </a>
          ))}
        </div>
      </div>
      
      {/* Auth Button - Right-aligned with consistent spacing */}
      <div className="flex-shrink-0 ml-2 lg:ml-4">
        <button 
          className="text-gray-800 hover:text-red-700 bg-gray-100 hover:bg-gray-200
            rounded-[7px] px-2 lg:px-4 py-1.5 lg:py-2 whitespace-nowrap text-xs lg:text-sm xl:text-base
            transition-all duration-200 flex items-center justify-center"
        >
          S'identifier
        </button>
      </div>
    </div>
    
    {/* Mobile Menu Toggle */}
    <div className="md:hidden flex items-center">
      <button 
        onClick={toggleMobileMenu} 
        className="text-gray-900 hover:text-red-700 transition-colors"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  </nav>
  
  {/* Mobile Menu (Collapsible) */}
  {isMobileMenuOpen && (
    <div className="md:hidden px-4 py-2 pb-4 bg-white/90 border-t border-gray-100 rounded-b-lg">
      <div className="flex flex-col space-y-3">
        {[
          "Nos solutions",
          "Estimer mes pales",
          "Tarif",
          "Ressources",
          "À propos",
          "Contact"
        ].map((text, index) => (
          <a
            key={index}
            href="#"
            className="text-gray-900 hover:text-red-700 transition-colors font-medium"
          >
            {text}
          </a>
        ))}
        <button 
          className="text-gray-800 hover:text-red-700 bg-gray-100 hover:bg-gray-200
            rounded-[7px] px-4 py-2 mt-2 transition-all duration-200 flex items-center justify-center"
        >
          S'identifier
        </button>
      </div>
    </div>
  )}
</header>

      {/* Hero Section */}
      <section className="pt-44 pb-20 bg-gradient-to-b from-blue-50 to-white overflow-hidden relative">
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Styled div for the new text above the title */}
          <div 
            className="animate-on-scroll transform transition-all duration-700"
            style={{
              width: 'auto',
              padding: '7.5px 10px 7.85px 10px',
              background: 'rgba(228, 39, 36, 0.15)',
              borderRadius: 7,
              display: 'inline-block',
              marginBottom: 16
            }}
          >
            <div 
              style={{
                color: '#E42724',
                fontSize: '15.3px',
                fontFamily: 'Figtree',
                fontWeight: 500,
                lineHeight: '18.36px',
                wordWrap: 'break-word'
              }}
            >
              La solution complète pour transformer vos visiteurs en clients
            </div>
          </div>
          
          {/* Title and Description */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 max-w-3xl mx-auto animate-on-scroll">
            Augmentez vos conversions de 45% en moins de 90 jours
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-on-scroll">
            HeroShare aide les entreprises ambitieuses à optimiser leur présence en ligne pour convertir plus de visiteurs en clients fidèles grâce à notre méthodologie éprouvée.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12 animate-on-scroll">
            <button className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-all duration-300 hover:scale-105 flex items-center justify-center">
              <span>Réservez un appel gratuit</span>
              <ArrowRight className="ml-2" size={18} />
            </button>
            <button onClick={() => setIsVideoModalOpen(true)} className="bg-white text-gray-800 border border-gray-300 px-6 py-3 rounded-md hover:bg-gray-100 transition-all duration-300 flex items-center justify-center">
              <span>Voir notre démo</span>
              <ChevronRight className="ml-2" size={18} />
            </button>
          </div>
          
          {/* Social Proof */}
          <div className="mt-8 animate-on-scroll">
            <p className="text-gray-500 mb-4">Ils nous font confiance</p>
            <div className="flex flex-wrap justify-center items-center gap-8 max-w-3xl mx-auto">
              <img src="/adobe.jpg" alt="Client Logo" className="h-12 opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/adobe.jpg" alt="Client Logo" className="h-12 opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/adobe.jpg" alt="Client Logo" className="h-12 opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/adobe.jpg" alt="Client Logo" className="h-12 opacity-70 hover:opacity-100 transition-opacity" />
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16 animate-on-scroll">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-red-600 mb-2">+45%</div>
              <p className="text-gray-700">Augmentation moyenne des conversions</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-red-600 mb-2">1500+</div>
              <p className="text-gray-700">Clients satisfaits</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-red-600 mb-2">87%</div>
              <p className="text-gray-700">Réduction du coût d'acquisition</p>
            </div>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-red-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
      </section>

      {/* Problems We Solve Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-flex px-3 py-2 bg-red-100 rounded-lg mb-4">
              <span className="text-red-600 text-sm font-medium">
                Vos défis actuels
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Les obstacles qui limitent votre croissance
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Reconnaissez-vous ces problèmes qui empêchent votre entreprise d'atteindre son plein potentiel?
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Problem 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 animate-on-scroll">
              <div className="flex items-start">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <div className="text-red-600">01</div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-black">Trafic élevé mais conversions faibles</h3>
                  <p className="text-gray-600">
                    Vous attirez des visiteurs sur votre site, mais ils ne se transforment pas en clients. Chaque visiteur qui quitte votre site représente une opportunité perdue.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Problem 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 animate-on-scroll">
              <div className="flex items-start">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <div className="text-red-600">02</div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-black">Message peu convaincant</h3>
                  <p className="text-gray-600">
                    Votre proposition de valeur n'est pas claire ou ne résonne pas suffisamment avec votre audience cible, ce qui réduit l'impact de vos efforts marketing.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Problem 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 animate-on-scroll">
              <div className="flex items-start">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <div className="text-red-600">03</div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-black">Coût d'acquisition client trop élevé</h3>
                  <p className="text-gray-600">
                    Vous investissez beaucoup en publicité et en marketing, mais le retour sur investissement n'est pas à la hauteur de vos attentes.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Problem 4 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 animate-on-scroll">
              <div className="flex items-start">
                <div className="bg-red-100 p-3 rounded-full mr-4 text-black">
                  <div className="text-red-600">04</div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-black">Manque de données exploitables</h3>
                  <p className="text-gray-600">
                    Vous ne savez pas exactement pourquoi vos visiteurs ne convertissent pas, ce qui rend difficile l'amélioration de votre stratégie.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="solutions" className="py-20 bg-white text-center relative">
        <div className="container mx-auto px-4">
          <div className="mb-16 animate-on-scroll">
            <div className="inline-flex px-3 py-2 bg-red-100 rounded-lg mb-4">
              <span className="text-red-600 text-sm font-medium">
                Notre solution
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-black">Comment HeroShare transforme votre succès en ligne</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Notre approche méthodique et éprouvée transforme votre site en une véritable machine à conversion
            </p>
          </div>
          
          {/* Benefits Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative z-10 px-4">
            {/* Card 1 */}
            <div className="flex flex-col items-center p-8 bg-white rounded-3xl shadow-[0px_40px_80px_0px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-lg animate-on-scroll">
              <Users className="text-red-600 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2 text-black">Compréhension client approfondie</h3>
              <p className="text-gray-600 text-center mb-4">Nous analysons votre audience pour créer des messages qui résonnent parfaitement avec leurs besoins et motivations.</p>
              <a href="#" className="text-red-600 inline-flex items-center">
                En savoir plus 
                <span className="ml-2">→</span>
              </a>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center p-8 bg-white rounded-3xl shadow-[0px_40px_80px_0px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-lg animate-on-scroll">
              <Headphones className="text-red-600 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2 text-black">Optimisation continue</h3>
              <p className="text-gray-600 text-center mb-4">Notre système de tests A/B permanents améliore constamment vos taux de conversion, semaine après semaine.</p>
              <a href="#" className="text-red-600 inline-flex items-center">
                En savoir plus
                <span className="ml-2">→</span>
              </a>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center p-8 bg-white rounded-3xl shadow-[0px_40px_80px_0px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-lg animate-on-scroll">
              <Zap className="text-red-600 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2 text-black">Parcours client fluide</h3>
              <p className="text-gray-600 text-center mb-4">Nous créons des parcours d'achat sans friction qui transforment les visiteurs intéressés en clients satisfaits.</p>
              <a href="#" className="text-red-600 inline-flex items-center">
                En savoir plus
                <span className="ml-2">→</span>
              </a>
            </div>
          </div>
          
          {/* Advanced Benefits */}
          <div className="mt-20 grid md:grid-cols-2 gap-12 max-w-5xl mx-auto animate-on-scroll">
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-4 text-black">Une approche basée sur les données</h3>
              <p className="text-gray-600 mb-6">
                Notre méthodologie combine analyse avancée et créativité stratégique pour optimiser chaque aspect de votre présence en ligne.
              </p>
              <ul className="space-y-3">
                {[
                  "Analyse comportementale de vos visiteurs",
                  "Heatmaps et enregistrements de sessions",
                  "Tests A/B scientifiques",
                  "Analyse sémantique des feedbacks clients",
                  "Optimisation continue basée sur les performances"
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-black">
                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1 " size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-100 rounded-xl p-1">
              <img 
                src="/dashboard.png" 
                alt="Analytics Dashboard" 
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

{/* Our Process Section */}
<section id="process" className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
  <div className="container mx-auto px-4 sm:px-6">
    {/* Section Header */}
    <div className="text-center mb-12 md:mb-16">
      <div className="inline-flex px-4 py-2 bg-red-100 rounded-full mb-4">
        <span className="text-red-600 text-sm font-semibold">
          Notre processus
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comment nous transformons votre présence en ligne</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Notre approche méthodique garantit des résultats mesurables et durables
      </p>
    </div>
    
    {/* Process Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
  {processSteps.map((step, index) => (
    <div 
      key={index} 
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
    >
      {/* Thicker header bar */}
      <div className="bg-red-600 h-3 w-full"></div>
      
      <div className="p-8 md:p-10">
        {/* Circular icon background */}
        <div className="flex justify-center mb-8">
          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center transition-colors duration-300 group-hover:bg-red-200">
            <div className="text-red-600 text-2xl">
              {step.icon}
            </div>
          </div>
        </div>
        
        {/* Card Content */}
        <h3 className="text-xl font-bold mb-4 text-gray-900">{step.title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{step.description}</p>
        
        {/* Key Benefits */}
        <ul className="space-y-4 mb-6">
          {[1, 2, 3].map((item) => (
            <li key={item} className="flex items-start">
              <svg className="h-6 w-6 text-red-600 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-base text-gray-600">Avantage clé de cette étape</span>
            </li>
          ))}
        </ul>
        
        {/* Learn More Link */}
        <a 
          href={`#step${index+1}-details`} 
          className="inline-flex items-center text-red-600 font-medium text-base hover:text-red-700 mt-4 transition-colors duration-300"
        >
          En savoir plus
          <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  ))}
</div>
    
    {/* Expert Guidance Box */}
    <div className="max-w-4xl mx-auto mt-16 bg-red-50 rounded-xl p-6 sm:p-8 border border-red-100 shadow-sm">
      <div className="flex flex-col md:flex-row items-center">
        <div className="mb-6 md:mb-0 md:mr-8 flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold mb-2 text-gray-900">Accompagnement expert à chaque étape</h3>
          <p className="text-gray-600 mb-4">Notre équipe d'experts vous guide tout au long du processus pour assurer des résultats optimaux pour votre entreprise.</p>
          <button className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-all duration-300 w-full md:w-auto">
            Découvrir notre processus en détail
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Testimonial Carousel */}
<section id="testimonials" className="py-20 bg-white text-center relative overflow-hidden">
  <div className="container mx-auto px-4">
    <div className="mb-16 animate-on-scroll">
      {/* ... existing header content ... */}
    </div>
    
    {/* Modified Carousel Container */}
    <div 
      className="relative max-w-4xl mx-auto px-4 md:px-10 animate-on-scroll h-96 md:h-80"
      onTouchStart={(e) => {
        setTouchStart(e.touches[0].clientX);
      }}
      onTouchMove={(e) => {
        if (touchStart) {
          const touchEnd = e.touches[0].clientX;
          const diff = touchStart - touchEnd;
          
          if (diff > 50) { // Swipe left
            setActiveTab((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
            setTouchStart(null);
          } else if (diff < -50) { // Swipe right
            setActiveTab((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
            setTouchStart(null);
          }
        }
      }}
      onTouchEnd={() => {
        setTouchStart(null);
      }}
    >
      {/* Testimonials Slider with Depth Effect */}
      <div className="overflow-visible relative h-full flex items-center justify-center">
        <div className="flex justify-center items-center w-full">
          {testimonials.map((testimonial, index) => {
            // Calculate the position relative to activeTab
            let position = index - activeTab;
            
            // Handle circular array
            if (position < -1) position += testimonials.length;
            if (position > 1) position -= testimonials.length;
            
            // Apply different styles based on position
            let zIndex = 10;
            let scale = 1;
            let opacity = 1;
            let blur = "blur-none";
            let translateX = "0%";
            
            if (position === -1) {
              // Card to the left
              zIndex = 5;
              scale = 0.8;
              opacity = 0.6;
              blur = "blur-sm";
              translateX = "-65%";
            } else if (position === 0) {
              // Center card
              zIndex = 20;
            } else if (position === 1) {
              // Card to the right
              zIndex = 5;
              scale = 0.8;
              opacity = 0.6;
              blur = "blur-sm";
              translateX = "65%";
            } else {
              // Hidden cards
              return null;
            }
            
            return (
              <div 
                key={index}
                className="absolute w-full max-w-[90vw] md:max-w-xl transition-all duration-500 ease-in-out"
                style={{ 
                  zIndex,
                  transform: `translateX(${translateX}) scale(${scale})`,
                  opacity
                }}
              >
                <div className={`bg-gray-50 rounded-2xl p-6 md:p-8 shadow-sm ${blur} mx-2`}>
                  <div className="flex flex-col items-center">
                    {/* Stars */}
                    <div className="flex space-x-1 mb-4">
                      {[1, 2, 3, 4, 5].map((_, i) => (
                        <Star key={i} className="text-yellow-400" fill="#FBBF24" size={20} />
                      ))}
                    </div>
                    
                    {/* Quote */}
                    <h3 className="text-xl md:text-2xl text-gray-900 font-bold mb-6 leading-relaxed">
                      "{testimonial.quote}"
                    </h3>
                    
                    {/* Client Info */}
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-gray-900">{testimonial.name}</p>
                        <p className="text-gray-600 text-sm">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Navigation Dots */}
      <div className="flex justify-center space-x-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              activeTab === index ? 'bg-red-600 w-5' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>

    {/* Client Logos */}
    <div className="mt-20 animate-on-scroll">
      {/* ... existing client logos ... */}
    </div>
  </div>
</section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-flex px-3 py-2 bg-red-100 rounded-lg mb-4">
              <span className="text-red-600 text-sm font-medium">
                Tarifs
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Des plans adaptés à vos besoins</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Solutions flexibles pour les entreprises de toutes tailles, avec un excellent retour sur investissement
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-2xl p-8 shadow-sm border relative flex flex-col animate-on-scroll ${
                  plan.isPopular ? 'border-red-600 transform md:-translate-y-4' : 'border-gray-200'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-sm font-medium py-1 px-4 rounded-full ">
                    Recommandé
                  </div>
                )}
                
                <h3 className="text-xl font-bold mb-2 text-black">{plan.name}</h3>
                <div className="mt-2 mb-4">
                  <span className="text-3xl font-bold text-red-600">{plan.price}</span>
                  {plan.period && <span className="text-gray-500">{plan.period}</span>}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <ul className="mb-8 space-y-3 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={18} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 rounded-md font-medium transition-all ${
                  plan.isPopular 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}>
                  {plan.ctaText}
                </button>
              </div>
            ))}
          </div>
          
          {/* Enterprise Custom */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 md:p-12 mt-12 max-w-6xl mx-auto animate-on-scroll">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-white mb-6 md:mb-0">
                <h3 className="text-2xl font-bold mb-2">Besoin d'une solution sur mesure?</h3>
                <p className="text-gray-300 max-w-xl">
                  Contactez-nous pour discuter de vos besoins spécifiques et découvrir comment nous pouvons vous aider à atteindre vos objectifs.
                </p>
              </div>
              <button className="bg-white text-gray-900 px-6 py-3 rounded-md hover:bg-gray-100 transition-all">
                Contactez notre équipe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
  <div className="container mx-auto px-4">
    {/* Section Header */}
    <div className="text-center mb-16 animate-on-scroll">
      <div className="inline-flex px-4 py-2 bg-red-100 rounded-full mb-4">
        <span className="text-red-600 text-sm font-semibold uppercase tracking-wider">
          FAQ
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Questions fréquentes
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto text-lg">
        Tout ce que vous devez savoir sur notre service
      </p>
    </div>

    {/* FAQ Items */}
    <div className="max-w-3xl mx-auto space-y-4 animate-on-scroll">
      {faqItems.map((item, index) => (
        <div
          key={index}
          className="bg-gray-50 rounded-xl p-5 transition-all duration-300 hover:shadow-md"
        >
          <button
            className="flex justify-between items-center w-full text-left"
            onClick={() => {
              const newTab = activeTab === index ? null : index;
              setActiveTab(newTab);
            }}
          >
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 pr-4">
              {item.question}
            </h3>
            <span
              className={`flex-shrink-0 ml-4 transition-transform duration-300 ${
                activeTab === index ? "transform rotate-180" : ""
              }`}
            >
              <ChevronRight
                className="text-red-600 transform rotate-90"
                size={24}
                strokeWidth={1.5}
              />
            </span>
          </button>
          {activeTab === index && (
            <div className="mt-4 text-gray-600 leading-relaxed">
              <p>{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>

    {/* CTA Section */}
    <div className="text-center mt-16 animate-on-scroll">
      <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-8 md:p-12 inline-block">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
          Vous avez d'autres questions?
        </h3>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Notre équipe est là pour vous aider. Contactez-nous pour des réponses
          personnalisées.
        </p>
        <button
          className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold
            hover:bg-red-700 transition-all duration-300 transform hover:scale-105
            focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
        >
          Contactez-nous
        </button>
      </div>
    </div>
  </div>
</section>


{/* Features Section */}
<section id="features" className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
  <div className="container mx-auto px-4 sm:px-6">
    {/* Section Header */}
    <div className="text-center mb-12 md:mb-16">
      <div className="inline-flex px-4 py-2 bg-red-100 rounded-full mb-4">
        <span className="text-red-600 text-sm font-semibold uppercase tracking-wider">
          Key Features
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Packed with Powerful Features
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Discover tools designed to transform your team collaboration
      </p>
    </div>

    {/* Feature Card */}
    <div className="max-w-5xl mx-auto bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
      {/* Tabs Navigation */}
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto px-4 styled-scrollbar no-scrollbar">
          {featureTabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeFeatureTab === tab.id}
              onClick={() => setActiveFeatureTab(tab.id)}
              className="min-w-[160px] flex flex-col items-center py-5 px-4 transition-all duration-300 relative text-gray-600 hover:text-red-500 hover:bg-red-50/50"
            >
              <div className="w-6 h-6 mb-2 flex items-center justify-center">
                {tab.icon}
              </div>
              <span className="text-sm font-medium whitespace-nowrap">
                {tab.label}
              </span>
              {activeFeatureTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Feature Content */}
      <div className="grid md:grid-cols-2 min-h-[500px]">
        {/* Image Container */}
        <div className="relative md:border-r border-gray-200 bg-gradient-to-br from-red-50/20 to-white">
          {featureTabs.map((tab) => (
            <div
              key={tab.id}
              className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
                tab.id === activeFeatureTab ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={tab.content.image}
                alt={tab.content.title}
                width={600}
                height={500}
                className="object-cover w-full h-full rounded-br-2xl"
              />
            </div>
          ))}
        </div>

        {/* Content Container */}
        <div className="relative p-8 md:p-12 bg-white/80 backdrop-blur-sm">
          {featureTabs.map((tab) => (
            <div
              key={tab.id}
              className={`absolute inset-0 p-8 md:p-12 transition-opacity duration-300 ease-in-out ${
                tab.id === activeFeatureTab ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {tab.content.title}
              </h3>
              <p className="text-gray-600 mb-6 md:text-lg">
                {tab.content.description}
              </p>
              <a
                href="#"
                className="inline-flex items-center text-red-600 hover:text-red-700 font-medium transition-colors duration-300 group"
              >
                Learn more
                <svg
                  className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* CTA Section */}
    <div className="max-w-4xl mx-auto mt-12 md:mt-16 bg-red-50 rounded-xl p-6 sm:p-8 border border-red-100 shadow-sm backdrop-blur-sm">
      <div className="flex flex-col md:flex-row items-center">
        <div className="mb-6 md:mb-0 md:mr-8 flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 shadow-inner">
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold mb-2 text-gray-900">
            Expert Support Available
          </h3>
          <p className="text-gray-600 mb-4">
            Our team of specialists is ready to help you maximize these features
          </p>
          <button className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-all duration-300 w-full md:w-auto shadow-sm hover:shadow-md">
            Start Free Trial
          </button>
        </div>
      </div>
    </div>
  </div>
</section>




<section className="py-10 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Feature Card with improved shadow and border */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
          {/* Card Header with better spacing and responsive typography */}
          <div className="p-5 sm:p-7 border-b border-gray-200">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">Packed with Useful Features</h2>
            <p className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-base max-w-3xl">
              From integrations to security, Pumble has everything a modern team needs to collaborate effectively.
            </p>
          </div>
          
          {/* Card Content with improved layout */}
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Vertical Navigation with better mobile experience */}
            <div className="p-4 sm:p-6 lg:w-1/3 lg:border-r border-gray-200 bg-gray-50">
              <div className="flex overflow-x-auto pb-2 lg:block lg:overflow-y-auto lg:max-h-[600px]">
                <div className="flex lg:flex-col gap-2 w-full">
                  {features.map((feature) => (
                    <button
                      key={feature.id}
                      onClick={() => handleFeatureChange(feature.id)}
                      className={`flex-shrink-0 text-left px-4 py-3 lg:w-full rounded-lg transition-colors duration-300 text-sm sm:text-base font-medium 
                        ${feature.id === activeFeature 
                          ? 'bg-white shadow-sm text-red-600 border-l-4 border-red-500' 
                          : 'hover:bg-white hover:shadow-sm text-gray-700 hover:text-gray-900'}`}
                      aria-pressed={feature.id === activeFeature ? "true" : "false"}
                    >
                      {feature.title}
                      {feature.isNew && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                          New
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Side - Content Area with improved layout and accessibility */}
            <div className="p-5 sm:p-7 lg:w-2/3 relative">
              {/* Content with animation */}
              <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                {/* Image Container with better responsive sizing and aspect ratio */}
                <div className="relative w-full aspect-[16/9] mb-6 sm:mb-8 bg-gray-100 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={`/api/placeholder/600/338?text=${currentFeature.title}`}
                      alt={`${currentFeature.title} Feature Preview`}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  
                  {/* Interactive overlay for image zoom/preview */}
                  <button className="absolute bottom-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h6v6"></path>
                      <path d="M10 14L21 3"></path>
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                    </svg>
                  </button>
                </div>
                
                {/* Content with improved typography and spacing */}
                <div className="space-y-4 sm:space-y-5">
                  <div className="flex items-center">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{currentFeature.title}</h3>
                    {currentFeature.isNew && (
                      <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        New
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {currentFeature.description}
                  </p>
                  
                  {/* Feature benefits with icons */}
                  <ul className="space-y-2 pt-2">
                    {currentFeature.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="ml-2 text-gray-600 text-sm sm:text-base">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-2 flex flex-wrap gap-3 sm:gap-4">
                    <a 
                      href="#" 
                      className="inline-flex items-center justify-center px-4 py-2 border border-red-600 text-red-600 bg-white hover:bg-red-50 rounded-lg font-medium text-sm sm:text-base transition-colors duration-200"
                    >
                      Learn more
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                    
                    <button 
                      className="inline-flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm sm:text-base transition-colors duration-200"
                    >
                      Try it now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="animate-on-scroll">
              <div className="inline-flex px-3 py-2 bg-red-800 bg-opacity-30 rounded-lg mb-4">
                <span className="text-red-300 text-sm font-medium">
                  Contactez-nous
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-6">Prêt à transformer vos conversions?</h2>
              <p className="text-gray-300 mb-8">
                Prenez rendez-vous pour une consultation gratuite et découvrez comment nous pouvons vous aider à atteindre vos objectifs.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="text-red-400 mr-4 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-gray-300">contact@heroshare.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="text-red-400 mr-4 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-medium mb-1">Téléphone</h3>
                    <p className="text-gray-300">+33 1 23 45 67 89</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MessageSquare className="text-red-400 mr-4 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-medium mb-1">Chat</h3>
                    <p className="text-gray-300">Disponible 24/7 sur notre site</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-8 rounded-xl animate-on-scroll">
              <h3 className="text-xl font-bold mb-6">Demandez une consultation gratuite</h3>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block mb-1 text-sm font-medium">Nom</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white"
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-1 text-sm font-medium">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block mb-1 text-sm font-medium">Entreprise</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white"
                      placeholder="Nom de votre entreprise"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block mb-1 text-sm font-medium">Téléphone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white"
                      placeholder="Votre numéro de téléphone"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-1 text-sm font-medium">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      rows="4"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white"
                      placeholder="Comment pouvons-nous vous aider?"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-red-600 text-white font-medium py-3 rounded-md hover:bg-red-700 transition-all"
                  >
                    Réserver ma consultation gratuite
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img src="https://www.cheque-intermittents.com/wp-content/uploads/2024/09/logo-cheque-intermittents-vector.svg" alt="Logo" className="h-10" />
              </div>
              <p className="text-gray-400 mb-4">
                Transformez vos visiteurs en clients fidèles grâce à nos solutions d'optimisation de conversion éprouvées.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Solutions</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Optimisation de landing page</a></li>
                <li><a href="#" className="hover:text-white transition">Tests A/B</a></li>
                <li><a href="#" className="hover:text-white transition">Analyse comportementale</a></li>
                <li><a href="#" className="hover:text-white transition">Copywriting stratégique</a></li>
                <li><a href="#" className="hover:text-white transition">Parcours client</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Ressources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Études de cas</a></li>
                <li><a href="#" className="hover:text-white transition">Guides</a></li>
                <li><a href="#" className="hover:text-white transition">Webinaires</a></li>
                <li><a href="#" className="hover:text-white transition">Ressources gratuites</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Entreprise</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">À propos</a></li>
                <li><a href="#" className="hover:text-white transition">Équipe</a></li>
                <li><a href="#" className="hover:text-white transition">Carrières</a></li>
                <li><a href="#" className="hover:text-white transition">Partenaires</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 mt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2025 HeroShare. Tous droits réservés.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Mentions légales</a>
              <a href="#" className="hover:text-white transition">Politique de confidentialité</a>
              <a href="#" className="hover:text-white transition">CGV</a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium">Découvrez HeroShare en action</h3>
              <button 
                onClick={() => setIsVideoModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="aspect-w-16 aspect-h-9">
                <div className="w-full h-0 pb-[56.25%] relative bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-600">Vidéo de présentation</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-end">
              <button 
                onClick={() => setIsVideoModalOpen(false)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;

