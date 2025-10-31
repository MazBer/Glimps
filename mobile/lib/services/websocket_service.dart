import 'dart:async';
import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:web_socket_channel/web_socket_channel.dart';
import '../models/glimps_data.dart';
import 'clock_service.dart';
import 'battery_service.dart';
import 'media_service.dart';
import 'weather_service.dart';

class WebSocketService extends ChangeNotifier {
  WebSocketChannel? _channel;
  bool _isConnected = false;
  Timer? _dataTimer;
  final DataCollectionService _dataService = DataCollectionService();

  bool get isConnected => _isConnected;

  Future<void> connect(String wsUrl) async {
    try {
      _channel = WebSocketChannel.connect(Uri.parse(wsUrl));
      
      // Send hello message
      _channel!.sink.add(jsonEncode({
        'type': 'hello',
        'role': 'phone',
      }));

      // Listen for acknowledgment
      _channel!.stream.listen(
        (message) {
          final data = jsonDecode(message);
          if (data['type'] == 'ack' && data['role'] == 'phone') {
            _isConnected = true;
            notifyListeners();
            _startSendingData();
          }
        },
        onError: (error) {
          _isConnected = false;
          notifyListeners();
        },
        onDone: () {
          _isConnected = false;
          notifyListeners();
        },
      );
    } catch (e) {
      debugPrint('WebSocket connection error: $e');
      _isConnected = false;
      notifyListeners();
    }
  }

  void _startSendingData() {
    // Send data every 1 second
    _dataTimer?.cancel();
    _dataTimer = Timer.periodic(const Duration(seconds: 1), (_) async {
      if (_isConnected && _channel != null) {
        try {
          final data = await _dataService.collectAllData();
          _channel!.sink.add(jsonEncode({
            'type': 'data',
            'payload': data.toJson(),
          }));
        } catch (e) {
          debugPrint('Error collecting/sending data: $e');
        }
      }
    });
  }

  void disconnect() {
    _dataTimer?.cancel();
    _channel?.sink.close();
    _channel = null;
    _isConnected = false;
    notifyListeners();
  }

  @override
  void dispose() {
    disconnect();
    super.dispose();
  }
}

class DataCollectionService {
  final ClockService _clockService = ClockService();
  final BatteryService _batteryService = BatteryService();
  final MediaService _mediaService = MediaService();
  final WeatherService _weatherService = WeatherService();
  
  // Cache weather to avoid too frequent API calls
  WeatherData? _cachedWeather;
  DateTime? _weatherCacheTime;
  static const _weatherCacheDuration = Duration(minutes: 10);

  Future<GlimpsData> collectAllData() async {
    // Collect all data in parallel
    final clock = _clockService.getCurrentClock();
    final phoneBattery = await _batteryService.getPhoneBattery();
    final media = await _mediaService.getCurrentMedia();
    
    // Use cached weather if available and fresh
    WeatherData weather;
    if (_cachedWeather != null && 
        _weatherCacheTime != null &&
        DateTime.now().difference(_weatherCacheTime!) < _weatherCacheDuration) {
      weather = _cachedWeather!;
    } else {
      weather = await _weatherService.getCurrentWeather();
      _cachedWeather = weather;
      _weatherCacheTime = DateTime.now();
    }
    
    return GlimpsData(
      clock: clock,
      media: media,
      phoneBattery: phoneBattery,
      pcBattery: null, // PC battery not available on mobile
      weather: weather,
    );
  }
}

