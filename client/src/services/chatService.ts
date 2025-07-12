import { ChatRequest, ChatResponse, VoiceResponse, ApiError } from '../types/chat.types';

const API_BASE_URL = 'http://localhost:8000';

class ChatService {
  // Asterisk ve markdown formatlamasını temizleme fonksiyonu
  private cleanResponse(text: string): string {
    return text
      .replace(/\*\*/g, '') // **bold** -> bold
      .replace(/\*/g, '')   // *italic* -> italic
      .replace(/#{1,6}\s?/g, '') // # headers -> text
      .replace(/`{3}[\s\S]*?`{3}/g, '') // ```code blocks``` -> remove
      .replace(/`([^`]+)`/g, '$1') // `inline code` -> inline code
      .replace(/^\s*[-*+]\s+/gm, '• ') // markdown lists -> bullet points
      .replace(/^\s*\d+\.\s+/gm, '') // numbered lists -> remove numbers
      .trim();
  }

  async sendMessage(question: string): Promise<ChatResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question } as ChatRequest),
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(errorData.detail || 'Bir hata oluştu');
      }

      const data: ChatResponse = await response.json();
      
      // Yanıtı temizle
      return {
        answer: this.cleanResponse(data.answer)
      };
    } catch (error) {
      console.error('Chat API hatası:', error);
      throw error;
    }
  }

  async transcribeAudio(audioFile: File): Promise<VoiceResponse> {
    try {
      const formData = new FormData();
      formData.append('audio_file', audioFile);

      const response = await fetch(`${API_BASE_URL}/transcriptions`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(errorData.detail || 'Ses tanıma hatası');
      }

      return await response.json();
    } catch (error) {
      console.error('Transcription API hatası:', error);
      throw error;
    }
  }

  async uploadDocument(file: File): Promise<ChatResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_BASE_URL}/documents`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(errorData.detail || 'Doküman yükleme hatası');
      }

      const data: ChatResponse = await response.json();
      
      // Yanıtı temizle
      return {
        answer: this.cleanResponse(data.answer)
      };
    } catch (error) {
      console.error('Document upload API hatası:', error);
      throw error;
    }
  }
}

export const chatService = new ChatService();
