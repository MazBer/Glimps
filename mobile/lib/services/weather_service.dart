import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:geolocator/geolocator.dart';
import '../models/glimps_data.dart';

class WeatherService {
  static const String _baseUrl = 'https://api.open-meteo.com/v1/forecast';

  Future<WeatherData> getCurrentWeather() async {
    try {
      // Get device location
      Position? position;
      try {
        position = await Geolocator.getCurrentPosition(
          desiredAccuracy: LocationAccuracy.low,
        );
      } catch (e) {
        // Location permission not granted or unavailable
        // Use default location (San Francisco)
        position = null;
      }

      final latitude = position?.latitude ?? 37.7749;
      final longitude = position?.longitude ?? -122.4194;

      // Fetch weather from Open-Meteo (free, no API key)
      final url = Uri.parse(
        '$_baseUrl?latitude=$latitude&longitude=$longitude&current=temperature_2m,weather_code&temperature_unit=celsius'
      );

      final response = await http.get(url);
      
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final current = data['current'];
        
        final tempC = current['temperature_2m']?.toDouble() ?? 20.0;
        final tempF = (tempC * 9/5) + 32;
        final weatherCode = current['weather_code'] ?? 0;
        
        // Map weather code to condition string
        final condition = _getWeatherCondition(weatherCode);
        final location = position != null 
          ? 'Lat: ${latitude.toStringAsFixed(2)}, Lon: ${longitude.toStringAsFixed(2)}'
          : 'San Francisco, CA';

        return WeatherData(
          tempC: tempC,
          tempF: tempF,
          condition: condition,
          location: location,
          icon: _getWeatherIcon(condition),
          lastUpdated: DateTime.now().millisecondsSinceEpoch,
        );
      }
    } catch (e) {
      // Error fetching weather
    }
    
    // Fallback weather data
    return WeatherData(
      tempC: 20.0,
      tempF: 68.0,
      condition: 'Unknown',
      location: 'Unknown',
      icon: 'wb_cloudy',
      lastUpdated: DateTime.now().millisecondsSinceEpoch,
    );
  }

  String _getWeatherCondition(int code) {
    // WMO Weather interpretation codes
    if (code == 0) return 'Clear sky';
    if (code <= 3) return 'Cloudy';
    if (code <= 49) return 'Foggy';
    if (code <= 59) return 'Drizzle';
    if (code <= 69) return 'Rainy';
    if (code <= 79) return 'Snow';
    if (code <= 84) return 'Rain showers';
    if (code <= 86) return 'Snow showers';
    if (code <= 99) return 'Thunderstorm';
    return 'Unknown';
  }

  String _getWeatherIcon(String condition) {
    final lower = condition.toLowerCase();
    if (lower.contains('clear') || lower.contains('sun')) return 'sunny';
    if (lower.contains('cloud')) return 'cloud';
    if (lower.contains('rain')) return 'rainy';
    if (lower.contains('snow')) return 'ac_unit';
    if (lower.contains('storm')) return 'thunderstorm';
    return 'wb_cloudy';
  }
}

