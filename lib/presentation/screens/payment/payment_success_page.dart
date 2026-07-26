import 'dart:async';

import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';
import 'package:provider/provider.dart';
import 'package:ride_on/core/utils/translate.dart';

import '../../../core/utils/common_widget.dart';
import '../../../core/utils/theme/project_color.dart';
import '../../../core/utils/theme/theme_style.dart';
import '../../cubits/realtime/update_ride_request_parameter.dart';

class BookingSuccessScreen extends StatefulWidget {
  final String rideId;
  const BookingSuccessScreen({super.key, required this.rideId});

  @override
  State<BookingSuccessScreen> createState() => _BookingSuccessScreenState();
}

class _BookingSuccessScreenState extends State<BookingSuccessScreen> {
  int time = 2;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    startTimer();
  }

  void startTimer() {
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) async {
      if (time > 0) {
        if (!mounted) return;
        setState(() {
          time--;
        });
      } else {
        timer.cancel();
        try {
          await context
              .read<UpdateRideRequestParameterCubit>()
              .updatePaymentStatus(
                rideId: widget.rideId,
                paymentStatus: 'collected',
              );
        } finally {
          if (mounted) {
            goBack();
          }
        }
      }
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: notifires.getbgcolor,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Lottie.asset("assets/json/success.json", height: 300),
            Text(
              "Payment Successful".translate(context),
              style: heading1Grey1(context)
                  .copyWith(color: notifires.getGrey2whiteColor),
            ),
            Text(
              "${"You will redirected automatically in".translate(context)} $time ${"sec"}"
                  .translate(context),
              style: regular2(context),
            ),
          ],
        ),
      ),
    );
  }
}
