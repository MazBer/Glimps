import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/websocket_service.dart';

class ConnectedScreen extends StatelessWidget {
  const ConnectedScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final wsService = Provider.of<WebSocketService>(context);

    return Scaffold(
      backgroundColor: const Color(0xFF101F22),
      appBar: AppBar(
        title: const Text('Glimps - Connected'),
        backgroundColor: const Color(0xFF192F33),
        actions: [
          IconButton(
            icon: const Icon(Icons.check_circle, color: Color(0xFF13C8EC)),
            onPressed: null,
          ),
        ],
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(
              Icons.check_circle,
              color: Color(0xFF13C8EC),
              size: 64,
            ),
            const SizedBox(height: 16),
            const Text(
              'Connected to PC',
              style: TextStyle(color: Colors.white, fontSize: 24),
            ),
            const SizedBox(height: 8),
            const Text(
              'Sending data every second',
              style: TextStyle(color: Colors.white70, fontSize: 16),
            ),
            const SizedBox(height: 32),
            ElevatedButton(
              onPressed: () {
                wsService.disconnect();
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.red,
              ),
              child: const Text('Disconnect'),
            ),
          ],
        ),
      ),
    );
  }
}

