enum PaymentNavigationResult {
  continueNavigation,
  success,
  failure,
}

class PaymentNavigationGuard {
  PaymentNavigationGuard._(this._callbackOrigin);

  final Uri _callbackOrigin;

  static PaymentNavigationGuard? fromInitialUrl(String? url) {
    final uri = Uri.tryParse(url ?? '');
    if (uri == null ||
        !uri.hasScheme ||
        !uri.hasAuthority ||
        !const {'http', 'https'}.contains(uri.scheme.toLowerCase())) {
      return null;
    }

    return PaymentNavigationGuard._(uri);
  }

  PaymentNavigationResult classify(Uri? uri) {
    if (uri == null || !_hasTrustedOrigin(uri)) {
      return PaymentNavigationResult.continueNavigation;
    }

    final path = _normalizedPath(uri.path);
    if (path == '/payment_success') {
      return PaymentNavigationResult.success;
    }

    if (path == '/payment_fail' || path == '/invalid-order') {
      return PaymentNavigationResult.failure;
    }

    return PaymentNavigationResult.continueNavigation;
  }

  bool _hasTrustedOrigin(Uri uri) {
    return uri.scheme.toLowerCase() == _callbackOrigin.scheme.toLowerCase() &&
        uri.host.toLowerCase() == _callbackOrigin.host.toLowerCase() &&
        uri.port == _callbackOrigin.port;
  }

  String _normalizedPath(String path) {
    if (path.length > 1 && path.endsWith('/')) {
      return path.substring(0, path.length - 1);
    }
    return path;
  }
}
