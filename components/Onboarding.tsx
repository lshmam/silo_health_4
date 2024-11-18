"use client";

import React, { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from '@/components/ui/card';
import { 
  Check,
  Shield,
  User,
  Mail,
  Phone,
  Calendar,
  Camera,
  AlertCircle
} from 'lucide-react';

// Types
interface OnboardingStep {
  id: string;
  title: string;
  subtitle: string;
}

interface OnboardingProps {
  onComplete: () => void;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ElementType;
  error?: string;
  helperText?: string;
}

// Input Component
const Input: React.FC<InputProps> = ({ label, icon: Icon, error, helperText, ...props }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="w-5 h-5 text-gray-400" />
      </div>
      <input
        className={`w-full border rounded-lg py-2 pl-10 pr-3 
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
          ${error ? 'border-red-500' : 'border-gray-300'}`}
        {...props}
      />
    </div>
    {error && <p className="text-sm text-red-500">{error}</p>}
    {helperText && <p className="text-sm text-gray-500">{helperText}</p>}
  </div>
);

// Screen Components
const WelcomeScreen: React.FC<{ onNext: () => void }> = ({ onNext }) => (
  <div className="space-y-6">
    <div className="text-center p-6">
      <Shield className="w-16 h-16 mx-auto text-blue-600 mb-4" />
      <h2 className="text-xl font-semibold mb-2">Secure Health Records</h2>
      <p className="text-gray-500">
        Take control of your medical data with Silo's secure platform
      </p>
    </div>
    <button
      onClick={onNext}
      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Get Started
    </button>
  </div>
);

const PersonalInfoScreen: React.FC<{ onNext: () => void }> = ({ onNext }) => (
  <div className="space-y-4">
    <div className="space-y-4">
      <Input label="Full Legal Name" placeholder="Enter your full name" icon={User} />
      <Input label="Email" type="email" placeholder="your@email.com" icon={Mail} />
      <Input label="Phone Number" type="tel" placeholder="(555) 555-5555" icon={Phone} />
      <Input label="Date of Birth" type="date" icon={Calendar} />
    </div>
    <button
      onClick={onNext}
      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors mt-6"
    >
      Continue
    </button>
  </div>
);

const VerificationScreen: React.FC<{ onNext: () => void }> = ({ onNext }) => (
  <div className="space-y-6">
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
      <Camera className="w-12 h-12 mx-auto text-gray-400 mb-4" />
      <p className="text-gray-500 mb-4">Upload a photo of your health card</p>
      <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
        Upload Photo
      </button>
    </div>
    <div className="space-y-2">
      <div className="flex items-start space-x-2">
        <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5" />
        <p className="text-sm text-gray-500">
          Make sure all text is clearly visible and the image isn't blurry
        </p>
      </div>
    </div>
    <button
      onClick={onNext}
      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Verify Identity
    </button>
  </div>
);

const SecurityScreen: React.FC<{ onNext: () => void }> = ({ onNext }) => (
  <div className="space-y-6">
    <div className="space-y-4">
      <Input
        label="Phone Number"
        type="tel"
        placeholder="(555) 555-5555"
        icon={Phone}
        helperText="We'll send you a verification code"
      />
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            className="w-12 h-12 text-center border rounded-lg text-xl"
          />
        ))}
      </div>
    </div>
    <button
      onClick={onNext}
      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Verify & Continue
    </button>
  </div>
);

const CompleteScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => (
  <div className="text-center space-y-6">
    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
      <Check className="w-8 h-8 text-green-600" />
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-2">Verification Complete!</h3>
      <p className="text-gray-500">
        Your account is ready. You can now start managing your health records.
      </p>
    </div>
    <button 
      onClick={onComplete}
      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Go to Dashboard
    </button>
  </div>
);

// Main Onboarding Component
const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to Silo',
      subtitle: 'Your secure health data platform'
    },
    {
      id: 'personal',
      title: 'Personal Information',
      subtitle: 'Help us verify your identity'
    },
    {
      id: 'verification',
      title: 'Identity Verification',
      subtitle: 'Upload your health card'
    },
    {
      id: 'security',
      title: '2-Factor Authentication',
      subtitle: 'Secure your account'
    },
    {
      id: 'complete',
      title: 'All Set!',
      subtitle: 'Your account is ready'
    }
  ];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <WelcomeScreen onNext={nextStep} />;
      case 1:
        return <PersonalInfoScreen onNext={nextStep} />;
      case 2:
        return <VerificationScreen onNext={nextStep} />;
      case 3:
        return <SecurityScreen onNext={nextStep} />;
      case 4:
        return <CompleteScreen onComplete={onComplete} />;
      default:
        return <WelcomeScreen onNext={nextStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          {steps.map((s, i) => (
            <div
              key={s.id}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                i <= step ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              {i < step ? (
                <Check className="w-5 h-5" />
              ) : (
                <span>{i + 1}</span>
              )}
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>{steps[step].title}</CardTitle>
          <p className="text-gray-500">{steps[step].subtitle}</p>
        </CardHeader>
        <CardContent>
          {renderStep()}
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;