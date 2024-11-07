// components/WelcomePopup.tsx
import React from 'react';

interface WelcomePopupProps {
  isDarkMode: boolean;
  onClose: () => void;
}

const WelcomePopup = ({ isDarkMode, onClose }: WelcomePopupProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} max-w-md`}>
        <h3 className="text-xl font-bold mb-4">Welcome to CorMentis!</h3>
        <p className="mb-4">We're excited to have you join our community. Ready to start your journey?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Later
          </button>
          <button
            onClick={() => {
              window.open('https://forms.google.com/your-form-url', '_blank');
              onClose();
            }}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Submit Application Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;