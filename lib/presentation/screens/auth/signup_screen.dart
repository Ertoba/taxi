import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/svg.dart';
import 'package:provider/provider.dart';
import 'package:ride_on/core/utils/translate.dart';
import 'package:ride_on/presentation/screens/onboarding/language_select_screen.dart';

import '../../../core/extensions/workspace.dart';
import '../../../core/utils/common_widget.dart';
import '../../../core/utils/theme/project_color.dart';
import '../../../core/utils/theme/theme_style.dart';
import '../../cubits/auth/signup_cubit.dart';
import '../../cubits/auth/user_authenticate_cubit.dart';
import '../../widgets/custom_text_form_field.dart';
import '../../widgets/form_validations.dart';
import '../Account/static_screen.dart';
import 'login_screen.dart';
import 'otp_screen.dart';

class SignUp extends StatefulWidget {
  const SignUp({super.key});

  @override
  State<SignUp> createState() => _SignUpState();
}

class _SignUpState extends State<SignUp> {
  final TextEditingController textEditingSignUpControllerFirstName =
      TextEditingController();
  final TextEditingController textEditingSignUpControllerEmail =
      TextEditingController();
  final TextEditingController textEditingSingUpControllerPhoneNumber =
      TextEditingController();

  bool isChecked = false;
  final _formKey = GlobalKey<FormState>();

  @override
  void initState() {
    super.initState();
    isNumeric = false;
    context.read<SetCountryCubit>().clear();
  }

  @override
  void dispose() {
    textEditingSignUpControllerFirstName.dispose();
    textEditingSignUpControllerEmail.dispose();
    textEditingSingUpControllerPhoneNumber.dispose();
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
            BlocListener<AuthSignUpCubit, AuthSignUpState>(
              listener: (context, state) {
                if (state is SignUpLoading) {
                  Widgets.showLoader(context);
                } else if (state is SignUpSuccess) {
                  Widgets.hideLoder(context);
                  context.read<AuthSignUpCubit>().resetState();

                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => OtpScreen(
                        number: state.loginModel.data!.phone,
                        countryCode:
                            state.loginModel.data!.phoneCountry ?? '+995',
                        otpValue: '',
                        email: '',
                        defaultCountry:
                            state.loginModel.data!.defaultCountry ?? 'GE',
                        changeMobile: false,
                        loginWithSocialMedia: false,
                        routeString: 'SignUp',
                      ),
                    ),
                  );
                } else if (state is SignUpFailure) {
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
                            const SizedBox(height: 130),
                            commonlyUserLogo(),
                            const SizedBox(height: 10),
                            Text('Get Started'.translate(context),
                                style: heading1(context)),
                            Text(
                              'Create an account to continue.'
                                  .translate(context),
                              style: regular2(context).copyWith(
                                color: notifires.getGrey3whiteColor,
                              ),
                            ),
                            const SizedBox(height: 20),
                            TextFieldAdvance(
                              onTap: () {
                                setState(() => isNumeric = false);
                              },
                              inputAlignment: TextAlign.start,
                              txt: 'Name'.translate(context),
                              icons: Icon(
                                Icons.person_2_outlined,
                                color: blackColor,
                              ),
                              textEditingControllerCommon:
                                  textEditingSignUpControllerFirstName,
                              inputType: TextInputType.name,
                              validator: (value) {
                                if (isValidName(value ?? '')) return null;
                                return 'Please enter the name'
                                    .translate(context);
                              },
                            ),
                            const SizedBox(height: 20),
                            BlocBuilder<SetCountryCubit, SetCountryState>(
                              builder: (context, state) {
                                return IntelPhoneFieldRefs(
                                  onTap: () {
                                    setState(() => isNumeric = true);
                                  },
                                  key: ValueKey(state.countryCode),
                                  defultcountry: state.countryCode,
                                  textEditingControllerCommons:
                                      textEditingSingUpControllerPhoneNumber,
                                  oncountryChanged: (country) {
                                    textEditingSingUpControllerPhoneNumber
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
                            const SizedBox(height: 20),
                            TextFieldAdvance(
                              onTap: () {
                                setState(() => isNumeric = false);
                              },
                              inputAlignment: TextAlign.start,
                              txt: 'Email'.translate(context),
                              icons: Icon(
                                Icons.mail_outline_outlined,
                                color: blackColor,
                              ),
                              textEditingControllerCommon:
                                  textEditingSignUpControllerEmail,
                              inputType: TextInputType.emailAddress,
                              validator: (value) {
                                return validateEmail(value ?? '', context);
                              },
                            ),
                            const SizedBox(height: 20),
                            Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                SizedBox(
                                  width: 33,
                                  height: 40,
                                  child: Transform.scale(
                                    scale: 1.2,
                                    child: Checkbox(
                                      activeColor: themeColor,
                                      focusColor: whiteColor,
                                      value: isChecked,
                                      onChanged: (value) {
                                        setState(() {
                                          isChecked = value ?? false;
                                        });
                                      },
                                      checkColor: whiteColor,
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(
                                          Dimensions.radiusSmall,
                                        ),
                                      ),
                                      side: BorderSide(
                                        color: notifires.getGrey3whiteColor,
                                        width: 2,
                                      ),
                                    ),
                                  ),
                                ),
                                const SizedBox(width: 5),
                                Expanded(
                                  child: GestureDetector(
                                    onTap: () {
                                      showModalBottomSheet(
                                        useRootNavigator: true,
                                        backgroundColor: notifires.getbgcolor,
                                        isScrollControlled: true,
                                        useSafeArea: true,
                                        context: context,
                                        builder: (_) => const StaticScreen(
                                          data: 'Terms and Conditions',
                                        ),
                                      );
                                    },
                                    child: Text.rich(
                                      TextSpan(
                                        text:
                                            '${'By creating an account, you agree to our '.translate(context)}\n',
                                        style: regular3(context).copyWith(
                                          fontSize: 14,
                                        ),
                                        children: [
                                          TextSpan(
                                            text: 'Terms and Condition'
                                                .translate(context),
                                            style: heading3Grey1(context)
                                                .copyWith(
                                              fontWeight: FontWeight.w200,
                                              color: themeColor,
                                              fontSize: 14,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 45),
                            CustomsButtons(
                              onPressed: () {
                                if (!_formKey.currentState!.validate()) return;
                                if (!isChecked) {
                                  showErrorToastMessage(
                                    'Please select the terms and condition.'
                                        .translate(context),
                                  );
                                  return;
                                }
                                if (textEditingSingUpControllerPhoneNumber
                                    .text.isEmpty) {
                                  showErrorToastMessage(
                                    'Fill valid mobile number'
                                        .translate(context),
                                  );
                                  return;
                                }

                                final countryState =
                                    context.read<SetCountryCubit>().state;
                                context.read<AuthSignUpCubit>().signUp(
                                      context: context,
                                      name:
                                          textEditingSignUpControllerFirstName
                                              .text,
                                      phoneCountry: countryState.dialCode,
                                      defaultCountry:
                                          countryState.countryCode,
                                      phoneNumber:
                                          textEditingSingUpControllerPhoneNumber
                                              .text,
                                      email:
                                          textEditingSignUpControllerEmail.text,
                                    );
                              },
                              textColor: blackColor,
                              text: 'Sign up',
                              backgroundColor: themeColor,
                            ),
                            const SizedBox(height: 50),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(
                                  'Already have an account?'
                                      .translate(context),
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
                                        builder: (_) => const LoginScreen(),
                                      ),
                                    );
                                  },
                                  child: Text(
                                    'Sign in'.translate(context),
                                    style: heading1(context).copyWith(
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
