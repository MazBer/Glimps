import 'package:battery_plus/battery_plus.dart';
import '../models/glimps_data.dart';

class BatteryService {
  final Battery _battery = Battery();

  Future<BatteryData> getPhoneBattery() async {
    try {
      final batteryLevel = await _battery.batteryLevel;
      final batteryState = await _battery.batteryState;
      
      return BatteryData(
        level: batteryLevel,
        isCharging: batteryState == BatteryState.charging,
      );
    } catch (e) {
      // Fallback if battery API fails
      return BatteryData(level: 0, isCharging: false);
    }
  }
}

