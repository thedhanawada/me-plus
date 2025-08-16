import React, { useState } from 'react';
import Work from './pages/Work';
// import Lab from './pages/Lab';
// import Art from './pages/Art';
// import Watchlist from './pages/Watch';

const PageTestApp = () => {
  const [currentPage, setCurrentPage] = useState('none');

  const renderPage = () => {
    switch (currentPage) {
      case 'work':
        return <Work />;
      // case 'lab':
      //   return <Lab />;
      // case 'art':
      //   return <Art />;
      // case 'watch':
      //   return <Watchlist />;
      default:
        return (
          <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Page Component Test</h1>
            <p className="mb-4">Click buttons to test each page component:</p>
            <div className="space-x-4">
              <button 
                onClick={() => setCurrentPage('work')} 
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Test Work Page
              </button>
              {/* <button 
                onClick={() => setCurrentPage('lab')} 
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Test Lab Page
              </button>
              <button 
                onClick={() => setCurrentPage('art')} 
                className="px-4 py-2 bg-purple-500 text-white rounded"
              >
                Test Art Page
              </button>
              <button 
                onClick={() => setCurrentPage('watch')} 
                className="px-4 py-2 bg-orange-500 text-white rounded"
              >
                Test Watch Page
              </button> */}
              <button 
                onClick={() => setCurrentPage('none')} 
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Back to Test Menu
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {renderPage()}
    </div>
  );
};

export default PageTestApp;