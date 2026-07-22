import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/svg.dart';
import 'package:provider/provider.dart';
import 'package:ride_on/core/utils/translate.dart';
import 'package:ride_on/presentation/screens/Auth/signup_screen.dart';
import 'package:ride_on/presentation/screens/onboarding/language_select_screen.dart';

import '../../../core/extensions/workspace.dart';
import '../../../core/utils/common_widget.dart';
import '../../../core/utils/theme/project_color.dart';
import '../../../core/utils/theme/theme_style.dart';
import '../../cubits/auth/login_cubit.dart';
import '../../cubits/auth/user_authenticate_cubit.dart';
import '../../widgets/custom_text_form_field.dart';
import 'otp_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController textEditingLoginControllerPhoneNumber =
      TextEditingController();
  final _formKey = GlobalKey<FormState>();

  @override
  void initState() {
    super.initState();
    isNumeric = false;
    context.read<SetCountryCubit>().clear();
  }

  @override
  void dispose() {
    textEditingLoginControllerPhoneNumber.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    notifires = Provider.of<ColorNotifires>(context, listen: true);

    return PopScope(
      canPop: false,
      child: Scaffold(
        bottomSheet: isNumeric && Platform.isIOS
            ? KeyboardDoneButton(
                onTap: () {
                  setState(() => isNumeric = false);
                },
              )
            : null,
        resizeToAvoidBottomInset: false,
        backgroundColor: notifires.getbgcolor,
        body: MultiBlocListener(
          listeners: [
            BlocListener<AuthLoginCubit, AuthLoginState>(
              listener: (context, state) {
                if (state is LoginLoading) {
                  Widgets.showLoader(context);
                } else if (state is LoginSuccess) {
                  Widgets.hideLoder(context);
                  context.read<AuthLoginCubit>().resetState();

                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => OtpScreen(
                        number: textEditingLoginControllerPhoneNumber.text,
                        countryCode:
                            state.loginModel.data?.phoneCountry ?? '+995',
                        defaultCountry:
                            state.loginModel.data?.defaultCountry ?? 'GE',
                        routeString: 'Login',
                        otpValue: '',
                      ),
                    ),
                  );
                } else if (state is LoginFailure) {
                  Widgets.hideLoder(context);
                  showErrorToastMessage(state.error);
                }
              },
            ),
          ],
          child: Stack(
            children: [
              Positioned(
                left: 0,
                top: 0,
                child: SvgPicture.asset('assets/images/EllipseTop.svg'),
              ),
              SingleChildScrollView(
                physics: const BouncingScrollPhysics(),
                child: Align(
                  alignment: Alignment.center,
                  child: SizedBox(
                    width: Dimensions.containerWidth,
                    child: Padding(
                      padding: const EdgeInsets.symmetric(
                        horizontal: Dimensions.paddingSizeLarge,
                      ),
                      child: Form(
                        key: _formKey,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            const SizedBox(height: 150),
                            commonlyUserLogo(),
                            const SizedBox(height: 10),
                            Text('Sign in'.translate(context),
                                style: heading1(context)),
                            Text(
                              'Welcome Back'.translate(context),
                              style: regular2(context).copyWith(
                                color: notifires.getGrey3whiteColor,
                              ),
                            ),
                            const SizedBox(height: 40),
                            BlocBuilder<SetCountryCubit, SetCountryState>(
                              builder: (context, state) {
                                return IntelPhoneFieldRefs(
                                  onTap: () {
                                    setState(() => isNumeric = true);
                                  },
                                  key: ValueKey(state.countryCode),
                                  defultcountry: state.countryCode,
                                  textEditingControllerCommons:
                                      textEditingLoginControllerPhoneNumber,
                                  oncountryChanged: (country) {
                                    textEditingLoginControllerPhoneNumber
                                        .clear();
                                    final dialCode = country.dialCode
                                            .startsWith('+')
                                        ? country.dialCode
                                        : '+${country.dialCode}';
                                    context
                                        .read<SetCountryCubit>()
                                        .setCountry(
                                          dialCode: dialCode,
                                          countryCode: country.code,
                                        );
                                  },
                                  hintText: 'Phone no'.translate(context),
                                  onChanged: (_) => null,
                                  validator: (phoneNumber) {
                                    if (phoneNumber == null ||
                                        phoneNumber.number.isEmpty) {
                                      return 'Please enter your phone number'
                                          .translate(context);
                                    }

                                    final expectedLength = phoneLengths[
                                            phoneNumber.countryISOCode] ??
                                        10;
                                    var cleanedNumber = phoneNumber.number
                                        .replaceAll(RegExp(r'\D'), '');
                                    if (cleanedNumber.startsWith('0')) {
                                      cleanedNumber =
                                          cleanedNumber.substring(1);
                                    }

                                    if (cleanedNumber.length !=
                                        expectedLength) {
                                      return '${'Phone number must be'.translate(context)} $expectedLength ${'digits'.translate(context)}';
                                    }
                                    return null;
                                  },
                                );
                              },
                            ),
                            const SizedBox(height: 40),
                            CustomsButtons(
                              onPressed: () {
                                if (!_formKey.currentState!.validate()) return;
                                if (textEditingLoginControllerPhoneNumber
                                    .text.isEmpty) {
                                  showErrorToastMessage(
                                    'Please enter the phone number'
                                        .translate(context),
                                  );
                                  return;
                                }

                                final countryState =
                                    context.read<SetCountryCubit>().state;
                                context.read<AuthLoginCubit>().login(
                                      context: context,
                                      phoneCountry: countryState.dialCode,
                                      phoneNumber:
                                          textEditingLoginControllerPhoneNumber
                                              .text,
                                    );
                              },
                              textColor: blackColor,
                              text: 'Sign in',
                              backgroundColor: themeColor,
                            ),
                            const SizedBox(height: 50),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(
                                  "Don't have an account?".translate(context),
                                  style: regular3(context).copyWith(
                                    color: notifires.getGrey2whiteColor,
                                  ),
                                ),
                                const SizedBox(width: 5),
                                InkWell(
                                  onTap: () {
                                    Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                        builder: (context) => const SignUp(),
                                      ),
                                    );
                                  },
                                  child: Text(
                                    'Sign Up'.translate(context),
                                    style: heading3Grey1(context).copyWith(
                                      color: blackColor,
                                      fontSize: 16,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 300),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              Positioned(
                top: 70,
                left: 10,
                right: 10,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    languageButton(
                      onTap: () {
                        goTo(const SelectLanguageScreen(isBack: true));
                      },
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
