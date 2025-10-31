import 'package:just_audio/just_audio.dart';
import '../models/glimps_data.dart';

class MediaService {
  AudioPlayer? _audioPlayer;

  Future<MediaData> getCurrentMedia() async {
    try {
      // Check if audio player has a current source
      final processingState = _audioPlayer?.processingState;
      
      if (processingState == ProcessingState.ready && _audioPlayer?.playing ?? false) {
        final position = await _audioPlayer?.position ?? Duration.zero;
        final duration = await _audioPlayer?.duration ?? Duration.zero;
        
        // Try to get metadata (this is platform-specific and may require additional setup)
        // For now, return placeholder data
        return MediaData(
          title: _audioPlayer?.audioSource?.tag?.toString() ?? 'Unknown',
          artist: '',
          album: '',
          albumArt: '',
          position: position.inSeconds,
          duration: duration.inSeconds,
          isPlaying: _audioPlayer?.playing ?? false,
          source: 'other',
        );
      }
    } catch (e) {
      // Media not playing or error
    }
    
    // Return empty media data if nothing is playing
    return MediaData(
      title: 'No media playing',
      artist: '',
      album: '',
      albumArt: '',
      position: 0,
      duration: 0,
      isPlaying: false,
      source: 'other',
    );
  }

  void dispose() {
    _audioPlayer?.dispose();
  }
}

