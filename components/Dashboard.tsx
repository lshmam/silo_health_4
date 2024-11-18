"use client";

import React from 'react';
import Image from 'next/image';
import {Roboto, Zen_Dots, Orbitron} from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  weight: '400',
})

const zenDots = Zen_Dots({
  subsets: ['latin'],
  weight: '400',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: '700',
})


import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from '@/components/ui/card';
import { 
  Bell, 
  Settings, 
  Search, 
  Filter,
  PlusSquare,
  Share2,
  Activity,
  FileText,
  Calendar
} from 'lucide-react';

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

interface DashboardProps {
  onRecordSelect: (record: Record) => void;
}

// Header Component
const Header = () => (
  <header className="px-4 py-3 bg-green-100
   border-b">
    <div className="flex items-center justify-between">
    <Image
            src="/images/logo.svg" // or logo.png
            alt="Silo Health Logo"
            width={40}
            height={40}

            className="h-10 w-auto"
          />
      <h1  className={orbitron.className} >
        <span className = "text-3xl text-slate-800">
          Silo Health
        </span>
          </h1>
      <div className="flex items-center space-x-4">
        <button className="p-2">
          <Bell className="w-6 h-6 text-gray-600" />
        </button>
        <button className="p-2">
          <Settings className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </div>
    
    <div className="mt-3 flex items-center space-x-2">
      <div className="flex-1 relative">
        <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search records..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-50"
        />
      </div>
      <button className="p-2 border rounded-lg">
        <Filter className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  </header>
);

// Quick Actions Component
const QuickActions = () => (
  <div className="grid grid-cols-2 gap-4">
    <Card className="bg-blue-50 border-blue-100">
      <CardContent className="p-4 flex items-center space-x-3">
        <PlusSquare className="w-6 h-6 text-blue-600" />
        <div>
          <h3 className="font-medium">Request Records</h3>
          <p className="text-sm font-zen-dots text-gray-600">From your providers</p>
        </div>
      </CardContent>
    </Card>
    <Card className="bg-green-50 border-green-100">
      <CardContent className="p-4 flex items-center space-x-3">
        <Share2 className="w-6 h-6 text-green-600" />
        <div>
          <h3 className="font-medium">Share Records</h3>
          <p className="text-sm text-gray-600">With healthcare team</p>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Recent Records Component
const RecentRecords: React.FC<{ onRecordSelect: (record: Record) => void }> = ({ onRecordSelect }) => {
  const recentRecords: Record[] = [
    {
      id: '1',
      title: 'Blood Test Results',
      type: 'lab',
      provider: 'Central Lab',
      date: 'Today',
      department: 'Laboratory',
      doctor: 'Dr. Smith'
    },
    {
      id: '2',
      title: 'X-Ray Report',
      type: 'image',
      provider: 'City Hospital',
      date: 'Yesterday',
      department: 'Radiology',
      doctor: 'Dr. Johnson'
    },
    {
      id: '3',
      title: 'Consultation Notes',
      type: 'report',
      provider: 'Medical Center',
      date: '2 days ago',
      department: 'Internal Medicine',
      doctor: 'Dr. Brown'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Records</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentRecords.map((record) => (
            <button
              key={record.id}
              onClick={() => onRecordSelect(record)}
              className="w-full flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {record.type === 'image' ? (
                <Activity className="w-5 h-5 text-gray-600 mr-3" />
              ) : (
                <FileText className="w-5 h-5 text-gray-600 mr-3" />
              )}
              <div className="flex-1 text-left">
                <h4 className="font-medium">{record.title}</h4>
                <p className="text-sm text-gray-600">{record.provider}</p>
              </div>
              <span className="text-sm text-gray-500">{record.date}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Navigation Component
const Navigation = () => (
  <nav className="bg-white border-t px-4 py-2">
    <div className="flex justify-around">
      {[
        { icon: FileText, label: 'Records' },
        { icon: Calendar, label: 'Calendar' },
        { icon: Share2, label: 'Share' },
        { icon: Settings, label: 'Settings' }
      ].map((item, index) => (
        <button key={index} className="flex flex-col items-center p-2">
          <item.icon className="w-6 h-6 text-gray-600" />
          <span className="text-xs text-gray-600 mt-1">{item.label}</span>
        </button>
      ))}
    </div>
  </nav>
);

// Main Dashboard Component
const Dashboard: React.FC<DashboardProps> = ({ onRecordSelect }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        <QuickActions />
        <RecentRecords onRecordSelect={onRecordSelect} />
      </main>
      <Navigation />
    </div>
  );
};

export default Dashboard;