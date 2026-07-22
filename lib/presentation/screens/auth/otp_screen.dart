import 'dart:async';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:ride_on/app/route_settings.dart';
import 'package:ride_on/core/utils/translate.dart';

import '../../../core/extensions/workspace.dart';
import '../../../core/utils/common_widget.dart';
import '../../../core/utils/theme/project_color.dart';
import '../../../core/utils/theme/theme_style.dart';
import '../../cubits/auth/otp_verify_cubit.dart';
import '../../cubits/auth/resend_otp_cubit.dart';
import '../../cubits/auth/user_authenticate_cubit.dart';
import '../home/item_home_screen.dart';

class OtpScreen extends StatefulWidget {
  final String? number;
  final String? countryCode;
  final String? otpValue;
  final String? email;
  final bool? changeMobile;
  final bool? changeEmail;
  final String? defaultCountry;
  final String? routeString;
  final bool? loginWithSocialMedia;

  const OtpScreen({
    super.key,
    this.number,
    this.routeString,
    this.countryCode,
    this.otpValue,
    this.email,
    this.changeMobile,
    this.changeEmail,
    this.defaultCountry,
    this.loginWithSocialMedia,
  });

  @override
  State<OtpScreen> createState() => _OtpScreenState();
}

class _OtpScreenState extends State<OtpScreen> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController textEditingOtpController =
      TextEditingController();
  final FocusNode _otpFocusNode = FocusNode();

  int _remainingTime = 15;
  bool _isResendEnabled = true;
  bool _showIosKeyboardToolbar = false;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    textEditingOtpController.text = widget.otpValue ?? '';
    _otpFocusNode.addListener(_handleOtpFocusChange);
    startResendTimer();
  }

  @override
  void dispose() {
    _timer?.cancel();
    _otpFocusNode.removeListener(_handleOtpFocusChange);
    _otpFocusNode.dispose();
    textEditingOtpController.dispose();
    super.dispose();
  }

  void _handleOtpFocusChange() {
    if (!mounted || !Platform.isIOS) return;
    setState(() => _showIosKeyboardToolbar = _otpFocusNode.hasFocus);
  }

  void _dismissKeyboard() {
    _otpFocusNode.unfocus();
    FocusManager.instance.primaryFocus?.unfocus();
    if (mounted && _showIosKeyboardToolbar) {
      setState(() => _showIosKeyboardToolbar = false);
    }
  }

  Widget _buildIosKeyboardToolbar() {
    return Material(
      elevation: 8,
      color: const Color(0xFFF2F2F7),
      child: SafeArea(
        top: false,
        child: SizedBox(
          height: 44,
          child: Align(
            alignment: Alignment.centerRight,
            child: TextButton(
              onPressed: _dismissKeyboard,
              child: Text(
                'Done'.translate(context),
                style: const TextStyle(
                  fontSize: 17,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  void startResendTimer() {
    _timer?.cancel();
    setState(() => _isResendEnabled = false);

    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (!mounted) return;
      setState(() {
        if (_remainingTime > 0) {
          _remainingTime--;
        } else {
          timer.cancel();
          _isResendEnabled = true;
          _remainingTime = 0;
        }
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    final showToolbar = Platform.isIOS && _showIosKeyboardToolbar;

    return Align(
      alignment: Alignment.center,
      child: SizedBox(
        width: Dimensions.containerWidth,
        child: PopScope(
          canPop: false,
          child: Scaffold(
            resizeToAvoidBottomInset: true,
            backgroundColor: notifires.getbgcolor,
            bottomSheet: showToolbar ? _buildIosKeyboardToolbar() : null,
            body: MultiBlocListener(
              listeners: [
                BlocListener<AuthUserAuthenticateCubit,
                    AuthUserAuthenticateState>(
                  listener: (context, state) {
                    if (state is UserLoading) {
                      Widgets.showLoader(context);
                    } else if (state is UserSucesss) {
                      Widgets.hideLoder(context);
                      goToWithClear(const ItemHomeScreen());
                    } else if (state is UserFailure) {
                      Widgets.hideLoder(context);
                      if (state.error.isNotEmpty) {
                        showErrorToastMessage(state.error);
                      }
                    }
                  },
                ),
                BlocListener<AuthOtpVerifyCubit, OtpVerifyState>(
                  listener: (context, state) {
                    if (state is OtpLoading) {
                      Widgets.showLoader(context);
                    } else if (state is OtpSuccess) {
                      Widgets.hideLoder(context);
                      goToWithClear(const ItemHomeScreen());
                    } else if (state is OtpFailure) {
                      Widgets.hideLoder(context);
                      if (state.error.isNotEmpty) {
                        showErrorToastMessage(state.error);
                      }
                    }
                  },
                ),
                BlocListener<AuthResendOtpCubit, ResendOtpState>(
                  listener: (context, state) {
                    if (state is ResendOtpLoading) {
                      Widgets.showLoader(context);
                    } else if (state is ResendOtpSuccess) {
                      Widgets.hideLoder(context);
                      final otp = state.otpValue ?? '';
                      if (otp.isNotEmpty) {
                        textEditingOtpController.text = otp;
                      }
                    } else if (state is ResendOtpFailure) {
                      Widgets.hideLoder(context);
                      showErrorToastMessage(state.error);
                    }
                  },
                ),
              ],
              child: Stack(
                children: [
                  Positioned(
                    right: 0,
                    top: 0,
                    child: SvgPicture.asset('assets/images/vector_top.svg'),
                  ),
                  Positioned(
                    bottom: -20,
                    left: 0,
                    child: IgnorePointer(
                      child: SvgPicture.asset(
                        'assets/images/vector_bottom.svg',
                      ),
                    ),
                  ),
                  Positioned.fill(
                    child: SingleChildScrollView(
                      keyboardDismissBehavior:
                          ScrollViewKeyboardDismissBehavior.onDrag,
                      child: Padding(
                        padding: const EdgeInsets.symmetric(
                          horizontal: Dimensions.paddingSizeLarge,
                          vertical: Dimensions.paddingSizeExtraLarge,
                        ),
                        child: Form(
                          key: _formKey,
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              const SizedBox(height: 130),
                              SizedBox(
                                height: 160,
                                child: Image.asset(
                                  'assets/images/verification.png',
                                ),
                              ),
                              const SizedBox(height: 20),
                              Text(
                                'Verification'.translate(context),
                                style: heading1(context),
                              ),
                              const SizedBox(height: 10),
                              Text(
                                'Verification code was sent to your Phone number'
                                    .translate(context),
                                style: regular(context),
                                textAlign: TextAlign.center,
                              ),
                              const SizedBox(height: 10),
                              Text(
                                '${widget.countryCode ?? ''} ${widget.number ?? ''}',
                                style: regular3(context).copyWith(
                                  fontWeight: FontWeight.w100,
                                ),
                              ),
                              const SizedBox(height: 20),
                              TextFormField(
                                focusNode: _otpFocusNode,
                                onTap: () {
                                  if (Platform.isIOS &&
                                      !_showIosKeyboardToolbar) {
                                    setState(() =>
                                        _showIosKeyboardToolbar = true);
                                  }
                                },
                                onTapOutside: (_) => _dismissKeyboard(),
                                onChanged: (value) {
                                  if (value.length == 6) {
                                    _dismissKeyboard();
                                  }
                                },
                                style: regular3(context).copyWith(
                                  fontSize: 20,
                                  color: notifires.getGrey2whiteColor,
                                ),
                                controller: textEditingOtpController,
                                textAlign: TextAlign.center,
                                keyboardType: TextInputType.number,
                                textInputAction: TextInputAction.done,
                                onFieldSubmitted: (_) => _dismissKeyboard(),
                                inputFormatters: [
                                  FilteringTextInputFormatter.digitsOnly,
                                  LengthLimitingTextInputFormatter(6),
                                ],
                                validator: (value) {
                                  if ((value ?? '').length != 6) {
                                    return 'Enter a valid 6-digit OTP'
                                        .translate(context);
                                  }
                                  return null;
                                },
                                decoration: InputDecoration(
                                  counterText: '',
                                  filled: true,
                                  fillColor: notifires.getBoxColor,
                                  hintText: 'Enter OTP'.translate(context),
                                  hintStyle: regular(context),
                                  errorBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(
                                      Dimensions.radiusDefault,
                                    ),
                                    borderSide: BorderSide(
                                      color: notifires.getGrey6whiteColor,
                                    ),
                                  ),
                                  focusedErrorBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(
                                      Dimensions.radiusDefault,
                                    ),
                                    borderSide: BorderSide(
                                      color: notifires.getGrey6whiteColor,
                                    ),
                                  ),
                                  enabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(13),
                                    borderSide: BorderSide(
                                      color: notifires.getGrey6whiteColor,
                                    ),
                                  ),
                                  focusedBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(13),
                                    borderSide: BorderSide(
                                      color: notifires.getGrey6whiteColor,
                                    ),
                                  ),
                                ),
                              ),
                              const SizedBox(height: 20),
                              _buildResendSection(context),
                              const SizedBox(height: 30),
                              CustomsButtons(
                                textColor: blackColor,
                                onPressed: _verifyOtp,
                                text: 'Continue',
                                backgroundColor: themeColor,
                              ),
                              const SizedBox(height: 30),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Text(
                                    'Try again'.translate(context),
                                    style: regular3(context).copyWith(
                                      color: notifires.getGrey2whiteColor,
                                    ),
                                  ),
                                  const SizedBox(width: 8),
                                  InkWell(
                                    onTap: goBack,
                                    child: Text(
                                      'Go Back'.translate(context),
                                      style: boldstyle(context).copyWith(
                                        color: themeColor,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 40),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildResendSection(BuildContext context) {
    if (_isResendEnabled) {
      return SizedBox(
        height: 22,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              "Didn't receive code?".translate(context),
              style: regular3(context).copyWith(
                color: notifires.getGrey2whiteColor,
              ),
            ),
            const SizedBox(width: 5),
            InkWell(
              onTap: () {
                setState(() {
                  _remainingTime = 15;
                  _isResendEnabled = false;
                });
                startResendTimer();
                context.read<AuthResendOtpCubit>().resendOtp(
                      phone: widget.number,
                      phoneCountry: _normalizedCountryCode,
                    );
              },
              child: Text(
                'Resend'.translate(context),
                style: regular2(context).copyWith(
                  color: blackColor,
                  fontSize: 16,
                ),
              ),
            ),
          ],
        ),
      );
    }

    return SizedBox(
      height: 22,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            'Resend code in'.translate(context),
            style: regular3(context).copyWith(
              color: notifires.getGrey2whiteColor,
            ),
          ),
          const SizedBox(width: 10),
          Text(
            '00:${_remainingTime.toString().padLeft(2, '0')}',
            style: regular2(context).copyWith(
              color: blackColor,
              fontSize: 16,
            ),
          ),
        ],
      ),
    );
  }

  String get _normalizedCountryCode {
    final countryCode = widget.countryCode ?? '+995';
    return countryCode.startsWith('+') ? countryCode : '+$countryCode';
  }

  void _verifyOtp() {
    _dismissKeyboard();
    if (!(_formKey.currentState?.validate() ?? false)) return;

    if (widget.routeString == 'Login') {
      context.read<AuthUserAuthenticateCubit>().userAuthenticate(
            context: context,
            phoneNumber: widget.number ?? '',
            phoneCountry: _normalizedCountryCode,
            otpValue: textEditingOtpController.text,
          );
      return;
    }

    context.read<AuthOtpVerifyCubit>().otpVerification(
          context: context,
          phone: widget.number,
          otpValue: textEditingOtpController.text,
          countryCode: _normalizedCountryCode,
          email: widget.email,
          changeEmail: widget.changeEmail,
          changeMobile: widget.changeMobile,
          defaultCountry: widget.defaultCountry,
          loginWithGoogle: widget.loginWithSocialMedia,
        );
  }
}
