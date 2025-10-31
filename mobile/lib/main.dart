import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'services/websocket_service.dart';
import 'screens/pairing_screen.dart';
import 'screens/connected_screen.dart';

void main() {
  runApp(const GlimpsApp());
}

class GlimpsApp extends StatelessWidget {
  const GlimpsApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => WebSocketService(),
      child: MaterialApp(
        title: 'Glimps',
        theme: ThemeData(
          useMaterial3: true,
          colorScheme: ColorScheme.dark(
            primary: const Color(0xFF13C8EC),
            background: const Color(0xFF101F22),
            surface: const Color(0xFF192F33),
          ),
        ),
        home: const MainScreen(),
      ),
    );
  }
}

class MainScreen extends StatelessWidget {
  const MainScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<WebSocketService>(
      builder: (context, wsService, _) {
        if (wsService.isConnected) {
          return const ConnectedScreen();
        }
        return const PairingScreen();
      },
    );
  }
}

