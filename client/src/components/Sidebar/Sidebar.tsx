import React from 'react';
import { ChatSession } from '../../types/chat.types';

interface SidebarProps {
  onNewChat: () => void;
  chatHistory: ChatSession[];
  currentSessionId?: string;
  onLoadChat: (sessionId: string) => void;
  onDeleteChat: (sessionId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  onNewChat, 
  chatHistory, 
  currentSessionId, 
  onLoadChat,
  onDeleteChat 
}) => {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Bugün';
    if (diffDays === 2) return 'Dün';
    if (diffDays <= 7) return `${diffDays} gün önce`;
    return date.toLocaleDateString('tr-TR');
  };

  const handleDeleteClick = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation(); // Chat'i yüklemesini engelle
    if (window.confirm('Bu sohbeti silmek istediğinizden emin misiniz?')) {
      onDeleteChat(sessionId);
    }
  };

  return (
    <div className="h-full bg-gradient-to-b from-green-900 to-green-800 p-4 w-full flex flex-col shadow-2xl border-r border-green-700">
      {/* Header - Sığır teması */}
      <div className="mb-6 mt-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {/* Sığır logosu */}
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 via-orange-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-xl border-2 border-amber-300/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                {/* Sığır başı ikonu */}
                <path d="M12 2C8 2 5 5 5 9c0 1 0 2 0 3-2 0-3 1-3 3v2c0 1 1 2 2 2h1c0 2 2 4 4 4s4-2 4-4h2c0 2 2 4 4 4s4-2 4-4h1c1 0 2-1 2-2v-2c0-2-1-3-3-3 0-1 0-2 0-3 0-4-3-7-7-7z"/>
                <circle cx="9" cy="8" r="1"/>
                <circle cx="15" cy="8" r="1"/>
                <path d="M10 11h4v1h-4z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-white font-bold text-xl tracking-tight">Tarım Asistanı</h1>
              <p className="text-green-200 text-sm font-medium">🌾 Akıllı Çiftçilik Danışmanı</p>
            </div>
          </div>
        </div>
        
        {/* Yeni Chat Butonu - İyileştirilmiş */}
        <button 
          onClick={onNewChat}
          className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-2xl p-4 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3 group border border-emerald-400/20"
        >
          <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="font-semibold text-lg">Yeni Sohbet</span>
        </button>
      </div>
      
      {/* Chat Geçmişi */}
      <div className="flex-1 overflow-y-auto">
        {chatHistory.length > 0 ? (
          <div>
            <div className="text-green-200 text-sm font-semibold px-2 mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Geçmiş Sohbetler
            </div>
            
            <div className="space-y-3">
              {chatHistory.map((session) => (
                <div
                  key={session.id}
                  className={`relative group rounded-xl transition-all duration-200 shadow-lg ${
                    currentSessionId === session.id
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-xl border border-green-500/50'
                      : 'bg-green-800/60 text-green-100 hover:bg-green-700/70 hover:text-white backdrop-blur-sm border border-green-700/50'
                  }`}
                >
                  <button
                    onClick={() => onLoadChat(session.id)}
                    className="w-full text-left p-4 hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                        currentSessionId === session.id 
                          ? 'bg-green-500/40 text-green-100' 
                          : 'bg-green-700/60 group-hover:bg-green-600/60 text-green-200'
                      }`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate mb-1">
                          {session.title}
                        </p>
                        <p className="text-xs opacity-80">
                          {formatDate(session.updatedAt)}
                        </p>
                      </div>
                    </div>
                  </button>
                  
                  {/* Silme butonu */}
                  <button
                    onClick={(e) => handleDeleteClick(e, session.id)}
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg transition-all duration-200 hover:scale-110"
                    title="Sohbeti sil"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-green-200 py-8">
            <div className="w-16 h-16 bg-green-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-sm font-medium opacity-90">Henüz sohbet geçmişi yok</p>
            <p className="text-xs opacity-70 mt-1">Yeni bir sohbet başlatarak başlayın</p>
          </div>
        )}
      </div>

      {/* Footer - Tarım teması */}
      <div className="pt-4 border-t border-green-700/60">
        <div className="flex items-center justify-center space-x-4 text-green-200 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-amber-500/20 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <span className="font-medium">Akıllı Tarım AI</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 