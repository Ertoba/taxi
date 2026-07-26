import 'package:flutter_test/flutter_test.dart';
import 'package:ride_on/core/utils/payment_navigation.dart';

void main() {
  group('PaymentNavigationGuard', () {
    final guard = PaymentNavigationGuard.fromInitialUrl(
      'https://taxi-admin.mili.ge/payment_methods?booking=42',
    )!;

    test('accepts only the exact trusted success callback', () {
      expect(
        guard.classify(
          Uri.parse(
            'https://taxi-admin.mili.ge/payment_success?bookingId=42',
          ),
        ),
        PaymentNavigationResult.success,
      );
    });

    test('does not trust a foreign success callback', () {
      expect(
        guard.classify(Uri.parse('https://example.com/payment_success')),
        PaymentNavigationResult.continueNavigation,
      );
    });

    test('does not trust payment_success text outside the callback path', () {
      expect(
        guard.classify(
          Uri.parse(
            'https://taxi-admin.mili.ge/gateway?next=payment_success',
          ),
        ),
        PaymentNavigationResult.continueNavigation,
      );
    });

    test('recognizes trusted failure and invalid order callbacks', () {
      expect(
        guard.classify(
          Uri.parse('https://taxi-admin.mili.ge/payment_fail?bookingId=42'),
        ),
        PaymentNavigationResult.failure,
      );
      expect(
        guard.classify(
          Uri.parse('https://taxi-admin.mili.ge/invalid-order/'),
        ),
        PaymentNavigationResult.failure,
      );
    });

    test('rejects malformed initial URLs', () {
      expect(PaymentNavigationGuard.fromInitialUrl(null), isNull);
      expect(PaymentNavigationGuard.fromInitialUrl('not-a-url'), isNull);
      expect(PaymentNavigationGuard.fromInitialUrl('file:///tmp/pay'), isNull);
    });
  });
}
