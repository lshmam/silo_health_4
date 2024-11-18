"use client";

import Image from 'next/image';

import React, { useState } from 'react';

import { 
  FileText, 
  Download, 
  Share2, 
  Printer, 
  ZoomIn, 
  ZoomOut,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Calendar,
  User,
  Clock,
  FileSearch
} from 'lucide-react';

interface Record {
  id: string;
  title: string;
  type: 'pdf' | 'image' | 'report' | 'lab';
  date: string;
  provider: string;
  department: string;
  doctor: string;
  content?: string;
  url?: string;
}

interface RecordViewerProps {
  record: Record;
  onClose: () => void;
}

const RecordContent = ({ record, zoom, rotation }: { 
  record: Record; 
  zoom: number;
  rotation: number;
}) => {
  switch (record.type) {
    case 'image':
      return (
        <div className="flex items-center justify-center h-full">
          <Image 
  src="/api/placeholder/800/600"
  alt={record.title}
  width={800}
  height={600}
  style={{
    transform: `scale(${zoom/100}) rotate(${rotation}deg)`,
    transition: 'transform 0.3s ease'
  }}
  className="max-w-full max-h-full object-contain"
/>
        </div>
      );
    case 'pdf':
      return (
        <div className="flex items-center justify-center h-full bg-gray-50">
          <FileText className="w-16 h-16 text-gray-400" />
          <p className="mt-4">PDF Viewer Not Available</p>
        </div>
      );
    default:
      return (
        <div className="p-6 text-gray-800">
          {record.content || 'No content available'}
        </div>
      );
  }
};

const RecordViewer: React.FC<RecordViewerProps> = ({ record, onClose }) => {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(1);
  const [activeTab, setActiveTab] = useState<'record' | 'info'>('record');

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 25));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  const handleDownload = () => {
    // Implement download logic
    console.log('Downloading:', record.title);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    // Implement share logic
    console.log('Sharing:', record.title);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={onClose}
              className="hover:bg-gray-100 p-2 rounded-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold">{record.title}</h2>
          </div>

          <div className="flex items-center space-x-2">
            <button 
              onClick={handleShare}
              className="hover:bg-gray-100 p-2 rounded-lg"
              title="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button 
              onClick={handleDownload}
              className="hover:bg-gray-100 p-2 rounded-lg"
              title="Download"
            >
              <Download className="w-5 h-5" />
            </button>
            <button 
              onClick={handlePrint}
              className="hover:bg-gray-100 p-2 rounded-lg"
              title="Print"
            >
              <Printer className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex min-h-0">
          {/* Sidebar */}
          <div className="w-80 border-r p-4 overflow-y-auto">
            <div className="space-y-6">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('record')}
                  className={`flex-1 py-2 px-4 rounded-lg ${
                    activeTab === 'record' 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Record
                </button>
                <button
                  onClick={() => setActiveTab('info')}
                  className={`flex-1 py-2 px-4 rounded-lg ${
                    activeTab === 'info' 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Info
                </button>
              </div>

              {activeTab === 'record' ? (
                <>
                  <div>
                    <h3 className="font-medium mb-2">Record Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <FileSearch className="w-4 h-4 mr-2 text-gray-500" />
                        <span>Type: {record.type.toUpperCase()}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                        <span>{record.date}</span>
                      </div>
                      <div className="flex items-center text-sm">
                     
                        <span>{record.provider}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <User className="w-4 h-4 mr-2 text-gray-500" />
                        <span>Dr. {record.doctor}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Related Records</h3>
                    <div className="space-y-2">
                      <button className="w-full text-left p-2 hover:bg-gray-50 rounded-lg text-sm">
                        Previous Visit Notes
                      </button>
                      <button className="w-full text-left p-2 hover:bg-gray-50 rounded-lg text-sm">
                        Lab Results
                      </button>
                      <button className="w-full text-left p-2 hover:bg-gray-50 rounded-lg text-sm">
                        Imaging Reports
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <h3 className="font-medium mb-2">Record History</h3>
                  <div className="space-y-3">
                    {[
                      { action: 'Created', date: '2024-03-15 09:30 AM' },
                      { action: 'Shared with Dr. Smith', date: '2024-03-16 02:15 PM' },
                      { action: 'Viewed by You', date: '2024-03-17 11:45 AM' }
                    ].map((event, index) => (
                      <div key={index} className="flex items-start text-sm">
                        <Clock className="w-4 h-4 mr-2 mt-0.5 text-gray-500" />
                        <div>
                          <p className="font-medium">{event.action}</p>
                          <p className="text-gray-500">{event.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Toolbar */}
            <div className="p-2 border-b flex items-center justify-between bg-gray-50">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleZoomOut}
                  className="hover:bg-gray-200 p-1.5 rounded"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-sm font-medium w-14 text-center">
                  {zoom}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="hover:bg-gray-200 p-1.5 rounded"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-gray-300 mx-2" />
                <button
                  onClick={handleRotate}
                  className="hover:bg-gray-200 p-1.5 rounded"
                  title="Rotate"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>

              {record.type === 'pdf' && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="hover:bg-gray-200 p-1.5 rounded disabled:opacity-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="hover:bg-gray-200 p-1.5 rounded disabled:opacity-50"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Document Viewer */}
            <div className="flex-1 overflow-auto p-4 bg-gray-100">
              <div 
                className="bg-white shadow-lg rounded-lg min-h-full p-8 mx-auto"
                style={{
                  maxWidth: '1000px',
                  transition: 'transform 0.3s ease'
                }}
              >
                <RecordContent 
                  record={record} 
                  zoom={zoom} 
                  rotation={rotation} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordViewer;