import 'package:flutter_test/flutter_test.dart';
import 'package:ride_on/presentation/cubits/location/user_current_location_cubit.dart';

void main() {
  test('map selection preserves the exact selected coordinates', () async {
    final cubit = GetCordinatesCubit();

    await cubit.getCoordinates(
      address: 'თავისუფლების ქუჩა, ნინოწმინდა',
      latitude: 41.2643,
      longitude: 43.5916,
    );

    final state = cubit.state as GetCordinatesSuccess;
    expect(state.lattiude, '41.2643000');
    expect(state.longitude, '43.5916000');
    expect(state.address, 'თავისუფლების ქუჩა, ნინოწმინდა');

    await cubit.close();
  });

  test(
    'invalid map coordinates fail instead of being geocoded by text',
    () async {
      final cubit = GetCordinatesCubit();

      await cubit.getCoordinates(
        address: 'Tavisupleba Street',
        latitude: 100,
        longitude: 43.5916,
      );

      expect(cubit.state, isA<GetCordinatesFailure>());
      await cubit.close();
    },
  );
}
