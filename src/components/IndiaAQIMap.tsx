
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, RefreshCw, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AQILocation {
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  measurements: Array<{
    parameter: string;
    value: number;
    unit: string;
  }>;
  lastUpdated: string;
}

const IndiaAQIMap = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [aqiData, setAqiData] = useState<AQILocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  const fetchAQIData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://api.openaq.org/v2/latest?country=IN&limit=200&page=1");
      if (!response.ok) {
        throw new Error('Failed to fetch AQI data');
      }
      const data = await response.json();
      setAqiData(data.results || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      console.error("Failed to load AQI data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAQIData();
    // Refresh data every 5 minutes
    const interval = setInterval(fetchAQIData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getAQIValue = (location: AQILocation) => {
    const pm25 = location.measurements.find(m => m.parameter === 'pm25');
    if (pm25) return pm25.value;
    
    const pm10 = location.measurements.find(m => m.parameter === 'pm10');
    if (pm10) return Math.round(pm10.value * 0.5); // Rough conversion
    
    return 0;
  };

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return "#22c55e"; // Green
    if (aqi <= 100) return "#eab308"; // Yellow
    if (aqi <= 150) return "#f97316"; // Orange
    if (aqi <= 200) return "#ef4444"; // Red
    if (aqi <= 300) return "#a855f7"; // Purple
    return "#374151"; // Gray
  };

  const getAQILevel = (aqi: number) => {
    if (aqi <= 50) return t('aqi.good');
    if (aqi <= 100) return t('aqi.moderate');
    if (aqi <= 150) return t('aqi.unhealthy_sensitive');
    if (aqi <= 200) return t('aqi.unhealthy');
    if (aqi <= 300) return t('aqi.very_unhealthy');
    return t('aqi.hazardous');
  };

  const getCityPosition = (lat: number, lng: number) => {
    // Convert lat/lng to SVG coordinates (India bounds: 6-37°N, 68-97°E)
    const x = ((lng - 68) / (97 - 68)) * 100;
    const y = ((37 - lat) / (37 - 6)) * 100;
    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>{t('dashboard.live_aqi_map')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-96">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>{t('common.loading')}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>{t('dashboard.live_aqi_map')}</span>
            </div>
            <Button variant="outline" size="sm" onClick={fetchAQIData}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-red-500 mb-2">{t('common.error')}: {error}</p>
            <Button onClick={fetchAQIData}>{t('common.retry')}</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>{t('dashboard.live_aqi_map')}</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-green-500 text-white">
              {t('dashboard.live')} • {aqiData.length} {t('dashboard.cities')}
            </Badge>
            <Button variant="ghost" size="icon" onClick={fetchAQIData}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          <div className="relative w-full h-96 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-700 overflow-hidden">
            {/* India Map SVG */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full"
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
            >
              <path
                d="M20,15 L25,12 L30,14 L35,10 L40,12 L45,8 L50,10 L55,8 L60,12 L65,10 L70,15 L75,18 L80,25 L82,35 L80,45 L78,55 L75,65 L70,75 L65,80 L60,82 L55,85 L50,88 L45,85 L40,82 L35,80 L30,75 L25,70 L22,60 L20,50 L18,40 L19,30 Z"
                fill="#e5f3ff"
                stroke="#3b82f6"
                strokeWidth="0.5"
                className="dark:fill-gray-600 dark:stroke-gray-400"
              />
            </svg>

            {/* Real AQI Data Points */}
            {aqiData.map((location, index) => {
              const position = getCityPosition(location.coordinates.latitude, location.coordinates.longitude);
              const aqi = getAQIValue(location);
              const color = getAQIColor(aqi);
              
              return (
                <div
                  key={index}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform duration-200"
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                  }}
                  onClick={() => setSelectedCity(selectedCity === location.name ? null : location.name)}
                >
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white shadow-lg flex items-center justify-center relative"
                    style={{ backgroundColor: color }}
                  >
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    
                    {aqi > 150 && (
                      <div
                        className="absolute inset-0 rounded-full animate-ping"
                        style={{ backgroundColor: color, opacity: 0.4 }}
                      ></div>
                    )}
                  </div>

                  {selectedCity === location.name && (
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg min-w-max z-10 border border-gray-200 dark:border-gray-600">
                      <div className="font-semibold text-sm text-gray-900 dark:text-white">
                        {location.name}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                        AQI: {aqi}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(location.lastUpdated).toLocaleString()}
                      </div>
                      <Badge
                        className="text-xs mt-1"
                        style={{
                          backgroundColor: color,
                          color: aqi > 150 ? "white" : "black",
                        }}
                      >
                        {getAQILevel(aqi)}
                      </Badge>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <h4 className="font-semibold mb-2 text-sm text-gray-900 dark:text-white">
                {t('dashboard.aqi_scale')}
              </h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">{t('aqi.good')} (0-50)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">{t('aqi.moderate')} (51-100)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">{t('aqi.unhealthy_sensitive')} (101-150)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">{t('aqi.unhealthy')} (151-200)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">{t('aqi.very_unhealthy')} (201-300)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">{t('aqi.hazardous')} (300+)</span>
                </div>
              </div>
            </div>

            {/* Live indicator */}
            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>{t('dashboard.live_data')}</span>
            </div>
          </div>
        </div>

        {/* City summary stats */}
        <div className="p-4 border-t dark:border-gray-600">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-600">
                {aqiData.filter(loc => getAQIValue(loc) <= 50).length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">{t('aqi.good')}</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-600">
                {aqiData.filter(loc => {
                  const aqi = getAQIValue(loc);
                  return aqi > 50 && aqi <= 100;
                }).length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">{t('aqi.moderate')}</div>
            </div>
            <div>
              <div className="text-lg font-bold text-orange-600">
                {aqiData.filter(loc => {
                  const aqi = getAQIValue(loc);
                  return aqi > 100 && aqi <= 150;
                }).length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">{t('aqi.unhealthy_sensitive')}</div>
            </div>
            <div>
              <div className="text-lg font-bold text-red-600">
                {aqiData.filter(loc => getAQIValue(loc) > 150).length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">{t('aqi.unhealthy')}+</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndiaAQIMap;
