import 'package:just_audio/just_audio.dart';
import '../models/glimps_data.dart';

class MediaService {
  AudioPlayer? _audioPlayer;

  Future<MediaData> getCurrentMedia() async {
    try {
      // Check if audio player has a current source
      if (_audioPlayer != null) {
        final processingState = _audioPlayer!.processingState;
        final isPlaying = _audioPlayer!.playing;
        
        if (processingState == ProcessingState.ready && isPlaying) {
          final position = await _audioPlayer!.position ?? Duration.zero;
          final duration = await _audioPlayer!.duration ?? Duration.zero;
          
          // Basic media detection - for full metadata, would need platform-specific APIs
          return MediaData(
            title: 'Playing',
            artist: '',
            album: '',
            albumArt: '',
            position: position.inSeconds,
            duration: duration.inSeconds,
            isPlaying: isPlaying,
            source: 'other',
          );
        }
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

