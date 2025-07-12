import React from 'react';

export const LoadingIndicator = () => {
  return (
    <div className="flex justify-start mb-6">
      <div className="max-w-[75%]">
        {/* Bot avatar ve bilgi */}
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-white" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.68 0 1.35-.08 2-.23C11.3 21.18 9.68 19.38 9 17c-1.85-1.46-3-3.71-3-6.2 0-1.68.52-3.24 1.4-4.52C8.21 4.84 9.97 4 12 4c3.87 0 7 3.13 7 7 0 1.68-.59 3.21-1.58 4.42C16.74 16.34 16 17.6 16 19c0 .34.04.67.1 1 1.74-1.28 2.9-3.31 2.9-5.6C19 8.48 15.87 5 12 2z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <div>
            <span className="text-sm font-semibold text-green-800 flex items-center">
              <span className="mr-2">🌾</span>
              Tarım Asistanı
            </span>
            <p className="text-xs text-green-600">Düşünüyor...</p>
          </div>
        </div>

        {/* Loading bubble */}
        <div className="bg-white text-gray-800 rounded-2xl rounded-bl-md border border-green-100 shadow-md px-5 py-4">
          <div className="flex items-center space-x-2">
            {/* Animasyonlu nokta göstergeleri */}
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            
            {/* Loading mesajı */}
            <span className="text-sm text-gray-600 ml-3">
              Yanıtınız hazırlanıyor...
            </span>
          </div>
          
          {/* Alt bilgi */}
          <div className="mt-3">
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Büyükbaş hayvancılık veritabanından bilgi alınıyor</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
