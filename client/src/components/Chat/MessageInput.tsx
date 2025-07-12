import { useState, KeyboardEvent, useRef, useEffect } from 'react';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

export const MessageInput = ({ onSendMessage, disabled = false }: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isMultiLine, setIsMultiLine] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
      setIsMultiLine(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !disabled) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Otomatik yükseklik ayarlama
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      
      if (scrollHeight > 56) { // Tek satır için daha kompakt
        setIsMultiLine(true);
        textareaRef.current.style.height = `${Math.min(scrollHeight, 120)}px`;
      } else {
        setIsMultiLine(false);
        textareaRef.current.style.height = '56px';
      }
    }
  };

  useEffect(() => {
    if (textareaRef.current && !message) {
      textareaRef.current.style.height = '56px';
      setIsMultiLine(false);
    }
  }, [message]);

  return (
    <div className="relative">
      {/* Ana input container */}
      <div className={`bg-white rounded-2xl border-2 transition-all duration-300 shadow-lg hover:shadow-xl ${
        isFocused 
          ? 'border-green-500 shadow-green-100' 
          : 'border-gray-200 hover:border-green-300'
      }`}>
        <form onSubmit={handleSubmit} className="flex items-end p-3 gap-3">
          {/* Textarea container */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Mesajınızı yazın..."
              disabled={disabled}
              className={`w-full resize-none bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 
                font-medium text-base leading-6 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{
                minHeight: '56px',
                maxHeight: '120px',
                height: '56px',
                paddingTop: '15px',
                paddingBottom: '15px',
                paddingLeft: '16px',
                paddingRight: '16px'
              }}
            />
            
            {/* Karakter sayısı - sadece çok uzun mesajlarda göster */}
            {message.length > 200 && (
              <div className="absolute bottom-1 right-3 text-xs text-gray-400">
                {message.length}/1000
              </div>
            )}
          </div>
          
          {/* Gönder butonu - Yeniden tasarlandı */}
          <button
            type="submit"
            disabled={!message.trim() || disabled}
            className={`flex-shrink-0 w-12 h-12 rounded-xl transition-all duration-200 flex items-center justify-center
              ${!message.trim() || disabled
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95'
              }`}
          >
            {disabled ? (
              <div className="animate-spin">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </form>
      </div>
      
      {/* Alt yardım metni - daha minimal */}
      <div className="flex items-center justify-between mt-3 px-2">
        <div className="flex items-center text-xs text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          <span>Tarım asistanınız aktif</span>
        </div>
        
        <div className="text-xs text-gray-400">
          Enter ile gönderin
        </div>
      </div>
    </div>
  );
};
