
export interface CityData {
  name: string;
  state: string;
  lat: number;
  lng: number;
  population?: string;
  type: "metro" | "tier1" | "tier2" | "tier3" | "town";
  region: "north" | "south" | "east" | "west" | "central" | "northeast";
}

export const allIndianCities: CityData[] = [
  // Metro Cities
  { name: "Delhi", state: "Delhi", lat: 28.7041, lng: 77.1025, population: "3.2 Cr", type: "metro", region: "north" },
  { name: "Mumbai", state: "Maharashtra", lat: 19.0760, lng: 72.8777, population: "2.1 Cr", type: "metro", region: "west" },
  { name: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639, population: "1.5 Cr", type: "metro", region: "east" },
  { name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2707, population: "1.1 Cr", type: "metro", region: "south" },
  { name: "Bangalore", state: "Karnataka", lat: 12.9716, lng: 77.5946, population: "1.3 Cr", type: "metro", region: "south" },
  { name: "Hyderabad", state: "Telangana", lat: 17.3850, lng: 78.4867, population: "1.0 Cr", type: "metro", region: "south" },

  // Andhra Pradesh
  { name: "Visakhapatnam", state: "Andhra Pradesh", lat: 17.6868, lng: 83.2185, population: "20 L", type: "tier1", region: "south" },
  { name: "Vijayawada", state: "Andhra Pradesh", lat: 16.5062, lng: 80.6480, population: "11 L", type: "tier1", region: "south" },
  { name: "Guntur", state: "Andhra Pradesh", lat: 16.3067, lng: 80.4365, population: "7 L", type: "tier2", region: "south" },
  { name: "Nellore", state: "Andhra Pradesh", lat: 14.4426, lng: 79.9865, population: "5 L", type: "tier2", region: "south" },
  { name: "Kurnool", state: "Andhra Pradesh", lat: 15.8281, lng: 78.0373, population: "5 L", type: "tier2", region: "south" },
  { name: "Rajahmundry", state: "Andhra Pradesh", lat: 17.0005, lng: 81.8040, population: "3 L", type: "tier3", region: "south" },
  { name: "Tirupati", state: "Andhra Pradesh", lat: 13.6288, lng: 79.4192, population: "4 L", type: "tier2", region: "south" },
  { name: "Eluru", state: "Andhra Pradesh", lat: 16.7107, lng: 81.0955, population: "2 L", type: "tier3", region: "south" },
  { name: "Anantapur", state: "Andhra Pradesh", lat: 14.6819, lng: 77.6006, population: "3 L", type: "tier3", region: "south" },
  { name: "Kadapa", state: "Andhra Pradesh", lat: 14.4673, lng: 78.8242, population: "3 L", type: "tier3", region: "south" },

  // Arunachal Pradesh
  { name: "Itanagar", state: "Arunachal Pradesh", lat: 27.0844, lng: 93.6053, population: "1 L", type: "tier3", region: "northeast" },
  { name: "Naharlagun", state: "Arunachal Pradesh", lat: 27.1026, lng: 93.6969, population: "1 L", type: "town", region: "northeast" },
  { name: "Pasighat", state: "Arunachal Pradesh", lat: 28.0669, lng: 95.3268, population: "50 K", type: "town", region: "northeast" },
  { name: "Tezpur", state: "Arunachal Pradesh", lat: 26.6341, lng: 92.7960, population: "60 K", type: "town", region: "northeast" },

  // Assam
  { name: "Guwahati", state: "Assam", lat: 26.1445, lng: 91.7362, population: "10 L", type: "tier1", region: "northeast" },
  { name: "Silchar", state: "Assam", lat: 24.8333, lng: 92.7789, population: "2 L", type: "tier3", region: "northeast" },
  { name: "Dibrugarh", state: "Assam", lat: 27.4728, lng: 94.9120, population: "2 L", type: "tier3", region: "northeast" },
  { name: "Jorhat", state: "Assam", lat: 26.7509, lng: 94.2037, population: "2 L", type: "tier3", region: "northeast" },
  { name: "Nagaon", state: "Assam", lat: 26.3444, lng: 92.6789, population: "1 L", type: "town", region: "northeast" },
  { name: "Tinsukia", state: "Assam", lat: 27.4898, lng: 95.3595, population: "1 L", type: "town", region: "northeast" },
  { name: "Bongaigaon", state: "Assam", lat: 26.4831, lng: 90.5622, population: "1 L", type: "town", region: "northeast" },

  // Bihar
  { name: "Patna", state: "Bihar", lat: 25.5941, lng: 85.1376, population: "21 L", type: "tier1", region: "east" },
  { name: "Gaya", state: "Bihar", lat: 24.7914, lng: 85.0002, population: "5 L", type: "tier2", region: "east" },
  { name: "Bhagalpur", state: "Bihar", lat: 25.2425, lng: 86.9842, population: "4 L", type: "tier2", region: "east" },
  { name: "Muzaffarpur", state: "Bihar", lat: 26.1209, lng: 85.3647, population: "4 L", type: "tier2", region: "east" },
  { name: "Darbhanga", state: "Bihar", lat: 26.1542, lng: 85.8918, population: "3 L", type: "tier3", region: "east" },
  { name: "Purnia", state: "Bihar", lat: 25.7774, lng: 87.4753, population: "3 L", type: "tier3", region: "east" },
  { name: "Chapra", state: "Bihar", lat: 25.7781, lng: 84.7278, population: "2 L", type: "tier3", region: "east" },
  { name: "Begusarai", state: "Bihar", lat: 25.4182, lng: 86.1272, population: "2 L", type: "tier3", region: "east" },
  { name: "Katihar", state: "Bihar", lat: 25.5394, lng: 87.5708, population: "2 L", type: "tier3", region: "east" },
  { name: "Munger", state: "Bihar", lat: 25.3756, lng: 86.4734, population: "2 L", type: "tier3", region: "east" },

  // Chhattisgarh
  { name: "Raipur", state: "Chhattisgarh", lat: 21.2514, lng: 81.6296, population: "10 L", type: "tier1", region: "central" },
  { name: "Bhilai", state: "Chhattisgarh", lat: 21.1938, lng: 81.3509, population: "11 L", type: "tier2", region: "central" },
  { name: "Korba", state: "Chhattisgarh", lat: 22.3595, lng: 82.7501, population: "4 L", type: "tier3", region: "central" },
  { name: "Bilaspur", state: "Chhattisgarh", lat: 22.0797, lng: 82.1391, population: "4 L", type: "tier3", region: "central" },
  { name: "Durg", state: "Chhattisgarh", lat: 21.1901, lng: 81.2849, population: "3 L", type: "tier3", region: "central" },
  { name: "Rajnandgaon", state: "Chhattisgarh", lat: 21.0974, lng: 81.0379, population: "2 L", type: "tier3", region: "central" },

  // Goa
  { name: "Panaji", state: "Goa", lat: 15.4909, lng: 73.8278, population: "1 L", type: "tier3", region: "west" },
  { name: "Margao", state: "Goa", lat: 15.2832, lng: 73.9862, population: "1 L", type: "town", region: "west" },
  { name: "Vasco da Gama", state: "Goa", lat: 15.3955, lng: 73.8154, population: "1 L", type: "town", region: "west" },
  { name: "Mapusa", state: "Goa", lat: 15.5909, lng: 73.8191, population: "50 K", type: "town", region: "west" },

  // Gujarat
  { name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714, population: "84 L", type: "tier1", region: "west" },
  { name: "Surat", state: "Gujarat", lat: 21.1702, lng: 72.8311, population: "50 L", type: "tier1", region: "west" },
  { name: "Vadodara", state: "Gujarat", lat: 22.3072, lng: 73.1812, population: "17 L", type: "tier1", region: "west" },
  { name: "Rajkot", state: "Gujarat", lat: 22.3039, lng: 70.8022, population: "13 L", type: "tier1", region: "west" },
  { name: "Bhavnagar", state: "Gujarat", lat: 21.7645, lng: 72.1519, population: "6 L", type: "tier2", region: "west" },
  { name: "Jamnagar", state: "Gujarat", lat: 22.4707, lng: 70.0577, population: "6 L", type: "tier2", region: "west" },
  { name: "Gandhinagar", state: "Gujarat", lat: 23.2156, lng: 72.6369, population: "2 L", type: "tier2", region: "west" },
  { name: "Anand", state: "Gujarat", lat: 22.5645, lng: 72.9289, population: "2 L", type: "tier3", region: "west" },
  { name: "Junagadh", state: "Gujarat", lat: 21.5222, lng: 70.4579, population: "3 L", type: "tier3", region: "west" },
  { name: "Navsari", state: "Gujarat", lat: 20.9463, lng: 72.9520, population: "2 L", type: "tier3", region: "west" },

  // Haryana
  { name: "Gurugram", state: "Haryana", lat: 28.4595, lng: 77.0266, population: "9 L", type: "tier1", region: "north" },
  { name: "Faridabad", state: "Haryana", lat: 28.4089, lng: 77.3178, population: "15 L", type: "tier1", region: "north" },
  { name: "Panipat", state: "Haryana", lat: 29.3909, lng: 76.9635, population: "5 L", type: "tier2", region: "north" },
  { name: "Ambala", state: "Haryana", lat: 30.3782, lng: 76.7767, population: "2 L", type: "tier3", region: "north" },
  { name: "Yamunanagar", state: "Haryana", lat: 30.1290, lng: 77.2674, population: "2 L", type: "tier3", region: "north" },
  { name: "Rohtak", state: "Haryana", lat: 28.8955, lng: 76.6066, population: "4 L", type: "tier3", region: "north" },
  { name: "Hisar", state: "Haryana", lat: 29.1492, lng: 75.7217, population: "3 L", type: "tier3", region: "north" },
  { name: "Karnal", state: "Haryana", lat: 29.6857, lng: 76.9905, population: "3 L", type: "tier3", region: "north" },

  // Himachal Pradesh
  { name: "Shimla", state: "Himachal Pradesh", lat: 31.1048, lng: 77.1734, population: "2 L", type: "tier3", region: "north" },
  { name: "Manali", state: "Himachal Pradesh", lat: 32.2396, lng: 77.1887, population: "1 L", type: "town", region: "north" },
  { name: "Dharamshala", state: "Himachal Pradesh", lat: 32.2190, lng: 76.3234, population: "1 L", type: "town", region: "north" },
  { name: "Kullu", state: "Himachal Pradesh", lat: 31.9578, lng: 77.1092, population: "1 L", type: "town", region: "north" },
  { name: "Solan", state: "Himachal Pradesh", lat: 30.9045, lng: 77.0967, population: "1 L", type: "town", region: "north" },
  { name: "Mandi", state: "Himachal Pradesh", lat: 31.7084, lng: 76.9319, population: "1 L", type: "town", region: "north" },

  // Jharkhand
  { name: "Ranchi", state: "Jharkhand", lat: 23.3441, lng: 85.3096, population: "11 L", type: "tier1", region: "east" },
  { name: "Jamshedpur", state: "Jharkhand", lat: 22.8046, lng: 86.2029, population: "6 L", type: "tier2", region: "east" },
  { name: "Dhanbad", state: "Jharkhand", lat: 23.7957, lng: 86.4304, population: "12 L", type: "tier2", region: "east" },
  { name: "Bokaro", state: "Jharkhand", lat: 23.6693, lng: 86.1511, population: "5 L", type: "tier3", region: "east" },
  { name: "Deoghar", state: "Jharkhand", lat: 24.4824, lng: 86.6975, population: "2 L", type: "tier3", region: "east" },
  { name: "Hazaribagh", state: "Jharkhand", lat: 23.9990, lng: 85.3616, population: "2 L", type: "tier3", region: "east" },

  // Karnataka
  { name: "Mysore", state: "Karnataka", lat: 12.2958, lng: 76.6394, population: "9 L", type: "tier2", region: "south" },
  { name: "Hubli", state: "Karnataka", lat: 15.3647, lng: 75.1240, population: "9 L", type: "tier2", region: "south" },
  { name: "Mangalore", state: "Karnataka", lat: 12.9141, lng: 74.8560, population: "5 L", type: "tier2", region: "south" },
  { name: "Belgaum", state: "Karnataka", lat: 15.8497, lng: 74.4977, population: "5 L", type: "tier2", region: "south" },
  { name: "Gulbarga", state: "Karnataka", lat: 17.3297, lng: 76.8343, population: "5 L", type: "tier3", region: "south" },
  { name: "Davangere", state: "Karnataka", lat: 14.4644, lng: 75.9217, population: "4 L", type: "tier3", region: "south" },
  { name: "Bellary", state: "Karnataka", lat: 15.1394, lng: 76.9214, population: "4 L", type: "tier3", region: "south" },
  { name: "Bijapur", state: "Karnataka", lat: 16.8302, lng: 75.7100, population: "3 L", type: "tier3", region: "south" },
  { name: "Shimoga", state: "Karnataka", lat: 13.9299, lng: 75.5681, population: "3 L", type: "tier3", region: "south" },
  { name: "Tumkur", state: "Karnataka", lat: 13.3379, lng: 77.1186, population: "3 L", type: "tier3", region: "south" },

  // Kerala
  { name: "Thiruvananthapuram", state: "Kerala", lat: 8.5241, lng: 76.9366, population: "10 L", type: "tier1", region: "south" },
  { name: "Kochi", state: "Kerala", lat: 9.9312, lng: 76.2673, population: "6 L", type: "tier1", region: "south" },
  { name: "Kozhikode", state: "Kerala", lat: 11.2588, lng: 75.7804, population: "6 L", type: "tier2", region: "south" },
  { name: "Thrissur", state: "Kerala", lat: 10.5276, lng: 76.2144, population: "3 L", type: "tier2", region: "south" },
  { name: "Kollam", state: "Kerala", lat: 8.8932, lng: 76.6141, population: "4 L", type: "tier3", region: "south" },
  { name: "Alappuzha", state: "Kerala", lat: 9.4981, lng: 76.3388, population: "2 L", type: "tier3", region: "south" },
  { name: "Palakkad", state: "Kerala", lat: 10.7867, lng: 76.6548, population: "3 L", type: "tier3", region: "south" },
  { name: "Malappuram", state: "Kerala", lat: 11.0510, lng: 76.0711, population: "2 L", type: "tier3", region: "south" },
  { name: "Kannur", state: "Kerala", lat: 11.8745, lng: 75.3704, population: "2 L", type: "tier3", region: "south" },
  { name: "Kottayam", state: "Kerala", lat: 9.5916, lng: 76.5222, population: "2 L", type: "tier3", region: "south" },

  // Madhya Pradesh
  { name: "Indore", state: "Madhya Pradesh", lat: 22.7196, lng: 75.8577, population: "23 L", type: "tier1", region: "central" },
  { name: "Bhopal", state: "Madhya Pradesh", lat: 23.2599, lng: 77.4126, population: "19 L", type: "tier1", region: "central" },
  { name: "Jabalpur", state: "Madhya Pradesh", lat: 23.1815, lng: 79.9864, population: "12 L", type: "tier1", region: "central" },
  { name: "Gwalior", state: "Madhya Pradesh", lat: 26.2183, lng: 78.1828, population: "11 L", type: "tier1", region: "central" },
  { name: "Ujjain", state: "Madhya Pradesh", lat: 23.1793, lng: 75.7849, population: "5 L", type: "tier2", region: "central" },
  { name: "Sagar", state: "Madhya Pradesh", lat: 23.8388, lng: 78.7378, population: "3 L", type: "tier3", region: "central" },
  { name: "Dewas", state: "Madhya Pradesh", lat: 22.9676, lng: 76.0534, population: "3 L", type: "tier3", region: "central" },
  { name: "Satna", state: "Madhya Pradesh", lat: 24.5735, lng: 80.8322, population: "3 L", type: "tier3", region: "central" },
  { name: "Ratlam", state: "Madhya Pradesh", lat: 23.3315, lng: 75.0367, population: "3 L", type: "tier3", region: "central" },

  // Maharashtra
  { name: "Pune", state: "Maharashtra", lat: 18.5204, lng: 73.8567, population: "82 L", type: "tier1", region: "west" },
  { name: "Nagpur", state: "Maharashtra", lat: 21.1458, lng: 79.0882, population: "25 L", type: "tier1", region: "central" },
  { name: "Nashik", state: "Maharashtra", lat: 19.9975, lng: 73.7898, population: "15 L", type: "tier1", region: "west" },
  { name: "Aurangabad", state: "Maharashtra", lat: 19.8762, lng: 75.3433, population: "12 L", type: "tier1", region: "west" },
  { name: "Solapur", state: "Maharashtra", lat: 17.6599, lng: 75.9064, population: "9 L", type: "tier2", region: "west" },
  { name: "Thane", state: "Maharashtra", lat: 19.2183, lng: 72.9781, population: "18 L", type: "tier1", region: "west" },
  { name: "Kolhapur", state: "Maharashtra", lat: 16.7050, lng: 74.2433, population: "5 L", type: "tier2", region: "west" },
  { name: "Sangli", state: "Maharashtra", lat: 16.8524, lng: 74.5815, population: "5 L", type: "tier3", region: "west" },
  { name: "Amravati", state: "Maharashtra", lat: 20.9319, lng: 77.7523, population: "6 L", type: "tier3", region: "west" },
  { name: "Nanded", state: "Maharashtra", lat: 19.1383, lng: 77.3210, population: "5 L", type: "tier3", region: "central" },

  // Manipur
  { name: "Imphal", state: "Manipur", lat: 24.8170, lng: 93.9368, population: "3 L", type: "tier2", region: "northeast" },
  { name: "Thoubal", state: "Manipur", lat: 24.6340, lng: 93.9896, population: "50 K", type: "town", region: "northeast" },
  { name: "Bishnupur", state: "Manipur", lat: 24.6467, lng: 93.7791, population: "30 K", type: "town", region: "northeast" },

  // Meghalaya
  { name: "Shillong", state: "Meghalaya", lat: 25.5788, lng: 91.8933, population: "1 L", type: "tier3", region: "northeast" },
  { name: "Tura", state: "Meghalaya", lat: 25.5138, lng: 90.2036, population: "80 K", type: "town", region: "northeast" },

  // Mizoram
  { name: "Aizawl", state: "Mizoram", lat: 23.1645, lng: 92.9376, population: "3 L", type: "tier3", region: "northeast" },
  { name: "Lunglei", state: "Mizoram", lat: 22.8879, lng: 92.7345, population: "60 K", type: "town", region: "northeast" },

  // Nagaland
  { name: "Kohima", state: "Nagaland", lat: 25.6751, lng: 94.1086, population: "1 L", type: "tier3", region: "northeast" },
  { name: "Dimapur", state: "Nagaland", lat: 25.9038, lng: 93.7267, population: "1 L", type: "tier3", region: "northeast" },

  // Odisha
  { name: "Bhubaneswar", state: "Odisha", lat: 20.2961, lng: 85.8245, population: "9 L", type: "tier1", region: "east" },
  { name: "Cuttack", state: "Odisha", lat: 20.4625, lng: 85.8828, population: "6 L", type: "tier2", region: "east" },
  { name: "Rourkela", state: "Odisha", lat: 22.2604, lng: 84.8536, population: "5 L", type: "tier2", region: "east" },
  { name: "Berhampur", state: "Odisha", lat: 19.3149, lng: 84.7941, population: "4 L", type: "tier3", region: "east" },
  { name: "Sambalpur", state: "Odisha", lat: 21.4669, lng: 83.9812, population: "3 L", type: "tier3", region: "east" },
  { name: "Puri", state: "Odisha", lat: 19.8135, lng: 85.8312, population: "2 L", type: "tier3", region: "east" },
  { name: "Balasore", state: "Odisha", lat: 21.4942, lng: 86.9336, population: "2 L", type: "tier3", region: "east" },

  // Punjab
  { name: "Ludhiana", state: "Punjab", lat: 30.9010, lng: 75.8573, population: "17 L", type: "tier1", region: "north" },
  { name: "Amritsar", state: "Punjab", lat: 31.6340, lng: 74.8723, population: "12 L", type: "tier1", region: "north" },
  { name: "Jalandhar", state: "Punjab", lat: 31.3260, lng: 75.5762, population: "9 L", type: "tier2", region: "north" },
  { name: "Patiala", state: "Punjab", lat: 30.3398, lng: 76.3869, population: "4 L", type: "tier2", region: "north" },
  { name: "Bathinda", state: "Punjab", lat: 30.2108, lng: 74.9455, population: "3 L", type: "tier3", region: "north" },
  { name: "Mohali", state: "Punjab", lat: 30.7046, lng: 76.7179, population: "2 L", type: "tier3", region: "north" },
  { name: "Firozpur", state: "Punjab", lat: 30.9318, lng: 74.6142, population: "1 L", type: "tier3", region: "north" },

  // Rajasthan
  { name: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873, population: "35 L", type: "tier1", region: "west" },
  { name: "Jodhpur", state: "Rajasthan", lat: 26.2389, lng: 73.0243, population: "11 L", type: "tier1", region: "west" },
  { name: "Kota", state: "Rajasthan", lat: 25.2138, lng: 75.8648, population: "10 L", type: "tier2", region: "west" },
  { name: "Bikaner", state: "Rajasthan", lat: 28.0229, lng: 73.3119, population: "6 L", type: "tier2", region: "west" },
  { name: "Ajmer", state: "Rajasthan", lat: 26.4499, lng: 74.6399, population: "5 L", type: "tier2", region: "west" },
  { name: "Udaipur", state: "Rajasthan", lat: 24.5854, lng: 73.7125, population: "5 L", type: "tier2", region: "west" },
  { name: "Bharatpur", state: "Rajasthan", lat: 27.2152, lng: 77.4977, population: "3 L", type: "tier3", region: "west" },
  { name: "Alwar", state: "Rajasthan", lat: 27.5530, lng: 76.6346, population: "3 L", type: "tier3", region: "west" },
  { name: "Sikar", state: "Rajasthan", lat: 27.6094, lng: 75.1399, population: "3 L", type: "tier3", region: "west" },

  // Sikkim
  { name: "Gangtok", state: "Sikkim", lat: 27.3389, lng: 88.6065, population: "1 L", type: "tier3", region: "northeast" },
  { name: "Namchi", state: "Sikkim", lat: 27.1665, lng: 88.3641, population: "20 K", type: "town", region: "northeast" },

  // Tamil Nadu
  { name: "Coimbatore", state: "Tamil Nadu", lat: 11.0168, lng: 76.9558, population: "11 L", type: "tier1", region: "south" },
  { name: "Madurai", state: "Tamil Nadu", lat: 9.9252, lng: 78.1198, population: "10 L", type: "tier1", region: "south" },
  { name: "Tiruchirappalli", state: "Tamil Nadu", lat: 10.7905, lng: 78.7047, population: "9 L", type: "tier2", region: "south" },
  { name: "Salem", state: "Tamil Nadu", lat: 11.6643, lng: 78.1460, population: "9 L", type: "tier2", region: "south" },
  { name: "Tirunelveli", state: "Tamil Nadu", lat: 8.7139, lng: 77.7567, population: "5 L", type: "tier3", region: "south" },
  { name: "Erode", state: "Tamil Nadu", lat: 11.3410, lng: 77.7172, population: "5 L", type: "tier2", region: "south" },
  { name: "Vellore", state: "Tamil Nadu", lat: 12.9165, lng: 79.1325, population: "5 L", type: "tier2", region: "south" },
  { name: "Thoothukudi", state: "Tamil Nadu", lat: 8.7642, lng: 78.1348, population: "2 L", type: "tier3", region: "south" },
  { name: "Dindigul", state: "Tamil Nadu", lat: 10.3673, lng: 77.9803, population: "2 L", type: "tier3", region: "south" },
  { name: "Thanjavur", state: "Tamil Nadu", lat: 10.7870, lng: 79.1378, population: "2 L", type: "tier3", region: "south" },

  // Telangana
  { name: "Warangal", state: "Telangana", lat: 17.9689, lng: 79.5941, population: "8 L", type: "tier2", region: "south" },
  { name: "Nizamabad", state: "Telangana", lat: 18.6725, lng: 78.0941, population: "3 L", type: "tier3", region: "south" },
  { name: "Khammam", state: "Telangana", lat: 17.2473, lng: 80.1514, population: "2 L", type: "tier3", region: "south" },
  { name: "Karimnagar", state: "Telangana", lat: 18.4386, lng: 79.1288, population: "3 L", type: "tier3", region: "south" },

  // Tripura
  { name: "Agartala", state: "Tripura", lat: 23.8315, lng: 91.2868, population: "4 L", type: "tier2", region: "northeast" },
  { name: "Dharmanagar", state: "Tripura", lat: 24.3709, lng: 92.1683, population: "60 K", type: "town", region: "northeast" },

  // Uttarakhand
  { name: "Dehradun", state: "Uttarakhand", lat: 30.3165, lng: 78.0322, population: "7 L", type: "tier2", region: "north" },
  { name: "Haridwar", state: "Uttarakhand", lat: 29.9457, lng: 78.1642, population: "2 L", type: "tier3", region: "north" },
  { name: "Rishikesh", state: "Uttarakhand", lat: 30.0869, lng: 78.2676, population: "1 L", type: "town", region: "north" },
  { name: "Nainital", state: "Uttarakhand", lat: 29.3803, lng: 79.4636, population: "1 L", type: "town", region: "north" },
  { name: "Mussoorie", state: "Uttarakhand", lat: 30.4598, lng: 78.0664, population: "1 L", type: "town", region: "north" },
  { name: "Roorkee", state: "Uttarakhand", lat: 29.8543, lng: 77.8880, population: "1 L", type: "town", region: "north" },

  // Uttar Pradesh
  { name: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lng: 80.9462, population: "32 L", type: "tier1", region: "north" },
  { name: "Kanpur", state: "Uttar Pradesh", lat: 26.4499, lng: 80.3319, population: "28 L", type: "tier1", region: "north" },
  { name: "Ghaziabad", state: "Uttar Pradesh", lat: 28.6692, lng: 77.4538, population: "17 L", type: "tier1", region: "north" },
  { name: "Agra", state: "Uttar Pradesh", lat: 27.1767, lng: 78.0081, population: "16 L", type: "tier1", region: "north" },
  { name: "Meerut", state: "Uttar Pradesh", lat: 28.9845, lng: 77.7064, population: "14 L", type: "tier1", region: "north" },
  { name: "Varanasi", state: "Uttar Pradesh", lat: 25.3176, lng: 82.9739, population: "12 L", type: "tier1", region: "north" },
  { name: "Allahabad", state: "Uttar Pradesh", lat: 25.4358, lng: 81.8463, population: "12 L", type: "tier2", region: "north" },
  { name: "Bareilly", state: "Uttar Pradesh", lat: 28.3670, lng: 79.4304, population: "9 L", type: "tier2", region: "north" },
  { name: "Aligarh", state: "Uttar Pradesh", lat: 27.8974, lng: 78.0880, population: "9 L", type: "tier2", region: "north" },
  { name: "Moradabad", state: "Uttar Pradesh", lat: 28.8386, lng: 78.7733, population: "9 L", type: "tier2", region: "north" },
  { name: "Saharanpur", state: "Uttar Pradesh", lat: 29.9680, lng: 77.5552, population: "7 L", type: "tier2", region: "north" },
  { name: "Gorakhpur", state: "Uttar Pradesh", lat: 26.7606, lng: 83.3732, population: "7 L", type: "tier2", region: "north" },
  { name: "Noida", state: "Uttar Pradesh", lat: 28.5355, lng: 77.3910, population: "6 L", type: "tier1", region: "north" },
  { name: "Firozabad", state: "Uttar Pradesh", lat: 27.1592, lng: 78.3957, population: "6 L", type: "tier2", region: "north" },
  { name: "Jhansi", state: "Uttar Pradesh", lat: 25.4484, lng: 78.5685, population: "5 L", type: "tier2", region: "north" },
  { name: "Muzaffarnagar", state: "Uttar Pradesh", lat: 29.4727, lng: 77.7085, population: "4 L", type: "tier2", region: "north" },
  { name: "Mathura", state: "Uttar Pradesh", lat: 27.4924, lng: 77.6737, population: "4 L", type: "tier2", region: "north" },
  { name: "Rampur", state: "Uttar Pradesh", lat: 28.8152, lng: 79.0266, population: "3 L", type: "tier3", region: "north" },
  { name: "Shahjahanpur", state: "Uttar Pradesh", lat: 27.8828, lng: 79.9103, population: "3 L", type: "tier3", region: "north" },
  { name: "Farrukhabad", state: "Uttar Pradesh", lat: 27.3979, lng: 79.5800, population: "3 L", type: "tier3", region: "north" },

  // West Bengal
  { name: "Siliguri", state: "West Bengal", lat: 26.7271, lng: 88.3953, population: "5 L", type: "tier2", region: "east" },
  { name: "Durgapur", state: "West Bengal", lat: 23.5204, lng: 87.3119, population: "6 L", type: "tier2", region: "east" },
  { name: "Asansol", state: "West Bengal", lat: 23.6739, lng: 86.9524, population: "12 L", type: "tier2", region: "east" },
  { name: "Howrah", state: "West Bengal", lat: 22.5958, lng: 88.2636, population: "11 L", type: "tier2", region: "east" },
  { name: "Malda", state: "West Bengal", lat: 25.0140, lng: 88.1421, population: "2 L", type: "tier3", region: "east" },
  { name: "Kharagpur", state: "West Bengal", lat: 22.3460, lng: 87.2320, population: "2 L", type: "tier3", region: "east" },
  { name: "Haldia", state: "West Bengal", lat: 22.0580, lng: 88.0601, population: "2 L", type: "tier3", region: "east" },

  // Union Territories
  { name: "Chandigarh", state: "Chandigarh", lat: 30.7333, lng: 76.7794, population: "11 L", type: "tier1", region: "north" },
  { name: "Puducherry", state: "Puducherry", lat: 11.9416, lng: 79.8083, population: "2 L", type: "tier3", region: "south" },
  { name: "Port Blair", state: "Andaman and Nicobar Islands", lat: 11.6234, lng: 92.7265, population: "1 L", type: "tier3", region: "south" },
  { name: "Leh", state: "Ladakh", lat: 34.1526, lng: 77.5771, population: "1 L", type: "town", region: "north" },
  { name: "Srinagar", state: "Jammu and Kashmir", lat: 34.0837, lng: 74.7973, population: "12 L", type: "tier1", region: "north" },
  { name: "Jammu", state: "Jammu and Kashmir", lat: 32.7266, lng: 74.8570, population: "5 L", type: "tier2", region: "north" },
  { name: "Daman", state: "Dadra and Nagar Haveli and Daman and Diu", lat: 20.4283, lng: 72.8397, population: "50 K", type: "town", region: "west" },
  { name: "Silvassa", state: "Dadra and Nagar Haveli and Daman and Diu", lat: 20.2737, lng: 73.0135, population: "1 L", type: "town", region: "west" }
];

// Generate mock AQI data for cities
export const getCityAQI = (cityName: string): number => {
  // Generate consistent mock data based on city name hash
  let hash = 0;
  for (let i = 0; i < cityName.length; i++) {
    const char = cityName.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  const city = allIndianCities.find(c => c.name === cityName);
  const baseAQI = city?.region === 'northeast' ? 50 :
                  city?.region === 'south' ? 70 :
                  city?.region === 'west' ? 110 :
                  city?.region === 'central' ? 130 :
                  city?.region === 'east' ? 140 : 180;
  
  const variation = Math.abs(hash % 60) - 30;
  return Math.max(20, Math.min(400, baseAQI + variation));
};

export const getAQIStatus = (aqi: number) => {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
};
