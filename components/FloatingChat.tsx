'use client';
import { useState } from 'react';

interface County {
  name: string;
  state: {
    name: string;
    abbreviation: string;
    dui_laws: {
      terminology: string;
    };
  };
}

interface FloatingChatProps {
  vapiPhoneNumber: string;
  county: County;
}

export default function FloatingChat({ vapiPhoneNumber, county }: FloatingChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const startCall = () => {
    // Initialize Vapi call with county context
    window.location.href = `tel:${vapiPhoneNumber}`;
  };
  
  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 transition-colors flex items-center justify-center z-50 hover:scale-105 transform"
        aria-label="Open chat assistant"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
      </button>
      
      {/* Pulse indicator */}
      <div className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-blue-600 animate-ping z-40 opacity-20 pointer-events-none" />
      
      {/* Chat Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel */}
          <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-lg shadow-2xl z-50 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">DUI Guide Assistant</h3>
                <p className="text-sm text-gray-600">Available 24/7</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                aria-label="Close chat"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                </svg>
              </button>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center gap-2 text-sm text-blue-600 mb-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                <span>{county.name}, {county.state.abbreviation}</span>
              </div>
              
              <p className="text-gray-700 mb-4">
                Get instant answers about your {county.state.dui_laws.terminology} case in {county.name}. 
                Our AI assistant knows local laws, deadlines, and procedures.
              </p>
              
              <div className="bg-blue-50 p-3 rounded-lg mb-4">
                <h4 className="font-semibold text-sm mb-2">I can help you with:</h4>
                <ul className="text-xs space-y-1 text-gray-600">
                  <li>• Administrative hearing deadlines</li>
                  <li>• Court locations and contact info</li>
                  <li>• Bail and penalty information</li>
                  <li>• Finding local attorneys</li>
                  <li>• Understanding your rights</li>
                </ul>
              </div>
            </div>
            
            <button
              onClick={startCall}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call Now (Free)
            </button>
            
            <p className="text-xs text-gray-500 mt-2 text-center">
              Powered by AI • Trained on {county.state.name} {county.state.dui_laws.terminology} law
            </p>
          </div>
        </>
      )}
    </>
  );
}