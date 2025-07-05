
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  english: {
    // Common
    'app.title': 'TarkVayu',
    'app.subtitle': 'Real-Time Air Quality Monitor',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.close': 'Close',
    'common.retry': 'Retry',
    'common.refresh': 'Refresh',
    
    // Navigation
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.trends': 'Trends',
    'nav.forecast': 'Forecast',
    'nav.health': 'Health',
    'nav.settings': 'Settings',
    'nav.login': 'Login',
    
    // Dashboard
    'dashboard.title': 'Real-Time AQI Dashboard',
    'dashboard.live': 'Live',
    'dashboard.current_aqi': 'Current AQI',
    'dashboard.last_updated': 'Last updated',
    'dashboard.live_aqi_map': 'Live AQI Heat Map',
    'dashboard.aqi_scale': 'AQI Scale',
    'dashboard.cities': 'Cities',
    'dashboard.live_data': 'Live Data',
    'dashboard.humidity': 'Humidity',
    'dashboard.wind_speed': 'Wind Speed',
    'dashboard.visibility': 'Visibility',
    
    // AQI Status
    'aqi.good': 'Good',
    'aqi.moderate': 'Moderate',
    'aqi.unhealthy_sensitive': 'Unhealthy for Sensitive',
    'aqi.unhealthy': 'Unhealthy',
    'aqi.very_unhealthy': 'Very Unhealthy',
    'aqi.hazardous': 'Hazardous',
    
    // Settings
    'settings.title': 'Settings & Preferences',
    'settings.language': 'Language',
    'settings.notifications': 'Notifications',
    'settings.location': 'Location',
    'settings.personal': 'Personal Information',
    'settings.app_preferences': 'App Preferences',
    'settings.privacy': 'Privacy & Security',
    'settings.language_toggle': 'Language Switch',
    'settings.language_description': 'Switch between English and Hindi',
    
    // Chatbot
    'chatbot.title': 'Vayu: AI Assistant',
    'chatbot.subtitle': 'Air Quality Expert • Voice Enabled',
    'chatbot.features': '200+ Cities • Voice Enabled • Real-time Data',
    'chatbot.welcome': "Hello! I'm Vayu, your AI air quality assistant. I can help you with:\n\n• Current AQI information for 200+ Indian cities\n• Health recommendations based on air quality\n• Detailed pollution explanations\n• Location-specific advice\n• Weather forecasts\n• Voice assistance for hands-free interaction\n\nHow can I help you today?",
    'chatbot.need_api_key': 'Please enter your OpenAI API key to enable advanced AI responses.',
    'chatbot.ai_error': 'Sorry, I encountered an error processing your request. Please try again.',
    'chatbot.error_occurred': 'An error occurred while processing your message.',
    'chatbot.api_key_prompt': 'Enter your OpenAI API key for enhanced AI responses:',
    'chatbot.enter_api_key': 'Enter OpenAI API key',
    'chatbot.input_placeholder': 'Ask about air quality, health tips, or say "voice help"...',
    'chatbot.quick_aqi': 'Current AQI Delhi',
    'chatbot.quick_health': 'Health recommendations',
    'chatbot.quick_voice': 'Voice assistance',
    'chatbot.quick_cities': 'City pollution data',
    'chatbot.aqi_info': 'I can provide AQI data for 200+ Indian cities! Which specific city would you like to know about?',
    'chatbot.health_tips': 'Based on current air quality levels, here are personalized health recommendations for your safety.',
    'chatbot.pollution_sources': 'Major pollution sources in India include vehicular emissions, industrial activities, and agricultural burning.',
    'chatbot.general_help': 'I can help you with air quality information, health recommendations, and pollution data for Indian cities.',
    
    // Voice Assistant
    'voice.start': 'Voice',
    'voice.stop': 'Stop',
    'voice.speak': 'Speak',
    'voice.listening': 'Listening...',
    'voice.speaking': 'Speaking...',
    
    // Login
    'login.signin': 'Sign In',
    'login.signup': 'Sign Up',
    'login.google': 'Continue with Google',
    'login.skip': 'Skip',
    'login.welcome': 'Welcome to TarkVayu',
    'login.subtitle': 'Your Personal Air Quality Monitor',
    
    // Health
    'health.recommendations': 'Health Recommendations',
    'health.exercise': 'Exercise Guidelines',
    'health.protection': 'Protection Measures',
    'health.sensitive_groups': 'Sensitive Groups',
    
    // Trends
    'trends.title': 'Air Quality Trends',
    'trends.weekly': 'Weekly Trends',
    'trends.monthly': 'Monthly Trends',
    'trends.yearly': 'Yearly Trends',
    
    // Forecast
    'forecast.title': 'Air Quality Forecast',
    'forecast.today': 'Today',
    'forecast.tomorrow': 'Tomorrow',
    'forecast.week': 'This Week',
  },
  hindi: {
    // Common
    'app.title': 'तर्कवायु',
    'app.subtitle': 'रियल-टाइम वायु गुणवत्ता मॉनिटर',
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.save': 'सहेजें',
    'common.cancel': 'रद्द करें',
    'common.close': 'बंद करें',
    'common.retry': 'पुनः प्रयास करें',
    'common.refresh': 'रीफ्रेश करें',
    
    // Navigation
    'nav.home': 'होम',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.trends': 'रुझान',
    'nav.forecast': 'पूर्वानुमान',
    'nav.health': 'स्वास्थ्य',
    'nav.settings': 'सेटिंग्स',
    'nav.login': 'लॉगिन',
    
    // Dashboard
    'dashboard.title': 'रियल-टाइम AQI डैशबोर्ड',
    'dashboard.live': 'लाइव',
    'dashboard.current_aqi': 'वर्तमान AQI',
    'dashboard.last_updated': 'अंतिम अपडेट',
    'dashboard.live_aqi_map': 'लाइव AQI हीट मैप',
    'dashboard.aqi_scale': 'AQI स्केल',
    'dashboard.cities': 'शहर',
    'dashboard.live_data': 'लाइव डेटा',
    'dashboard.humidity': 'आर्द्रता',
    'dashboard.wind_speed': 'हवा की गति',
    'dashboard.visibility': 'दृश्यता',
    
    // AQI Status
    'aqi.good': 'अच्छा',
    'aqi.moderate': 'मध्यम',
    'aqi.unhealthy_sensitive': 'संवेदनशील के लिए हानिकारक',
    'aqi.unhealthy': 'हानिकारक',
    'aqi.very_unhealthy': 'बहुत हानिकारक',
    'aqi.hazardous': 'खतरनाक',
    
    // Settings
    'settings.title': 'सेटिंग्स और प्राथमिकताएं',
    'settings.language': 'भाषा',
    'settings.notifications': 'सूचनाएं',
    'settings.location': 'स्थान',
    'settings.personal': 'व्यक्तिगत जानकारी',
    'settings.app_preferences': 'ऐप प्राथमिकताएं',
    'settings.privacy': 'गोपनीयता और सुरक्षा',
    'settings.language_toggle': 'भाषा स्विच करें',
    'settings.language_description': 'अंग्रेजी और हिंदी के बीच स्विच करें',
    
    // Chatbot
    'chatbot.title': 'वायु: AI सहायक',
    'chatbot.subtitle': 'वायु गुणवत्ता विशेषज्ञ • आवाज सक्षम',
    'chatbot.features': '200+ शहर • आवाज सक्षम • रियल-टाइम डेटा',
    'chatbot.welcome': "नमस्ते! मैं वायु हूं, आपका AI वायु गुणवत्ता सहायक। मैं आपकी मदद कर सकता हूं:\n\n• 200+ भारतीय शहरों की वर्तमान AQI जानकारी\n• वायु गुणवत्ता के आधार पर स्वास्थ्य सुझाव\n• विस्तृत प्रदूषण स्पष्टीकरण\n• स्थान-विशिष्ट सलाह\n• मौसम पूर्वानुमान\n• हैंड्स-फ्री इंटरैक्शन के लिए आवाज सहायता\n\nआज मैं आपकी कैसे मदद कर सकता हूं?",
    'chatbot.need_api_key': 'कृपया उन्नत AI प्रतिक्रियाओं को सक्षम करने के लिए अपनी OpenAI API key दर्ज करें।',
    'chatbot.ai_error': 'माफ करें, आपके अनुरोध को संसाधित करने में त्रुटि हुई है। कृपया पुनः प्रयास करें।',
    'chatbot.error_occurred': 'आपके संदेश को संसाधित करते समय त्रुटि हुई।',
    'chatbot.api_key_prompt': 'उन्नत AI प्रतिक्रियाओं के लिए अपनी OpenAI API key दर्ज करें:',
    'chatbot.enter_api_key': 'OpenAI API key दर्ज करें',
    'chatbot.input_placeholder': 'वायु गुणवत्ता, स्वास्थ्य सुझाव के बारे में पूछें या "आवाज सहायता" कहें...',
    'chatbot.quick_aqi': 'दिल्ली की वर्तमान AQI',
    'chatbot.quick_health': 'स्वास्थ्य सुझाव',
    'chatbot.quick_voice': 'आवाज सहायता',
    'chatbot.quick_cities': 'शहर प्रदूषण डेटा',
    'chatbot.aqi_info': 'मैं 200+ भारतीय शहरों का AQI डेटा प्रदान कर सकता हूं! आप किस विशिष्ट शहर के बारे में जानना चाहते हैं?',
    'chatbot.health_tips': 'वर्तमान वायु गुणवत्ता के स्तर के आधार पर, यहां आपकी सुरक्षा के लिए व्यक्तिगत स्वास्थ्य सुझाव हैं।',
    'chatbot.pollution_sources': 'भारत में प्रमुख प्रदूषण स्रोतों में वाहन उत्सर्जन, औद्योगिक गतिविधियां और कृषि जलाना शामिल है।',
    'chatbot.general_help': 'मैं आपको वायु गुणवत्ता जानकारी, स्वास्थ्य सुझाव, और भारतीय शहरों के प्रदूषण डेटा में मदद कर सकता हूं।',
    
    // Voice Assistant
    'voice.start': 'आवाज',
    'voice.stop': 'रोकें',
    'voice.speak': 'बोलें',
    'voice.listening': 'सुन रहा है...',
    'voice.speaking': 'बोल रहा है...',
    
    // Login
    'login.signin': 'साइन इन',
    'login.signup': 'साइन अप',
    'login.google': 'Google के साथ जारी रखें',
    'login.skip': 'छोड़ें',
    'login.welcome': 'तर्कवायु में आपका स्वागत है',
    'login.subtitle': 'आपका व्यक्तिगत वायु गुणवत्ता मॉनिटर',
    
    // Health
    'health.recommendations': 'स्वास्थ्य सुझाव',
    'health.exercise': 'व्यायाम दिशानिर्देश',
    'health.protection': 'सुरक्षा उपाय',
    'health.sensitive_groups': 'संवेदनशील समूह',
    
    // Trends
    'trends.title': 'वायु गुणवत्ता रुझान',
    'trends.weekly': 'साप्ताहिक रुझान',
    'trends.monthly': 'मासिक रुझान',
    'trends.yearly': 'वार्षिक रुझान',
    
    // Forecast
    'forecast.title': 'वायु गुणवत्ता पूर्वानुमान',
    'forecast.today': 'आज',
    'forecast.tomorrow': 'कल',
    'forecast.week': 'इस सप्ताह',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>(() => {
    return localStorage.getItem('language') || 'english';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.english] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
