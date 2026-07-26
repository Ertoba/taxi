import 'package:flutter_test/flutter_test.dart';
import 'package:ride_on/core/utils/ride_lifecycle.dart';

void main() {
  group('Rider lifecycle guards', () {
    test('only an unassigned pending ride is considered searching', () {
      expect(isRideSearching(''), isTrue);
      expect(isRideSearching('pending'), isTrue);
      expect(isRideSearching('accepted'), isFalse);
      expect(isRideSearching('pick_up'), isFalse);
      expect(isRideSearching('confirmed'), isFalse);
      expect(isRideSearching('ongoing'), isFalse);
    });

    test('an assigned driver suppresses the search timeout', () {
      expect(
        canShowRideSearchTimeout(status: 'pending', selectedDriverId: '42'),
        isFalse,
      );
      expect(
        canShowRideSearchTimeout(status: 'accepted', selectedDriverId: ''),
        isFalse,
      );
      expect(
        canShowRideSearchTimeout(status: 'pending', selectedDriverId: ''),
        isTrue,
      );
    });

    test('assigned lifecycle stages show driver details', () {
      for (final status in [
        'accepted',
        'pick_up',
        'confirmed',
        'arrived',
        'ongoing',
      ]) {
        expect(hasAssignedRide(status: status, selectedDriverId: ''), isTrue);
      }
      expect(hasAssignedRide(status: 'cancelled', selectedDriverId: ''), isFalse);
    });
  });
}
