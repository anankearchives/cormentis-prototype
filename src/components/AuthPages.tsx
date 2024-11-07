import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, Building, Briefcase, ArrowLeft, Check, X } from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader 
} from '../components/ui/alert-dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';

// Type Definitions
interface AuthPagesProps {
  isDarkMode: boolean;
  onClose: () => void;
  onSuccessfulAuth: (data: AuthSuccessData) => void;
}

interface AuthSuccessData {
  isNewUser: boolean;
  userType: UserType;
}

type UserType = 'jobseeker' | 'employer';

interface PasswordValidation {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
}

type SocialPlatform = 'google' | 'facebook' | 'twitter';

interface PasswordRequirement {
  label: string;
  validator: (password: string) => boolean;
}

const AuthPages: React.FC<AuthPagesProps> = ({ isDarkMode, onClose, onSuccessfulAuth }) => {
  // State Management
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [userType, setUserType] = useState<UserType>('jobseeker');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [passwordValidation, setPasswordValidation] = useState<PasswordValidation>({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });

  // Constants
  const PASSWORD_REQUIREMENTS: PasswordRequirement[] = [
    { label: 'At least 8 characters', validator: (pwd) => pwd.length >= 8 },
    { label: 'One uppercase letter', validator: (pwd) => /[A-Z]/.test(pwd) },
    { label: 'One lowercase letter', validator: (pwd) => /[a-z]/.test(pwd) },
    { label: 'One number', validator: (pwd) => /[0-9]/.test(pwd) },
    { label: 'One special character (!@#$%^&*)', validator: (pwd) => /[!@#$%^&*]/.test(pwd) }
  ];

  const SOCIAL_PLATFORMS: SocialPlatform[] = ['google', 'facebook', 'twitter'];

  const USER_TYPES = [
    { type: 'jobseeker' as UserType, icon: Briefcase, label: 'Job Seeker' },
    { type: 'employer' as UserType, icon: Building, label: 'Employer' }
  ];

  // Effects
  useEffect(() => {
    setPasswordValidation({
      length: PASSWORD_REQUIREMENTS[0].validator(password),
      uppercase: PASSWORD_REQUIREMENTS[1].validator(password),
      lowercase: PASSWORD_REQUIREMENTS[2].validator(password),
      number: PASSWORD_REQUIREMENTS[3].validator(password),
      special: PASSWORD_REQUIREMENTS[4].validator(password)
    });
  }, [password]);

  // Computed Properties
  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  // Event Handlers
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, isLogin: boolean): Promise<void> => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) return;
    if (!isLogin && !isPasswordValid) return;

    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      onSuccessfulAuth({
        isNewUser: !isLogin,
        userType: userType
      });
      onClose();
    }, 2000);
  };

  const handleSocialLogin = (platform: SocialPlatform): void => {
    const socialUrls: Record<SocialPlatform, string> = {
      google: 'https://accounts.google.com',
      facebook: 'https://facebook.com/login',
      twitter: 'https://twitter.com/login'
    };
    window.open(socialUrls[platform], '_blank');
  };

  // Utility Functions
  const getInputClassName = (isDarkMode: boolean): string => {
    return `w-full p-2 pl-10 rounded-lg border ${
      isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
    }`;
  };

  const getUserTypeButtonClassName = (isSelected: boolean): string => {
    return `flex-1 p-4 rounded-lg border-2 ${
      isSelected 
        ? 'border-purple-600 bg-purple-50 dark:bg-purple-900' 
        : 'border-gray-200 dark:border-gray-700'
    }`;
  };

  // JSX Components
  const RenderSocialButtons = () => (
    <div className="grid grid-cols-3 gap-4">
      {SOCIAL_PLATFORMS.map((platform) => (
        <button
          key={platform}
          type="button"
          onClick={() => handleSocialLogin(platform)}
          className="p-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {platform === 'twitter' ? 'X' : platform.charAt(0).toUpperCase() + platform.slice(1)}
        </button>
      ))}
    </div>
  );

  const RenderPasswordRequirements = () => (
    <div className="text-sm space-y-2">
      <div className="font-medium">Password Requirements:</div>
      <ul className="space-y-1">
        {PASSWORD_REQUIREMENTS.map((req, index) => {
          const isMet = req.validator(password);
          return (
            <li key={index} className="flex items-center space-x-2">
              {isMet ? (
                <Check size={16} className="text-green-500" />
              ) : (
                <X size={16} className="text-red-500" />
              )}
              <span>{req.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} p-4 flex items-center justify-center`}>
      <div className={`w-full max-w-md rounded-lg ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'} shadow-lg`}>
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute left-4 top-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-center text-2xl font-bold text-purple-600 mb-6">Welcome to CorMentis</h2>

          {showSuccess && (
            <AlertDialog open={showSuccess}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogDescription>
                    {userType === 'jobseeker' ? 'Successfully logged in!' : 'Account created successfully!'}
                  </AlertDialogDescription>
                </AlertDialogHeader>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className={getInputClassName(isDarkMode)}
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className={getInputClassName(isDarkMode)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Sign In
                </button>

                <div className="relative flex items-center gap-4 py-4">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="text-sm text-gray-500">or continue with</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <RenderSocialButtons />
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
                <div className="space-y-4 mb-6">
                  <div className="flex gap-4">
                    {USER_TYPES.map(({ type, icon: Icon, label }) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setUserType(type)}
                        className={getUserTypeButtonClassName(userType === type)}
                      >
                        <Icon className="w-6 h-6 mx-auto mb-2" />
                        <div className="text-center">{label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={userType === 'jobseeker' ? "Full Name" : "Company Name"}
                    className={getInputClassName(isDarkMode)}
                    required
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className={getInputClassName(isDarkMode)}
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className={getInputClassName(isDarkMode)}
                    required
                  />
                </div>

                <RenderPasswordRequirements />

                <button
                  type="submit"
                  disabled={!isPasswordValid}
                  className={`w-full py-2 px-4 bg-purple-600 text-white rounded-lg 
                    ${isPasswordValid ? 'hover:bg-purple-700' : 'opacity-50 cursor-not-allowed'}
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
                >
                  Create Account
                </button>

                <div className="relative flex items-center gap-4 py-4">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="text-sm text-gray-500">or continue with</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <RenderSocialButtons />
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AuthPages;