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
  bool _isProcessing = false;
  String? _lastScannedUrl;

  @override
  void dispose() {
    _scannerController.dispose();
    super.dispose();
  }

  void _handleBarcode(BarcodeCapture barcodeCapture) {
    // Prevent multiple rapid scans of the same code
    if (_isProcessing) return;
    
    if (barcodeCapture.barcodes.isEmpty) return;
    final barcode = barcodeCapture.barcodes.first;
    
    if (barcode.rawValue != null) {
      final wsUrl = barcode.rawValue!;
      
      // Ignore if we just scanned the same URL
      if (_lastScannedUrl == wsUrl) return;
      
      if (wsUrl.startsWith('ws://')) {
        setState(() {
          _isProcessing = true;
          _lastScannedUrl = wsUrl;
        });
        
        final wsService = Provider.of<WebSocketService>(context, listen: false);
        _scannerController.stop();
        
        // Start connection (async, but don't await to allow UI update)
        wsService.connect(wsUrl);
        
        // Reset processing state after a short delay
        // The WebSocketService will notify listeners when connection state changes
        Future.delayed(const Duration(seconds: 2), () {
          if (mounted && !wsService.isConnected) {
            setState(() {
              _isProcessing = false;
              _lastScannedUrl = null;
            });
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(
                content: Text('Connection timeout. Please try scanning again.'),
                backgroundColor: Colors.red,
                duration: Duration(seconds: 3),
              ),
            );
          }
        });
      } else {
        // Not a valid WebSocket URL
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Invalid QR code. Please scan the Glimps QR code.'),
            backgroundColor: Colors.orange,
            duration: Duration(seconds: 2),
          ),
        );
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
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              children: [
                const Text(
                  'Scan QR code to connect',
                  style: TextStyle(color: Colors.white, fontSize: 18),
                ),
                if (_isProcessing)
                  const Padding(
                    padding: EdgeInsets.only(top: 8.0),
                    child: CircularProgressIndicator(
                      valueColor: AlwaysStoppedAnimation<Color>(Color(0xFF13C8EC)),
                    ),
                  ),
              ],
            ),
          ),
          Expanded(
            child: Stack(
              children: [
                MobileScanner(
                  controller: _scannerController,
                  onDetect: _handleBarcode,
                ),
                if (_isProcessing)
                  Container(
                    color: Colors.black54,
                    child: const Center(
                      child: Text(
                        'Connecting...',
                        style: TextStyle(color: Colors.white, fontSize: 18),
                      ),
                    ),
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

