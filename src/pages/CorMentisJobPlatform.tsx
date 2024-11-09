import React, { useState } from 'react';
import { 
  Moon, Sun, MapPin, Briefcase, BarChart2, Calendar, 
  Filter, ChevronDown, Flag, X, Plus,
  Search, GraduationCap, Clock, Globe, Building, 
  Users, BookOpen, Monitor, Heart, Star, ArrowLeft
} from 'lucide-react';
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Separator } from "../components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { cn } from "../lib/utils";

// Type definitions
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  description: string;
  applyUrl: string;
}

interface SideNavProps {
  className?: string;
}

interface JobCardProps {
  job: Job;
  isDarkMode: boolean;
}

interface NavBarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onSignInClick: () => void;
}

const sampleJobs = [
  {
    id: 1,
    title: 'Senior Software Developer',
    company: 'TechCorp Solutions',
    location: 'Remote',
    salary: '$120,000 - $150,000',
    type: 'Full-time',
    posted: '2 days ago',
    description: 'https://example.com/job/1',
    applyUrl: 'https://forms.google.com/tech-corp-application'
  },
  {
    id: 2,
    title: 'UX Designer',
    company: 'Creative Minds Inc',
    location: 'Hybrid',
    salary: '$90,000 - $110,000',
    type: 'Full-time',
    posted: '1 week ago',
    description: 'https://example.com/job/2',
    applyUrl: 'https://forms.google.com/creative-minds-application'
  },
  {
    id: 3,
    title: 'Data Analyst',
    company: 'DataViz Analytics',
    location: 'On-site',
    salary: '$75,000 - $95,000',
    type: 'Contract',
    posted: '3 days ago',
    description: 'https://example.com/job/3',
    applyUrl: 'https://forms.google.com/dataviz-application'
  }
];

const SideNav: React.FC<SideNavProps> = ({ className }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold tracking-tight">
              Filters
            </h2>
            <Button variant="ghost" size="icon" onClick={() => setIsExpanded(!isExpanded)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start">
              <Plus className="mr-2 h-4 w-4" />
              New Filter
            </Button>
          </div>
        </div>
        <Separator />
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Role & Level
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <Briefcase className="mr-2 h-4 w-4" /> Job Role
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" /> Job Level
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Building className="mr-2 h-4 w-4" /> Employment Type
            </Button>
          </div>
        </div>
        <Separator />
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Requirements
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <GraduationCap className="mr-2 h-4 w-4" /> Education
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Clock className="mr-2 h-4 w-4" /> Availability
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Globe className="mr-2 h-4 w-4" /> Location
            </Button>
          </div>
        </div>
        <Separator />
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Environment
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <Monitor className="mr-2 h-4 w-4" /> Working Environment
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Heart className="mr-2 h-4 w-4" /> Support/Accommodation
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Star className="mr-2 h-4 w-4" /> Skill Level
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobCard: React.FC<JobCardProps> = ({ job, isDarkMode }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="relative h-[280px] overflow-hidden transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`p-6 ${isHovered ? 'blur-sm' : ''}`}>
        <h3 className="text-xl font-bold text-purple-600 mb-2">{job.title}</h3>
        <p className="text-lg mb-6">{job.company}</p>
        
        <div className="grid grid-cols-2 gap-y-4 text-sm">
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <BarChart2 size={16} />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase size={16} />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{job.posted}</span>
          </div>
        </div>
      </div>

      {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/20">
          <Button 
            variant="secondary"
            size="lg"
            onClick={() => window.open(job.description, '_blank')}
          >
            View Post
          </Button>
          <Button 
            variant="default"
            size="lg"
            onClick={() => window.open(job.applyUrl, '_blank')}
          >
            Apply
          </Button>
        </div>
      )}
    </Card>
  );
};

const NavBar: React.FC<NavBarProps> = ({ isDarkMode, toggleDarkMode, onSignInClick }) => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-6">
              <Filter className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-2/3 p-0">
            <SideNav />
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span className="text-xl font-semibold">CorMentis</span>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" className="text-base">LEARN</Button>
          <Button variant="ghost" className="text-base">FOR EMPLOYERS</Button>
          <Button 
            variant="ghost" 
            className="text-base"
            onClick={onSignInClick}
          >
            SIGN IN/REGISTER
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Flag className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Español</DropdownMenuItem>
              <DropdownMenuItem>Français</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

const CorMentisJobPlatform = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [showSignIn, setShowSignIn] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`h-full ${
      isDarkMode ? 'dark' : ''
    }`}>
      <div className={`min-h-screen ${
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'
      }`}>
        <NavBar 
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          onSignInClick={() => setShowSignIn(true)}
        />

        <main className="px-8 py-6">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight mb-6">FOR JOB SEEKERS</h2>
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-6">
                {['Relevance', 'Salary', 'Expiry Date', 'Latest'].map((option) => (
                  <Button
                    key={option}
                    variant={sortBy === option.toLowerCase() ? 'default' : 'ghost'}
                    className="text-base"
                    onClick={() => setSortBy(option.toLowerCase())}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleJobs.map((job) => (
                <JobCard 
                  key={job.id} 
                  job={job}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CorMentisJobPlatform;