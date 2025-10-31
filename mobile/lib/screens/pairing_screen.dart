import 'package:flutter/material.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import 'package:provider/provider.dart';
import '../services/websocket_service.dart';

class PairingScreen extends StatefulWidget {
  const PairingScreen({super.key});

  @override
  State<PairingScreen> createState() => _PairingScreenState();
}

class _PairingScreenState extends State<PairingScreen> {
  final MobileScannerController _scannerController = MobileScannerController();

  @override
  void dispose() {
    _scannerController.dispose();
    super.dispose();
  }

  void _handleBarcode(BarcodeCapture barcodeCapture) {
    final barcode = barcodeCapture.barcodes.firstOrNull;
    if (barcode != null && barcode.rawValue != null) {
      final wsUrl = barcode.rawValue!;
      if (wsUrl.startsWith('ws://')) {
        final wsService = Provider.of<WebSocketService>(context, listen: false);
        wsService.connect(wsUrl);
        _scannerController.stop();
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF101F22),
      appBar: AppBar(
        title: const Text('Glimps'),
        backgroundColor: const Color(0xFF192F33),
      ),
      body: Column(
        children: [
          const Padding(
            padding: EdgeInsets.all(16.0),
            child: Text(
              'Scan QR code to connect',
              style: TextStyle(color: Colors.white, fontSize: 18),
            ),
          ),
          Expanded(
            child: MobileScanner(
              controller: _scannerController,
              onDetect: _handleBarcode,
            ),
          ),
        ],
      ),
    );
  }
}

