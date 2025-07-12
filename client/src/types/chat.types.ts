export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatRequest {
  question: string;
}

export interface ChatResponse {
  answer: string;
}

export interface VoiceResponse {
  text: string;
}

export interface ApiError {
  detail: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatContextType {
  currentSession: ChatSession | null;
  chatHistory: ChatSession[];
  isLoading: boolean;
  error: string | null;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  sendMessage: (text: string) => Promise<void>;
  startNewChat: () => void;
  loadChatSession: (sessionId: string) => void;
  deleteChatSession: (sessionId: string) => void;
  clearMessages: () => void;
  transcribeAudio: (audioFile: File) => Promise<string>;
}
