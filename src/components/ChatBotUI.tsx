
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, X, Bot, User, MapPin, TrendingUp } from "lucide-react";
import VoiceAssistant from "./VoiceAssistant";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  type?: "text" | "aqi" | "suggestion";
}

const ChatBotUI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [openaiApiKey, setOpenaiApiKey] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  // Initialize welcome message based on language
  useEffect(() => {
    const welcomeMessage: Message = {
      id: "welcome",
      text: t('chatbot.welcome'),
      sender: "bot",
      timestamp: new Date(),
      type: "text"
    };
    setMessages([welcomeMessage]);
  }, [language, t]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced AI response using OpenAI API
  const generateAIResponse = async (userMessage: string): Promise<string> => {
    if (!openaiApiKey) {
      return t('chatbot.need_api_key');
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiApiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4.1',
          messages: [
            {
              role: 'system',
              content: `You are Vayu, an AI assistant specialized in air quality information for India. You provide accurate, helpful information about AQI, pollution, health recommendations, and environmental data. Respond in ${language === 'hindi' ? 'Hindi' : 'English'}. Keep responses concise but informative.`
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API error:', error);
      return t('chatbot.ai_error');
    }
  };

  // Fallback responses for when OpenAI isn't available
  const generateFallbackResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('aqi') || lowerMessage.includes('air quality')) {
      return t('chatbot.aqi_info');
    } else if (lowerMessage.includes('health') || lowerMessage.includes('recommend')) {
      return t('chatbot.health_tips');
    } else if (lowerMessage.includes('pollution') || lowerMessage.includes('cause')) {
      return t('chatbot.pollution_sources');
    } else {
      return t('chatbot.general_help');
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      let botResponseText: string;
      
      if (openaiApiKey) {
        botResponseText = await generateAIResponse(inputMessage);
      } else {
        // Use fallback responses
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate typing delay
        botResponseText = generateFallbackResponse(inputMessage);
      }

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: "bot",
        timestamp: new Date(),
        type: "text"
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: t('chatbot.error_occurred'),
        sender: "bot",
        timestamp: new Date(),
        type: "text"
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleVoiceInput = (text: string) => {
    setInputMessage(text);
    setTimeout(() => handleSendMessage(), 500);
  };

  const handleSpeakResponse = (text: string) => {
    // Voice response is handled by the VoiceAssistant component
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { text: t('chatbot.quick_aqi'), icon: <TrendingUp className="h-4 w-4" /> },
    { text: t('chatbot.quick_health'), icon: <User className="h-4 w-4" /> },
    { text: t('chatbot.quick_voice'), icon: <MessageCircle className="h-4 w-4" /> },
    { text: t('chatbot.quick_cities'), icon: <MapPin className="h-4 w-4" /> },
  ];

  return (
    <>
      {/* Enhanced Chat Bubble Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full animate-pulse opacity-75"></div>
            
            <Button
              onClick={() => setIsOpen(true)}
              className="relative bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 shadow-2xl border-0 px-6 py-4 h-auto rounded-full flex items-center space-x-3 text-white font-semibold transform hover:scale-105 transition-all duration-300 min-w-[200px]"
            >
              <div className="relative">
                <MessageCircle className="h-7 w-7" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-bounce flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="text-left">
                <div className="text-base font-bold">{t('chatbot.title')}</div>
                <div className="text-xs text-blue-100">{t('chatbot.subtitle')}</div>
              </div>
            </Button>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed top-16 right-6 bottom-6 w-96 shadow-2xl z-50 flex flex-col bg-white dark:bg-gray-800 border-2">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-base">{t('chatbot.title')}</h3>
                <p className="text-xs text-blue-100">{t('chatbot.features')}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* OpenAI API Key Input */}
          {!openaiApiKey && (
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border-b">
              <div className="text-xs mb-2 text-yellow-700 dark:text-yellow-300">
                {t('chatbot.api_key_prompt')}
              </div>
              <div className="flex space-x-2">
                <Input
                  type="password"
                  placeholder={t('chatbot.enter_api_key')}
                  value={openaiApiKey}
                  onChange={(e) => setOpenaiApiKey(e.target.value)}
                  className="text-xs"
                />
              </div>
            </div>
          )}

          {/* Voice Assistant Controls */}
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
            <VoiceAssistant 
              onVoiceInput={handleVoiceInput}
              onSpeakResponse={handleSpeakResponse}
            />
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-blue-500 to-green-500 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === "bot" && (
                        <Bot className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="text-sm whitespace-pre-wrap">
                        {message.text}
                      </div>
                    </div>
                    <div className={`text-xs mt-1 ${
                      message.sender === "user" ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setInputMessage(action.text);
                      setTimeout(() => handleSendMessage(), 100);
                    }}
                    className="flex items-center space-x-1 text-xs dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 justify-start"
                  >
                    {action.icon}
                    <span>{action.text}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t dark:border-gray-600">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('chatbot.input_placeholder')}
                className="flex-1 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isTyping || inputMessage.trim() === ""}
                size="icon"
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatBotUI;
