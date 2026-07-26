String normalizeRideStatus(String? status) {
  return (status ?? '').trim().toLowerCase();
}

bool isRideSearching(String? status) {
  final normalized = normalizeRideStatus(status);
  return normalized.isEmpty || normalized == 'pending';
}

bool hasAssignedRide({
  required String? status,
  required String? selectedDriverId,
}) {
  if ((selectedDriverId ?? '').trim().isNotEmpty) return true;

  return const {
    'accepted',
    'pick_up',
    'confirmed',
    'arrived',
    'ongoing',
    'complete',
    'completed',
  }.contains(normalizeRideStatus(status));
}

bool canShowRideSearchTimeout({
  required String? status,
  required String? selectedDriverId,
}) {
  return isRideSearching(status) && (selectedDriverId ?? '').trim().isEmpty;
}
