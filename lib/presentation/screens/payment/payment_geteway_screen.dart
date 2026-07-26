import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:ride_on/core/utils/payment_navigation.dart';
import 'package:ride_on/core/utils/translate.dart';
import 'package:ride_on/presentation/screens/payment/payment_success_page.dart';

import '../../../core/utils/theme/project_color.dart';

class PaymentsScreen extends StatefulWidget {
  final String? url;
  final String? rideId;

  const PaymentsScreen({super.key, this.url, this.rideId});

  @override
  State<PaymentsScreen> createState() => _PaymentsScreenState();
}

class _PaymentsScreenState extends State<PaymentsScreen> {
  bool _isLoading = true;
  bool _isTerminalNavigation = false;
  String? _errorMessage;
  InAppWebViewController? _webViewController;
  PaymentNavigationGuard? _navigationGuard;

  @override
  void initState() {
    super.initState();
    _navigationGuard = PaymentNavigationGuard.fromInitialUrl(widget.url);
    if (_navigationGuard == null) {
      _isLoading = false;
      _errorMessage = 'Unable to open the payment page';
    }
    if (Platform.isAndroid) {
      InAppWebViewController.setWebContentsDebuggingEnabled(true);
    }
  }

  void _closePaymentPage() {
    if (mounted && Navigator.of(context).canPop()) {
      Navigator.of(context).pop(false);
    }
  }

  void _setLoading(bool value) {
    if (!mounted || _isTerminalNavigation) return;
    setState(() {
      _isLoading = value;
      if (value) {
        _errorMessage = null;
      }
    });
  }

  void _showPaymentError([String? message]) {
    if (!mounted || _isTerminalNavigation) return;
    setState(() {
      _isLoading = false;
      _errorMessage = message ?? 'Unable to load the payment page';
    });
  }

  Future<void> _retryPayment() async {
    final controller = _webViewController;
    final url = widget.url;
    if (controller == null || url == null || _navigationGuard == null) {
      _showPaymentError('Unable to open the payment page');
      return;
    }

    _setLoading(true);
    await controller.loadUrl(urlRequest: URLRequest(url: WebUri(url)));
  }

  Future<void> _handleCompletedNavigation(WebUri? url) async {
    if (_isTerminalNavigation) return;

    final result = _navigationGuard?.classify(
      Uri.tryParse(url?.toString() ?? ''),
    );
    if (result == PaymentNavigationResult.failure) {
      _showPaymentError('Payment was not completed');
      return;
    }

    if (result != PaymentNavigationResult.success || !mounted) {
      return;
    }

    _isTerminalNavigation = true;
    await Navigator.of(context).pushReplacement(
      MaterialPageRoute(
        builder: (context) => BookingSuccessScreen(rideId: widget.rideId ?? ''),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: true,
      onPopInvokedWithResult: (didPop, result) {
        if (!didPop) {
          _closePaymentPage();
        }
      },
      child: Scaffold(
        backgroundColor: whiteColor,
        appBar: AppBar(
          backgroundColor: Colors.white,
          elevation: 0,
          centerTitle: true,
          leading: IconButton(
            icon: const Icon(Icons.arrow_back),
            onPressed: _closePaymentPage,
          ),
          title: const Text(''),
        ),
        body: _navigationGuard == null
            ? _PaymentErrorView(
                message: _errorMessage ?? 'Unable to open the payment page',
                onRetry: _retryPayment,
                onBack: _closePaymentPage,
              )
            : Stack(
                children: [
                  InAppWebView(
                    initialUrlRequest: URLRequest(url: WebUri(widget.url!)),
                    initialSettings: InAppWebViewSettings(
                      transparentBackground: true,
                      javaScriptEnabled: true,
                      mediaPlaybackRequiresUserGesture: false,
                      useShouldOverrideUrlLoading: true,
                    ),
                    onWebViewCreated: (controller) {
                      _webViewController = controller;
                    },
                    onLoadStart: (controller, url) {
                      _setLoading(true);
                    },
                    onLoadStop: (controller, url) async {
                      _setLoading(false);
                      await _handleCompletedNavigation(url);
                    },
                    onReceivedHttpError: (controller, request, response) {
                      final statusCode = response.statusCode;
                      if (request.isForMainFrame == true &&
                          statusCode != null &&
                          statusCode >= 400) {
                        _showPaymentError('Payment page error ($statusCode)');
                      }
                    },
                    onReceivedError: (controller, request, error) {
                      if (request.isForMainFrame == true) {
                        _showPaymentError('Unable to load the payment page');
                      }
                    },
                    onCloseWindow: (controller) {
                      _closePaymentPage();
                    },
                    shouldOverrideUrlLoading:
                        (controller, navigationAction) async {
                          final uri = navigationAction.request.url;
                          if (uri != null &&
                              uri.toString().startsWith(
                                'https://www.youtube.com/',
                              )) {
                            return NavigationActionPolicy.CANCEL;
                          }
                          return NavigationActionPolicy.ALLOW;
                        },
                  ),
                  if (_errorMessage != null)
                    Positioned.fill(
                      child: _PaymentErrorView(
                        message: _errorMessage!,
                        onRetry: _retryPayment,
                        onBack: _closePaymentPage,
                      ),
                    )
                  else if (_isLoading)
                    const Center(child: CircularProgressIndicator()),
                ],
              ),
      ),
    );
  }
}

class _PaymentErrorView extends StatelessWidget {
  const _PaymentErrorView({
    required this.message,
    required this.onRetry,
    required this.onBack,
  });

  final String message;
  final VoidCallback onRetry;
  final VoidCallback onBack;

  @override
  Widget build(BuildContext context) {
    return ColoredBox(
      color: whiteColor,
      child: Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(Icons.error_outline, color: Colors.red, size: 56),
              const SizedBox(height: 16),
              Text(
                message.translate(context),
                textAlign: TextAlign.center,
                style: Theme.of(context).textTheme.titleMedium,
              ),
              const SizedBox(height: 24),
              FilledButton(
                onPressed: onRetry,
                child: Text('Retry'.translate(context)),
              ),
              TextButton(
                onPressed: onBack,
                child: Text('Go Back'.translate(context)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
