import { MessageInput } from './MessageInput';
import { MessageBubble } from '../MessageBubble';
import { LoadingIndicator } from '../LoadingIndicator';
import { Sidebar } from '../Sidebar/Sidebar';
import { MobileSidebar } from '../Sidebar/MobileSidebar';
import { useChat } from '../../hooks/useChat';

export const ChatContainer = () => {
  const { 
    messages, 
    currentSession,
    chatHistory,
    isLoading, 
    error, 
    isSidebarOpen,
    toggleSidebar,
    sendMessage, 
    startNewChat,
    loadChatSession,
    deleteChatSession,
    clearMessages 
  } = useChat();
  
  const handleSendMessage = async (text: string) => {
    await sendMessage(text);
  };

  const handleNewChat = () => {
    startNewChat();
  };

  const handleLoadChat = (sessionId: string) => {
    loadChatSession(sessionId);
  };

  const handleDeleteChat = (sessionId: string) => {
    deleteChatSession(sessionId);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Mobil sidebar */}
      <MobileSidebar 
        onNewChat={handleNewChat} 
        chatHistory={chatHistory}
        currentSessionId={currentSession?.id}
        onLoadChat={handleLoadChat}
        onDeleteChat={handleDeleteChat}
      />
      
      {/* Masaüstü sidebar */}
      <div className={`bg-gradient-to-b from-green-900 to-green-800 hidden md:block transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-96' : 'w-0'
      } overflow-hidden`}>
        {isSidebarOpen && (
          <Sidebar 
            onNewChat={handleNewChat}
            chatHistory={chatHistory}
            currentSessionId={currentSession?.id}
            onLoadChat={handleLoadChat}
            onDeleteChat={handleDeleteChat}
          />
        )}
      </div>
      
      {/* Ana içerik */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-green-50 to-emerald-100 relative">
        {/* Sidebar Toggle Butonu - İyileştirilmiş */}
        <button
          onClick={toggleSidebar}
          className="hidden md:block absolute top-4 left-4 z-10 bg-white hover:bg-green-50 text-green-800 p-3 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl border border-green-200 hover:border-green-300 group backdrop-blur-sm hover:scale-105"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : ''} group-hover:scale-110`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="flex-1 overflow-y-auto px-4 py-4 max-w-4xl mx-auto w-full pt-16 md:pt-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              {/* Tarım temalı karşılama - İyileştirilmiş */}
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 flex items-center justify-center mb-8 shadow-2xl border-4 border-white/20 backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.68 0 1.35-.08 2-.23C11.3 21.18 9.68 19.38 9 17c-1.85-1.46-3-3.71-3-6.2 0-1.68.52-3.24 1.4-4.52C8.21 4.84 9.97 4 12 4c3.87 0 7 3.13 7 7 0 1.68-.59 3.21-1.58 4.42C16.74 16.34 16 17.6 16 19c0 .34.04.67.1 1 1.74-1.28 2.9-3.31 2.9-5.6C19 8.48 15.87 5 12 2z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                Hoş geldiniz! 🌾
              </h2>
              <p className="text-gray-600 mb-10 max-w-lg text-lg leading-relaxed">
                Tarım Asistanınız büyükbaş hayvancılık konusunda size nasıl yardımcı olabilir?
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl w-full">
                <button 
                  onClick={() => handleSendMessage("Sığır bakımı hakkında bilgi verir misin?")}
                  className="bg-white hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 text-gray-800 p-6 rounded-2xl text-left shadow-xl border border-green-100 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-green-200 group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center group-hover:from-green-200 group-hover:to-green-300 transition-all duration-300 shadow-lg">
                      <span className="text-2xl">🐄</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-green-800 text-lg mb-1">Sığır Bakımı</h3>
                      <p className="text-sm text-gray-600">Günlük bakım rutinleri ve öneriler</p>
                    </div>
                  </div>
                </button>
                
                <button 
                  onClick={() => handleSendMessage("Süt ineklerinin beslenmesi nasıl olmalı?")}
                  className="bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-sky-50 text-gray-800 p-6 rounded-2xl text-left shadow-xl border border-blue-100 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-blue-200 group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300 shadow-lg">
                      <span className="text-2xl">🥛</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-blue-800 text-lg mb-1">Süt İnekleri</h3>
                      <p className="text-sm text-gray-600">Beslenme rehberi ve ipuçları</p>
                    </div>
                  </div>
                </button>
                
                <button 
                  onClick={() => handleSendMessage("Buzağı bakımında nelere dikkat etmeliyim?")}
                  className="bg-white hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 text-gray-800 p-6 rounded-2xl text-left shadow-xl border border-orange-100 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-orange-200 group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center group-hover:from-orange-200 group-hover:to-orange-300 transition-all duration-300 shadow-lg">
                      <span className="text-2xl">🐮</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-orange-800 text-lg mb-1">Buzağı Bakımı</h3>
                      <p className="text-sm text-gray-600">Yavru hayvan sağlığı rehberi</p>
                    </div>
                  </div>
                </button>
                
                <button 
                  onClick={() => handleSendMessage("Hayvanlarda hastalık belirtileri nelerdir?")}
                  className="bg-white hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 text-gray-800 p-6 rounded-2xl text-left shadow-xl border border-red-100 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-red-200 group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center group-hover:from-red-200 group-hover:to-red-300 transition-all duration-300 shadow-lg">
                      <span className="text-2xl">🏥</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-red-800 text-lg mb-1">Sağlık Kontrolü</h3>
                      <p className="text-sm text-gray-600">Hastalık belirtileri ve önlemler</p>
                    </div>
                  </div>
                </button>
              </div>

              {/* Alt bilgi */}
              <div className="mt-12 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-green-100 shadow-lg">
                <div className="flex items-center justify-center space-x-3 text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm font-medium">
                    Yukarıdaki konulardan birini seçin veya kendi sorunuzu yazın
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {isLoading && <LoadingIndicator />}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl shadow-lg">
                  <div className="flex items-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <div>
                      <strong className="font-semibold">Hata:</strong>
                      <p className="mt-1">{error}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Input alanı */}
        <div className="p-6 max-w-4xl mx-auto w-full">
          <MessageInput onSendMessage={handleSendMessage} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
};
