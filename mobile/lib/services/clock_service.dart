import '../models/glimps_data.dart';

class ClockService {
  ClockData getCurrentClock() {
    final now = DateTime.now();
    final timeFormat = '24h'; // Can be made configurable later
    
    String time;
    if (timeFormat == '12h') {
      final hour = now.hour % 12 == 0 ? 12 : now.hour % 12;
      final minute = now.minute.toString().padLeft(2, '0');
      final period = now.hour < 12 ? 'AM' : 'PM';
      time = '$hour:$minute $period';
    } else {
      time = '${now.hour.toString().padLeft(2, '0')}:${now.minute.toString().padLeft(2, '0')}';
    }

    final weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    final months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    
    final date = '${weekdays[now.weekday - 1]}, ${months[now.month - 1]} ${now.day}, ${now.year}';
    
    return ClockData(
      time: time,
      date: date,
      format: timeFormat,
      timezone: now.timeZoneName,
    );
  }
}

