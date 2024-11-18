// app/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Onboarding from '@/components/Onboarding';
import Dashboard from '@/components/Dashboard';
import RecordViewer from '@/components/RecordViewer';

// Types
interface Record {
  id: string;
  title: string;
  type: 'pdf' | 'image' | 'report' | 'lab';
  date: string;
  provider: string;
  department: string;
  doctor: string;
}

export default function Home() {
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);

  useEffect(() => {
    try {
      const onboardingStatus = localStorage.getItem('isOnboarded');
      if (onboardingStatus === 'true') {
        setIsOnboarded(true);
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleOnboardingComplete = () => {
    try {
      localStorage.setItem('isOnboarded', 'true');
      setIsOnboarded(true);
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const handleRecordSelect = (record: Record) => {
    setSelectedRecord(record);
  };

  const handleRecordViewerClose = () => {
    setSelectedRecord(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {!isOnboarded ? (
        <Onboarding onComplete={handleOnboardingComplete} />
      ) : (
        <>
          <Dashboard onRecordSelect={handleRecordSelect} />
          {selectedRecord && (
            <RecordViewer 
              record={selectedRecord} 
              onClose={handleRecordViewerClose} 
            />
          )}
        </>
      )}
    </main>
  );
}