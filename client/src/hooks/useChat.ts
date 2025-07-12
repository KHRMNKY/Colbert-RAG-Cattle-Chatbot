import { useState, useCallback, useEffect } from 'react';
import { Message, ChatSession } from '../types/chat.types';
import { chatService } from '../services/chatService';

// Chat başlığı oluşturma fonksiyonu
const generateChatTitle = (firstMessage: string): string => {
  const cleanMessage = firstMessage.trim();
  if (cleanMessage.length <= 30) return cleanMessage;
  return cleanMessage.substring(0, 30) + '...';
};

// LocalStorage'dan chat geçmişini yükle
const loadChatHistory = (): ChatSession[] => {
  try {
    const stored = localStorage.getItem('chatHistory');
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((session: any) => ({
        ...session,
        createdAt: new Date(session.createdAt),
        updatedAt: new Date(session.updatedAt),
        messages: session.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      }));
    }
  } catch (error) {
    console.error('Chat geçmişi yüklenirken hata:', error);
  }
  return [];
};

// LocalStorage'a chat geçmişini kaydet
const saveChatHistory = (history: ChatSession[]) => {
  try {
    localStorage.setItem('chatHistory', JSON.stringify(history));
  } catch (error) {
    console.error('Chat geçmişi kaydedilirken hata:', error);
  }
};

export const useChat = () => {
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatSession[]>(() => loadChatHistory());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Chat geçmişini LocalStorage'a kaydet
  useEffect(() => {
    saveChatHistory(chatHistory);
  }, [chatHistory]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    // Eğer mevcut session yoksa yeni bir tane oluştur
    if (!currentSession) {
      const newSession: ChatSession = {
        id: Date.now().toString(),
        title: generateChatTitle(text),
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setCurrentSession(newSession);
    }

    // Kullanıcı mesajını ekle
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setCurrentSession(prev => {
      if (!prev) return null;
      return {
        ...prev,
        messages: [...prev.messages, userMessage],
        updatedAt: new Date()
      };
    });

    setIsLoading(true);
    setError(null);

    try {
      // Backend'den cevap al
      const response = await chatService.sendMessage(text.trim());
      
      // Bot cevabını ekle
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.answer,
        sender: 'bot',
        timestamp: new Date()
      };

      setCurrentSession(prev => {
        if (!prev) return null;
        const updatedSession = {
          ...prev,
          messages: [...prev.messages, botMessage],
          updatedAt: new Date()
        };

        // Chat geçmişini güncelle
        setChatHistory(prevHistory => {
          const existingIndex = prevHistory.findIndex(session => session.id === prev.id);
          if (existingIndex !== -1) {
            const newHistory = [...prevHistory];
            newHistory[existingIndex] = updatedSession;
            return newHistory;
          } else {
            return [updatedSession, ...prevHistory];
          }
        });

        return updatedSession;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      
      // Hata mesajını chat'e ekle
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.',
        sender: 'bot',
        timestamp: new Date()
      };

      setCurrentSession(prev => {
        if (!prev) return null;
        return {
          ...prev,
          messages: [...prev.messages, errorMessage],
          updatedAt: new Date()
        };
      });
    } finally {
      setIsLoading(false);
    }
  }, [currentSession]);

  const startNewChat = useCallback(() => {
    setCurrentSession(null);
    setError(null);
  }, []);

  const loadChatSession = useCallback((sessionId: string) => {
    const session = chatHistory.find(s => s.id === sessionId);
    if (session) {
      setCurrentSession(session);
      setError(null);
    }
  }, [chatHistory]);

  const deleteChatSession = useCallback((sessionId: string) => {
    setChatHistory(prevHistory => {
      const newHistory = prevHistory.filter(session => session.id !== sessionId);
      return newHistory;
    });
    
    // Eğer silinen session şu anki session ise, yeni bir chat başlat
    if (currentSession?.id === sessionId) {
      setCurrentSession(null);
      setError(null);
    }
  }, [chatHistory, currentSession]);

  const clearMessages = useCallback(() => {
    setCurrentSession(null);
    setError(null);
  }, []);

  const transcribeAudio = useCallback(async (audioFile: File): Promise<string> => {
    try {
      const response = await chatService.transcribeAudio(audioFile);
      return response.text;
    } catch (err) {
      throw err;
    }
  }, []);

  return {
    messages: currentSession?.messages || [],
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
    clearMessages,
    transcribeAudio
  };
};
