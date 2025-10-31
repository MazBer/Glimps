class ClockData {
  final String time;
  final String date;
  final String format; // '12h' or '24h'
  final String timezone;

  ClockData({
    required this.time,
    required this.date,
    required this.format,
    required this.timezone,
  });

  Map<String, dynamic> toJson() => {
        'time': time,
        'date': date,
        'format': format,
        'timezone': timezone,
      };
}

class MediaData {
  final String title;
  final String artist;
  final String album;
  final String albumArt;
  final int position; // seconds
  final int duration; // seconds
  final bool isPlaying;
  final String source; // 'spotify', 'apple', 'youtube', 'other'

  MediaData({
    required this.title,
    required this.artist,
    required this.album,
    required this.albumArt,
    required this.position,
    required this.duration,
    required this.isPlaying,
    required this.source,
  });

  Map<String, dynamic> toJson() => {
        'title': title,
        'artist': artist,
        'album': album,
        'albumArt': albumArt,
        'position': position,
        'duration': duration,
        'isPlaying': isPlaying,
        'source': source,
      };
}

class BatteryData {
  final int level; // 0-100
  final bool isCharging;

  BatteryData({
    required this.level,
    required this.isCharging,
  });

  Map<String, dynamic> toJson() => {
        'level': level,
        'isCharging': isCharging,
      };
}

class WeatherData {
  final double tempC;
  final double tempF;
  final String condition;
  final String location;
  final String icon;
  final int lastUpdated; // timestamp

  WeatherData({
    required this.tempC,
    required this.tempF,
    required this.condition,
    required this.location,
    required this.icon,
    required this.lastUpdated,
  });

  Map<String, dynamic> toJson() => {
        'tempC': tempC,
        'tempF': tempF,
        'condition': condition,
        'location': location,
        'icon': icon,
        'lastUpdated': lastUpdated,
      };
}

class GlimpsData {
  final ClockData clock;
  final MediaData media;
  final BatteryData phoneBattery;
  final BatteryData? pcBattery;
  final WeatherData weather;

  GlimpsData({
    required this.clock,
    required this.media,
    required this.phoneBattery,
    this.pcBattery,
    required this.weather,
  });

  Map<String, dynamic> toJson() => {
        'clock': clock.toJson(),
        'media': media.toJson(),
        'battery': {
          'phone': phoneBattery.toJson(),
          'pc': pcBattery?.toJson(),
        },
        'weather': weather.toJson(),
      };
}

