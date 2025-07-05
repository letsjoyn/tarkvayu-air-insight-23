
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Layers, Filter, Info, X } from "lucide-react";
import { allIndianCities, getCityAQI, getAQIStatus } from "../data/allIndianCities";

const AQIHeatMap = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [mapLayer, setMapLayer] = useState("satellite");

  // Prepare city data with AQI values
  const citiesWithAQI = allIndianCities.map(city => ({
    ...city,
    aqi: getCityAQI(city.name),
    status: getAQIStatus(getCityAQI(city.name)),
    color: getAQIColor(getCityAQI(city.name))
  }));

  function getAQIColor(aqi: number) {
    if (aqi <= 50) return "bg-green-500";
    if (aqi <= 100) return "bg-yellow-500";
    if (aqi <= 150) return "bg-orange-500";
    if (aqi <= 200) return "bg-red-500";
    if (aqi <= 300) return "bg-purple-600";
    return "bg-gray-800";
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good": return "text-green-700 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800";
      case "Moderate": return "text-yellow-700 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-800";
      case "Unhealthy": case "Unhealthy for Sensitive": return "text-red-700 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800";
      case "Very Unhealthy": return "text-purple-700 bg-purple-50 border-purple-200 dark:text-purple-400 dark:bg-purple-900/20 dark:border-purple-800";
      case "Hazardous": return "text-gray-100 bg-gray-800 border-gray-600 dark:text-gray-300 dark:bg-gray-900/50 dark:border-gray-700";
      default: return "text-gray-700 bg-gray-50 border-gray-200 dark:text-gray-300 dark:bg-gray-800/50 dark:border-gray-600";
    }
  };

  const selectedCityData = selectedCity ? citiesWithAQI.find(city => city.name === selectedCity) : null;

  // Group cities by region for better organization
  const citiesByRegion = citiesWithAQI.reduce((acc, city) => {
    if (!acc[city.region]) {
      acc[city.region] = [];
    }
    acc[city.region].push(city);
    return acc;
  }, {} as Record<string, typeof citiesWithAQI>);

  return (
    <div className="space-y-6">
      {/* Map Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant={mapLayer === "satellite" ? "default" : "outline"}
            size="sm"
            onClick={() => setMapLayer("satellite")}
            className="flex items-center space-x-2"
          >
            <Layers className="h-4 w-4" />
            <span>Satellite</span>
          </Button>
          <Button
            variant={mapLayer === "terrain" ? "default" : "outline"}
            size="sm"
            onClick={() => setMapLayer("terrain")}
            className="flex items-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>Terrain</span>
          </Button>
        </div>
        
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Click on any city to view detailed information
        </div>
      </div>

      {/* Selected City Info */}
      {selectedCityData && (
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  {selectedCityData.name}, {selectedCityData.state}
                </h3>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {selectedCityData.aqi}
                  </span>
                  <Badge className={getStatusColor(selectedCityData.status)}>
                    {selectedCityData.status}
                  </Badge>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCity(null)}
                className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Interactive Map */}
      <Card className="overflow-hidden dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center justify-between dark:text-white">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Live AQI Heatmap - India</span>
            </div>
            <Badge className="bg-blue-500 text-white">
              Live Data • {citiesWithAQI.length} Cities
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative bg-gradient-to-br from-blue-100 via-green-50 to-yellow-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 h-[600px] overflow-hidden">
            {/* Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-yellow-100 to-blue-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 opacity-30"></div>
            
            {/* State Boundaries (Visual Representation) */}
            <div className="absolute inset-0">
              {/* North India Region */}
              <div className="absolute top-10 left-20 w-40 h-32 border-2 border-dashed border-gray-400 rounded-lg opacity-30">
                <span className="text-xs text-gray-600 dark:text-gray-400 p-1">North India</span>
              </div>
              
              {/* South India Region */}
              <div className="absolute bottom-20 left-32 w-36 h-40 border-2 border-dashed border-gray-400 rounded-lg opacity-30">
                <span className="text-xs text-gray-600 dark:text-gray-400 p-1">South India</span>
              </div>
              
              {/* West India Region */}
              <div className="absolute top-32 left-8 w-32 h-36 border-2 border-dashed border-gray-400 rounded-lg opacity-30">
                <span className="text-xs text-gray-600 dark:text-gray-400 p-1">West India</span>
              </div>
              
              {/* East India Region */}
              <div className="absolute top-28 right-16 w-28 h-32 border-2 border-dashed border-gray-400 rounded-lg opacity-30">
                <span className="text-xs text-gray-600 dark:text-gray-400 p-1">East India</span>
              </div>
              
              {/* Northeast Region */}
              <div className="absolute top-12 right-8 w-24 h-20 border-2 border-dashed border-gray-400 rounded-lg opacity-30">
                <span className="text-xs text-gray-600 dark:text-gray-400 p-1">Northeast</span>
              </div>
            </div>
            
            {/* City Markers */}
            {citiesWithAQI.map((city, index) => (
              <div
                key={index}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-all duration-200 hover:z-10"
                style={{
                  left: `${((city.lng - 68) / (97 - 68)) * 100}%`,
                  top: `${((35 - city.lat) / (35 - 6)) * 100}%`
                }}
                onClick={() => setSelectedCity(city.name)}
              >
                <div className={`w-3 h-3 rounded-full ${city.color} border-2 border-white dark:border-gray-200 shadow-lg flex items-center justify-center relative`}>
                  <div className="w-1 h-1 bg-white dark:bg-gray-200 rounded-full"></div>
                  {selectedCity === city.name && (
                    <div className="absolute -top-1 -left-1 w-5 h-5 border-2 border-blue-500 rounded-full animate-ping"></div>
                  )}
                </div>
                <div className={`absolute top-5 left-1/2 transform -translate-x-1/2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium shadow-lg min-w-max border border-gray-200 dark:border-gray-600 ${
                  selectedCity === city.name ? 'opacity-100 scale-110' : 'opacity-0 hover:opacity-100 scale-95 hover:scale-100'
                } transition-all duration-200`}>
                  <div className="font-semibold text-gray-900 dark:text-white">{city.name}</div>
                  <div className="text-gray-600 dark:text-gray-300">AQI: {city.aqi}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{city.state}</div>
                </div>
              </div>
            ))}
            
            {/* Enhanced Legend */}
            <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200 dark:border-gray-600">
              <div className="flex items-center space-x-2 mb-3">
                <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <h4 className="font-semibold text-sm text-gray-900 dark:text-white">AQI Scale</h4>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Good</span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">0-50</span>
                </div>
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Moderate</span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">51-100</span>
                </div>
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Unhealthy</span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">101-150</span>
                </div>
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Very Unhealthy</span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">151-200</span>
                </div>
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Very Unhealthy</span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">201-300</span>
                </div>
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Hazardous</span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">300+</span>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="absolute top-4 right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200 dark:border-gray-600">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{citiesWithAQI.length}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Cities Monitored</div>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Last Updated: {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regional City Grid */}
      <div className="space-y-6">
        {Object.entries(citiesByRegion).map(([region, cities]) => (
          <Card key={region} className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white capitalize">{region} India - {cities.length} Cities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-64 overflow-y-auto">
                {cities.map((city, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md dark:hover:shadow-gray-700 ${
                      selectedCity === city.name 
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400" 
                        : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-700"
                    }`}
                    onClick={() => setSelectedCity(city.name)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{city.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{city.state}</p>
                      </div>
                      <Badge className={`${getStatusColor(city.status)} text-xs`}>
                        {city.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">{city.aqi}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">AQI</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AQIHeatMap;
