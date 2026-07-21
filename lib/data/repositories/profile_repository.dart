import 'package:ride_on/core/services/http.dart';
import 'package:ride_on/core/extensions/workspace.dart';
import 'package:flutter/material.dart';
import '../../core/services/config.dart';

class ProfileRepository {
  Future<Map<String, dynamic>> editProfile(
      {required Map<String, dynamic> postData}) async {
    try {
      var response = await httpPost(Config.editProfile, postData,
          context: navigatorKey.currentContext!);
      return response;
    } catch (e) {
      rethrow;
    }
  }

  Future<Map<String, dynamic>> getSliders(
      {required Map<String, dynamic> postData}) async {
    try {
      var response = await httpGet(Config.sliders, postData,
          context: navigatorKey.currentContext!);
      return response;
    } catch (e) {
      rethrow;
    }
  }

  Future<Map<String, dynamic>> deleteAccount() async {
    try {
      var response = await httpPost(Config.deleteAccount, {},
          context: navigatorKey.currentState!.context);
      return response;
    } catch (e) {
      rethrow;
    }
  }

  Future<Map<String, dynamic>> uploadProfileImage(
      {required Map<String, dynamic> postData}) async {
    try {
      var response = await httpPost(Config.uploadProfileImage, postData,
          context: navigatorKey.currentContext!);
      return response;
    } catch (e) {
      rethrow;
    }
  }

  Future<Map<String, dynamic>> getSosData(
      {required Map<String, dynamic> postData}) async {
    try {
      var response = await httpGet(Config.sos, postData,
          context: navigatorKey.currentContext!);
      return response;
    } catch (e) {
      rethrow;
    }
  }

  Future<Map<String, dynamic>> getStaticPage(
      BuildContext context, String data) async {
    try {
      const pageIds = <String, String>{
        "About Us": "2",
        "Help and Support": "4",
        "Give us feedback": "25",
        "Terms and Conditions": "11",
        "Privacy Policy": "11",
        "Support": "26",
      };
      final pageId = pageIds[data];
      if (pageId == null) {
        return {
          "status": 400,
          "error": "Unknown static page: $data",
        };
      }
      return await httpGet(Config.staticPage, {"id": pageId},
          context: navigatorKey.currentContext!);
    } catch (e) {
      rethrow;
    }
  }

  Future<Map<String, dynamic>> getGeneralData(
      {required Map<String, dynamic> postData}) async {
    try {
      var response = await httpGet(Config.getgeneralSettings, postData,
          context: navigatorKey.currentContext!);
      return response;
    } catch (e) {
      rethrow;
    }
  }
}
