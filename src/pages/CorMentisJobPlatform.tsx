// src/pages/CorMentisJobPlatform.tsx
import React, { useState } from 'react';
import { Search, Briefcase, Users, BookOpen, Settings, Moon, Sun, Filter, MapPin, Clock } from 'lucide-react';
import AuthPages from '../components/AuthPages';
import WelcomePopup from '../components/WelcomePopup';

// Type definitions
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  accommodations: string[];
  description: string;
}

interface AuthSuccessData {
  isNewUser: boolean;
  userType: 'jobseeker' | 'employer';
}

const CorMentisJobPlatform: React.FC = () => {
  // State management
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [textSize, setTextSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [selectedAccommodations, setSelectedAccommodations] = useState<string[]>([]);
  const [showAccommodationsFilter, setShowAccommodationsFilter] = useState<boolean>(false);
  const [showAuth, setShowAuth] = useState<boolean>(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState<boolean>(false);

  // Event handlers
  const handleToggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const handleAuthSuccess = (data: AuthSuccessData) => {
    if (data.isNewUser && data.userType === 'jobseeker') {
      setShowWelcomePopup(true);
    }
    setShowAuth(false);
  };

  const toggleAccommodation = (accommodation: string): void => {
    setSelectedAccommodations(prev => 
      prev.includes(accommodation)
        ? prev.filter(item => item !== accommodation)
        : [...prev, accommodation]
    );
  };

  // Constants (categories, workTypes, accommodations, sampleJobs remain the same)
  const categories: string[] = [
    'Technology', 'Healthcare', 'Education', 'Creative Arts',
    'Finance', 'Customer Service', 'Data Analysis', 'Marketing'
  ];

  const workTypes: string[] = [
    'Remote', 'Hybrid', 'On-site'
  ];

  const accommodations: string[] = [
    'Flexible Schedule', 'Quiet Workspace', 'Written Instructions',
    'Regular Breaks', 'Sensory Accommodations', 'Communication Aids'
  ];

  const sampleJobs: Job[] = [
    {
      id: 1,
      title: 'Software Developer',
      company: 'TechCo Solutions',
      location: 'Remote',
      type: 'Full-time',
      accommodations: ['Flexible Schedule', 'Written Instructions'],
      description: 'Looking for a detail-oriented developer with strong problem-solving skills...'
    },
    {
      id: 2,
      title: 'Data Analyst',
      company: 'DataViz Corp',
      location: 'Hybrid',
      type: 'Full-time',
      accommodations: ['Quiet Workspace', 'Regular Breaks'],
      description: 'Seeking an analytical mind with attention to patterns...'
    },
    {
      id: 3,
      title: 'Graphic Designer',
      company: 'Creative Hub',
      location: 'Remote',
      type: 'Part-time',
      accommodations: ['Flexible Schedule', 'Sensory Accommodations'],
      description: 'Creative position with flexible working arrangements...'
    }
  ];

  

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      {/* Updated Navigation Bar */}
      <nav className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg fixed w-full top-0 z-50`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Left section: Logo and dark mode toggle */}
            <div className="flex items-center space-x-4">
              <a href="/" className="flex items-center space-x-2">
                <Briefcase className="h-8 w-8 text-purple-600" />
                <span className="text-xl font-bold text-purple-600">CorMentis</span>
              </a>
              <button 
                onClick={handleToggleDarkMode}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-gray-100" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-800" />
                )}
              </button>
            </div>

            {/* Right section: Authentication buttons */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowAuth(true)}
                className={`px-4 py-2 rounded-lg ${
                  isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                Sign In
              </button>
              <button 
                onClick={() => setShowAuth(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>


      {/* Add padding to account for fixed navbar */}
      <div className="pt-16">
        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          {/* Hero Section */}
          <section className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Empowering Neurodiverse Talent</h2>
            <p className="text-xl mb-8">Discover opportunities that celebrate your unique abilities</p>
            
            {/* Search and Filters */}
            <div className={`max-w-4xl mx-auto p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Search className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for jobs..."
                    className={`w-full p-2 rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} focus:outline-none`}
                  />
                  <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    Search
                  </button>
                </div>
                
                {/* Filters */}
                <div className="grid md:grid-cols-3 gap-4">
                  <select className="p-2 rounded-md border">
                    <option value="">Job Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  
                  <select className="p-2 rounded-md border">
                    <option value="">Work Type</option>
                    {workTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  
                  <div className="relative">
                    <button
                      onClick={() => setShowAccommodationsFilter(!showAccommodationsFilter)}
                      className="w-full p-2 rounded-md border text-left flex justify-between items-center"
                    >
                      <span>{selectedAccommodations.length ? `${selectedAccommodations.length} selected` : 'Accommodations'}</span>
                      <Filter size={16} />
                    </button>
                    
                    {showAccommodationsFilter && (
                      <div className={`absolute top-full left-0 w-full mt-2 p-4 rounded-lg shadow-lg z-50 
                        ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <div className="space-y-2">
                          {accommodations.map(accommodation => (
                            <label key={accommodation} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={selectedAccommodations.includes(accommodation)}
                                onChange={() => toggleAccommodation(accommodation)}
                                className="w-4 h-4 text-purple-600"
                              />
                              <span>{accommodation}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="grid md:grid-cols-3 gap-8 mb-12">
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg border-t-4 border-pink-400`}>
              <Briefcase className="w-12 h-12 mb-4 text-pink-400" />
              <h3 className="text-xl font-bold mb-2">Tailored Job Matches</h3>
              <p>Find positions that match your skills, preferences, and accommodation needs</p>
            </div>
            
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg border-t-4 border-purple-400`}>
              <Users className="w-12 h-12 mb-4 text-purple-400" />
              <h3 className="text-xl font-bold mb-2">Inclusive Employers</h3>
              <p>Connect with companies committed to neurodiversity in the workplace</p>
            </div>
            
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg border-t-4 border-pink-400`}>
              <BookOpen className="w-12 h-12 mb-4 text-pink-400" />
              <h3 className="text-xl font-bold mb-2">Resources & Support</h3>
              <p>Access guides, training, and support throughout your job search journey</p>
            </div>
          </section>

          {/* Job Listings */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Job Opportunities</h2>
            <div className="space-y-4">
              {sampleJobs.map(job => (
                <div 
                  key={job.id} 
                  className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-shadow`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-purple-600">{job.title}</h3>
                      <p className="text-lg">{job.company}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <MapPin size={16} />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={16} />
                          {job.type}
                        </span>
                      </div>
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">Accommodations Offered:</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.accommodations.map(accommodation => (
                            <span 
                              key={accommodation}
                              className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                            >
                              {accommodation}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => window.open('https://forms.google.com/your-form-url', '_blank')}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Accessibility Controls */}
          <div className="fixed bottom-4 right-4">
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <Settings className="w-6 h-6 mb-2" />
              <div className="space-y-2">
                <button 
                  onClick={() => setTextSize('small')}
                  className="block w-full px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  A-
                </button>
                <button 
                  onClick={() => setTextSize('medium')}
                  className="block w-full px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  A
                </button>
                <button 
                  onClick={() => setTextSize('large')}
                  className="block w-full px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  A+
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* Modals */}
      {showAuth && (
        <AuthPages 
          isDarkMode={isDarkMode} 
          onClose={() => setShowAuth(false)}
          onSuccessfulAuth={handleAuthSuccess}
        />
      )}

      {showWelcomePopup && (
        <WelcomePopup 
          isDarkMode={isDarkMode}
          onClose={() => setShowWelcomePopup(false)}
        />
      )}
    </div>
  );
};

export default CorMentisJobPlatform;