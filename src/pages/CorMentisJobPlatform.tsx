import React, { useState } from 'react';
import {
  ChevronDown,
  Moon,
  Sun,
  Layout,
  Book,
  Users,
  FilePlus,
  Plus,
  LogOut,
  Bell,
  CreditCard,
  User,
  ChevronRight,
  Menu,
  Clock,
  DollarSign,
  MapPin
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

interface Job {
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  detailsUrl: string;
  applyUrl: string;
}

const CorMentisJobPlatform = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTeam, setActiveTeam] = useState('Acme Inc');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isTeamMenuOpen, setIsTeamMenuOpen] = useState(false);


  // URLs
  const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSexdKkm2HVH-2-2627_s0vQ-gtcTlFYTEfR7CkeuUv-evSh6A/viewform";
  const JOBSEEKER_FIRST_URL = "http://cormentisprototype.tilda.ws ";
  const JOBSEEKER_SECOND_URL = "";
  const JOBSEEKER_THIRD_URL = "";

  // Helper function to calculate dropdown position
  const getDropdownPosition = () => {
    return isSidebarOpen ? 'left-64' : 'left-16';
  };
  
  const jobListings: Job[] = [
    {
      title: "Senior Frontend Developer",
      company: "Bobble Inc",
      location: "San Francisco, CA",
      salary: "$120k - $150k",
      type: "Full-time",
      posted: "2h ago",
      detailsUrl: "https://example.com/job/frontend-dev",
      applyUrl: "https://docs.google.com/forms/d/e/1FAIpQLSexdKkm2HVH-2-2627_s0vQ-gtcTlFYTEfR7CkeuUv-evSh6A/viewform"
    },
    {
      title: "Product Designer",
      company: "Integrated Corp.",
      location: "Remote",
      salary: "$90k - $120k",
      type: "Contract",
      posted: "5h ago",
      detailsUrl: "https://example.com/job/frontend-dev",
      applyUrl: "https://docs.google.com/forms/d/e/1FAIpQLSexdKkm2HVH-2-2627_s0vQ-gtcTlFYTEfR7CkeuUv-evSh6A/viewform"
    },
    {
      title: "DevOps Engineer",
      company: "Pear Corp.",
      location: "New York, NY",
      salary: "$130k - $160k",
      type: "Full-time",
      posted: "1d ago",
      detailsUrl: "https://example.com/job/frontend-dev",
      applyUrl: "https://docs.google.com/forms/d/e/1FAIpQLSexdKkm2HVH-2-2627_s0vQ-gtcTlFYTEfR7CkeuUv-evSh6A/viewform"
    }
  ];

  const JobCard: React.FC<{ job: Job }> = ({ job }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div 
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Base Card */}
        <div className={`
          relative 
          bg-customGray 
          border 
          border-gray-700 
          rounded-lg 
          overflow-hidden 
          transition-all 
          duration-300 
          ${isHovered ? 'opacity-30 blur-sm' : ''}
        `}>
          <div className="p-4">
            <h3 className="text-lg text-white font-semibold">{job.title}</h3>
            <p className="text-sm text-gray-300">{job.company}</p>
            <div className="space-y-2 mt-3">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <DollarSign className="h-4 w-4" />
                <span>{job.salary}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="h-4 w-4" />
                <span>{job.posted}</span>
              </div>
              <div className="mt-4">
                <span className="px-2 py-1 text-xs rounded-full bg-customPurple/20 text-purple-400">
                  {job.type}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="flex gap-4">
              <a 
                href={job.detailsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="
                  bg-white 
                  text-black 
                  px-6 
                  py-3 
                  rounded-lg 
                  hover:bg-gray-200 
                  transition-colors 
                  shadow-lg
                  transform 
                  hover:scale-105
                "
              >
                Details
              </a>
              <a 
                href={job.applyUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="
                  bg-customPurple 
                  text-white 
                  px-6 
                  py-3 
                  rounded-lg 
                  hover:bg-purple-700 
                  transition-colors 
                  shadow-lg
                  transform 
                  hover:scale-105
                "
              >
                Apply Now
              </a>
            </div>
          </div>
        )}
      </div>
    );
  };


  return (
    <div className="flex h-screen bg-customLightGray text-gray-100">
      {/* Main Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} flex flex-col bg-customLightGray border-r border-gray-800 transition-all duration-300 z-10`}>        {/* Organization Header */}
        <div className="p-4 flex items-center gap-3">
          <div className="bg-customPurple p-2 rounded-lg">
            <Layout className="h-5 w-5" />
          </div>
          {isSidebarOpen && (
            <div className="flex-1">
              <h2 className="font-semibold">CorMentis</h2>
              <p className="text-sm text-gray-400">Beyond Labels</p>
            </div>
          )}
          {isSidebarOpen && (
            <button onClick={() => setIsTeamMenuOpen(!isTeamMenuOpen)} className="hover:bg-gray-800 p-1 rounded">
              <ChevronDown className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Platform Section */}
        <div className="px-4 py-2">
          {isSidebarOpen && <p className="text-xs font-semibold text-gray-400 mb-2">JOB SEEKERS</p>}
          <nav className="space-y-1">
            <a 
                href={JOBSEEKER_FIRST_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-customGray"
            >
              <Layout className="h-5 w-5" />
              {isSidebarOpen && <span>Find A Job</span>}
            </a>
            <a 
              href={JOBSEEKER_FIRST_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-customGray"
            >
              <Book className="h-5 w-5" />
              {isSidebarOpen && <span>Interview Coaching</span>}
            </a>
            <a 
              href={JOBSEEKER_FIRST_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-customGray"
            >
              <Users className="h-5 w-5" />
              {isSidebarOpen && <span>Testimonials</span>}
            </a>
          </nav>
        </div>

        {/* Projects Section */}
        {isSidebarOpen && (
          <div className="px-4 py-2">
            <p className="text-xs font-semibold text-gray-400 mb-2">FOR EMPLOYERS</p>
            <nav className="space-y-1">
              <a 
                href={JOBSEEKER_FIRST_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-customGray"
              >
                <Layout className="h-5 w-5" />
                <span>Post A Job</span>
              </a>
              <a 
                href={JOBSEEKER_FIRST_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-customGray"
              >
                <Users className="h-5 w-5" />
                <span>Staff Training</span>
              </a>
              <a 
                href={JOBSEEKER_FIRST_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-customGray"
              >
                <Book className="h-5 w-5" />
                <span>Accomodation Planning</span>
              </a>
            </nav>
          </div>
        )}

        {/* User Section */}
        <div className="mt-auto p-4 relative">
          <button 
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-purple-200/20"
          >
            <img
              src="/api/placeholder/32/32"
              alt="A"
              className="w-8 h-8 rounded-full"
            />
            {isSidebarOpen && (
              <div className="flex-1 text-left">
                <p className="font-medium">Account Name</p>
                <p className="text-sm text-gray-400">user@example.com</p>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navigation */}
        <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-customGray"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">FOR JOB SEEKERS</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <span>Find A Job</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-customGray">
              <Bell className="h-5 w-5" />
            </button>
            <button 
              className="p-2 rounded-lg hover:bg-customGray"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobListings.map((job, index) => (
              <div 
                key={index} 
                className="relative group"
                onMouseEnter={() => {/* You might want to add some state for hover */}}
                onMouseLeave={() => {/* Reset hover state */}}
              >
                <Card key={index} className="bg-customGray border-gray-700 transition-all duration-300 overflow-hidden group-hover:opacity-30 group-hover:blur-sm group-hover:border-customPurple border  ">
                  <CardHeader>
                    <CardTitle className="text-lg text-white font-semibold">{job.title}</CardTitle>
                    <p className="text-sm text-gray-300">{job.company}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <DollarSign className="h-4 w-4" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock className="h-4 w-4" />
                        <span>{job.posted}</span>
                      </div>
                      <div className="mt-4">
                        <span className="px-2 py-1 text-xs rounded-full bg-customPurple/20 text-purple-400">
                          {job.type}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-4">
                    <a 
                      href={job.detailsUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="
                        bg-white 
                        text-black 
                        px-6 
                        py-3 
                        rounded-lg 
                        hover:bg-gray-200 
                        transition-colors 
                        shadow-lg
                        transform 
                        hover:scale-105
                      "
                    >
                      Details
                    </a>
                    <a 
                      href={job.applyUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="
                        bg-customPurple 
                        text-white 
                        px-6 
                        py-3 
                        rounded-lg 
                        hover:bg-customPurple/80 
                        transition-colors 
                        shadow-lg
                        transform 
                        hover:scale-105
                      "
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Team Selection Menu */}
      {isTeamMenuOpen && (
        <div className={`fixed top-0 ${getDropdownPosition()} w-56 bg-gray-800 rounded-lg shadow-lg border border-gray-700 mt-4 z-50`}>
          <div className="p-2">
            <div className="text-sm text-gray-400 px-3 py-2">More information</div>
            {['About Us', 'Our Vision', 'Contact Us'].map((team) => (
              <a
                key={team}
                href={JOBSEEKER_FIRST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-700"
              >
                <Layout className="h-4 w-4" />
                <span>{team}</span>
              </a>
            ))}
            <div className="border-t border-gray-700 mt-2 pt-2">
              <a 
                href={JOBSEEKER_FIRST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-700"
              >
                <Plus className="h-4 w-4" />
                <span>New appointment</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* User Menu */}
      {isUserMenuOpen && (
        <div className={`fixed bottom-0 ${getDropdownPosition()} w-56 bg-gray-800 rounded-lg shadow-lg border border-gray-700 mb-4 z-50`}>
          <div className="p-2">
            <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-700">
              <Layout className="h-4 w-4" />
              <span>Upgrade to Pro</span>
            </button>
            <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-700">
              <User className="h-4 w-4" />
              <span>Account</span>
            </button>
            <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-700">
              <CreditCard className="h-4 w-4" />
              <span>Billing</span>
            </button>
            <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-700">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </button>
            <div className="border-t border-gray-700 mt-2 pt-2">
              <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-700">
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CorMentisJobPlatform;