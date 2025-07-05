
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Settings as SettingsIcon, Bell, MapPin, User, Shield, Smartphone } from "lucide-react";
import NotificationSettings from "../components/NotificationSettings";
import LanguageToggle from "../components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const Settings = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center space-x-3">
            <SettingsIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span>{t('settings.title')}</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('settings.language_description')}
          </p>
        </div>

        <div className="space-y-6">
          {/* Language Settings */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-white">
                <Smartphone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span>{t('settings.language')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LanguageToggle 
                currentLanguage={language}
                onLanguageChange={handleLanguageChange}
              />
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-white">
                <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span>{t('settings.notifications')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <NotificationSettings />
            </CardContent>
          </Card>

          {/* Location Settings */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-white">
                <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span>{t('settings.location')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'hindi' 
                    ? 'स्थान सेटिंग्स यहां दिखाई जाएंगी।'
                    : 'Location settings will be displayed here.'
                  }
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-white">
                <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span>{t('settings.personal')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'hindi' 
                    ? 'व्यक्तिगत जानकारी सेटिंग्स यहां दिखाई जाएंगी।'
                    : 'Personal information settings will be displayed here.'
                  }
                </div>
              </div>
            </CardContent>
          </Card>

          {/* App Preferences */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-white">
                <SettingsIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span>{t('settings.app_preferences')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'hindi' 
                    ? 'ऐप प्राथमिकता सेटिंग्स यहां दिखाई जाएंगी।'
                    : 'App preference settings will be displayed here.'
                  }
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-white">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span>{t('settings.privacy')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'hindi' 
                    ? 'गोपनीयता और सुरक्षा सेटिंग्स यहां दिखाई जाएंगी।'
                    : 'Privacy and security settings will be displayed here.'
                  }
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
