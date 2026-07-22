import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:provider/provider.dart';
import 'package:ride_on/core/utils/translate.dart';
import 'package:ride_on/presentation/screens/onboarding/language_select_screen.dart';

import '../../../core/utils/common_widget.dart';
import '../../../core/utils/theme/project_color.dart';
import '../../../core/utils/theme/theme_style.dart';
import '../auth/signup_screen.dart';

class Onboardingscreen extends StatefulWidget {
  const Onboardingscreen({super.key});

  @override
  State<Onboardingscreen> createState() => _OnboardingscreenState();
}

class _OnboardingscreenState extends State<Onboardingscreen> {
  final List<Map<String, String>> content = [
    {
      'image': 'assets/images/cuate.svg',
      'title': "More than just a ride, it's a vibe!",
      'description':
          'Book rides in seconds, track your arrival in real-time, and enjoy stress-free journeys. Choose from different ride options, all driven by professional and friendly drivers.',
    },
  ];

  late final PageController pageController;

  @override
  void initState() {
    super.initState();
    pageController = PageController(initialPage: 0);
  }

  @override
  void dispose() {
    pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    notifires = Provider.of<ColorNotifires>(context, listen: true);

    return Scaffold(
      backgroundColor: whiteColor,
      body: SingleChildScrollView(
        child: Stack(
          children: [
            Column(
              children: [
                SizedBox(
                  height: MediaQuery.of(context).size.height * 0.38,
                  child: Stack(
                    children: [
                      Align(
                        alignment: Alignment.topLeft,
                        child: SvgPicture.asset(
                          'assets/images/EllipseCircle.svg',
                          height: MediaQuery.of(context).size.height * 0.38,
                          fit: BoxFit.fill,
                        ),
                      ),
                      Positioned(
                        bottom: 0,
                        left: 0,
                        right: 40,
                        child: Padding(
                          padding: const EdgeInsets.only(
                            left: 30,
                            right: 20,
                            bottom: 30,
                          ),
                          child: Image.asset('assets/images/carImage.png'),
                        ),
                      ),
                    ],
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 60,
                    vertical: 20,
                  ),
                  child: Column(
                    children: [
                      Text(
                        'Reliable Rides. Seamless Journeys.'
                            .translate(context),
                        textAlign: TextAlign.center,
                        style: largeHeadingMedium.copyWith(fontSize: 28),
                      ),
                      const SizedBox(height: 15),
                      Text(
                        'Book instantly, track live, and relax with verified drivers. Multiple ride types, one stress-free experience.'
                            .translate(context),
                        textAlign: TextAlign.center,
                        style: smallHeadingMedium.copyWith(
                          color: notifires.getGrey2whiteColor,
                          fontSize: 14,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 60),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 60),
                  child: CustomsButtons(
                    textColor: blackColor,
                    text: 'Proceed to Sign-Up',
                    backgroundColor: themeColor,
                    onPressed: () {
                      Navigator.pushReplacement(
                        context,
                        MaterialPageRoute(
                          builder: (context) => const SignUp(),
                        ),
                      );
                    },
                  ),
                ),
                const SizedBox(height: 40),
              ],
            ),
            Positioned(
              top: 70,
              left: 20,
              right: 20,
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
    );
  }
}

Widget customOnboardingWidget(
  String image,
  String title,
  String description,
) {
  return Padding(
    padding: const EdgeInsets.symmetric(horizontal: 20),
    child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 20, right: 20),
          child: SvgPicture.asset(image),
        ),
        const SizedBox(height: 20),
        Flexible(
          child: Text(
            title,
            textAlign: TextAlign.start,
            style: largeHeadingMedium.copyWith(fontSize: 24),
            softWrap: true,
          ),
        ),
        const SizedBox(height: 15),
        Text(
          description,
          style: smallHeadingMedium.copyWith(
            color: notifires.getGrey2whiteColor,
            fontSize: 14,
          ),
          textAlign: TextAlign.start,
        ),
      ],
    ),
  );
}
