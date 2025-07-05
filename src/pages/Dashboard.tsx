
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AQIStats from "../components/AQIStats";
import IndiaAQIMap from "../components/IndiaAQIMap";
import CitySelector from "../components/CitySelector";
import LocationDetector from "../components/LocationDetector";
import { MapPin, Wind, Droplets, Factory } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface City {
  name: string;
  state: string;
  population?: string;
  type: "metro" | "tier1" | "tier2" | "tier3";
}

interface AQIData {
  [cityName: string]: number;
}

const Dashboard = () => {
  const [selectedCity, setSelectedCity] = useState<City>({
    name: "Delhi",
    state: "Delhi",
    population: "3.2 Cr",
    type: "metro"
  });
  const [realTimeAQI, setRealTimeAQI] = useState<AQIData>({});
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  // Fetch real-time AQI data from OpenAQ API
  const fetchRealTimeAQI = async () => {
    try {
      const response = await fetch("https://api.openaq.org/v2/latest?country=IN&limit=200&page=1");
      const data = await response.json();
      
      const aqiMap: AQIData = {};
      data.results?.forEach((location: any) => {
        const pm25 = location.measurements.find((m: any) => m.parameter === 'pm25');
        if (pm25 && location.city) {
          aqiMap[location.city] = Math.round(pm25.value);
        }
      });
      
      setRealTimeAQI(aqiMap);
    } catch (error) {
      console.error("Failed to fetch real-time AQI data:", error);
      // Fallback to mock data
      setRealTimeAQI({
        "Delhi": 156,
        "Mumbai": 98,
        "Bangalore": 65,
        "Chennai": 78,
        "Kolkata": 134,
        "Patna": 168,
        "Varanasi": 142,
        "Jaunpur": 178,
        "Jhansi": 89,
        "Siliguri": 95
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealTimeAQI();
    // Refresh every 5 minutes
    const interval = setInterval(fetchRealTimeAQI, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLocationDetected = (location: { lat: number; lng: number; city: string }) => {
    const detectedCity: City = {
      name: location.city,
      state: location.city,
      type: "metro"
    };
    setSelectedCity(detectedCity);
  };

  const currentAQI = realTimeAQI[selectedCity.name] || 95;

  const getAQILevel = (aqi: number) => {
    if (aqi <= 50) return { level: t('aqi.good'), color: "bg-green-500", textColor: "text-green-700 dark:text-green-400" };
    if (aqi <= 100) return { level: t('aqi.moderate'), color: "bg-yellow-500", textColor: "text-yellow-700 dark:text-yellow-400" };
    if (aqi <= 150) return { level: t('aqi.unhealthy_sensitive'), color: "bg-orange-500", textColor: "text-orange-700 dark:text-orange-400" };
    if (aqi <= 200) return { level: t('aqi.unhealthy'), color: "bg-red-500", textColor: "text-red-700 dark:text-red-400" };
    if (aqi <= 300) return { level: t('aqi.very_unhealthy'), color: "bg-purple-500", textColor: "text-purple-700 dark:text-purple-400" };
    return { level: t('aqi.hazardous'), color: "bg-gray-800", textColor: "text-gray-100 dark:text-gray-300" };
  };

  const aqiInfo = getAQILevel(currentAQI);

  // Mock pollutants data
  const pollutants = [
    { name: "PM2.5", value: 45, unit: "μg/m³", status: t('aqi.moderate'), color: "yellow" },
    { name: "PM10", value: 89, unit: "μg/m³", status: t('aqi.unhealthy'), color: "red" },
    { name: "NO₂", value: 23, unit: "ppb", status: t('aqi.good'), color: "green" },
    { name: "SO₂", value: 12, unit: "ppb", status: t('aqi.good'), color: "green" },
    { name: "O₃", value: 67, unit: "ppb", status: t('aqi.moderate'), color: "yellow" },
    { name: "CO", value: 1.2, unit: "ppm", status: t('aqi.good'), color: "green" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('dashboard.title')}
          </h1>
          <div className="flex items-center space-x-4 max-w-2xl">
            <div className="flex-1">
              <CitySelector 
                selectedCity={selectedCity} 
                onSelectCity={setSelectedCity} 
              />
            </div>
            <LocationDetector onLocationDetected={handleLocationDetected} />
          </div>
        </div>

        {/* Current AQI Card */}
        <div className="mb-8">
          <Card className="border-l-4 border-l-blue-500 dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <CardTitle className="text-lg dark:text-white">
                    {selectedCity.name}, {selectedCity.state}
                  </CardTitle>
                </div>
                <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-300">
                  {t('dashboard.live')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {loading ? '...' : currentAQI}
                  </div>
                  <div className={`text-lg font-medium ${aqiInfo.textColor}`}>
                    {aqiInfo.level}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {t('dashboard.last_updated')}: {new Date().toLocaleTimeString()}
                  </p>
                </div>
                <div className={`w-20 h-20 ${aqiInfo.color} rounded-full flex items-center justify-center`}>
                  <Wind className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Droplets className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('dashboard.humidity')}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">68%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                  <Wind className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('dashboard.wind_speed')}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">12 km/h</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
                  <Factory className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('dashboard.visibility')}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">2.5 km</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AQI Stats */}
        <div className="mb-8">
          <AQIStats pollutants={pollutants} />
        </div>

        {/* India AQI Map */}
        <div className="mb-8">
          <IndiaAQIMap />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
