import 'dart:async';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:ride_on/core/services/config.dart';
import 'package:ride_on/core/services/http.dart';
import 'package:ride_on/core/utils/common_widget.dart';
import 'package:ride_on/core/utils/theme/project_color.dart';
import 'package:ride_on/core/utils/translate.dart';

class SupportChatScreen extends StatefulWidget {
  const SupportChatScreen({super.key});

  @override
  State<SupportChatScreen> createState() => _SupportChatScreenState();
}

class _SupportChatScreenState extends State<SupportChatScreen> {
  final _controller = TextEditingController();
  final _scrollController = ScrollController();
  final List<Map<String, dynamic>> _messages = [];
  Timer? _poller;
  bool _loading = true;
  bool _loadInFlight = false;
  bool _sending = false;
  String? _error;
  XFile? _attachment;

  @override
  void initState() {
    super.initState();
    _load();
    _poller = Timer.periodic(
      const Duration(seconds: 5),
      (_) => _load(silent: true),
    );
  }

  Future<void> _load({bool silent = false}) async {
    if (_loadInFlight) return;
    _loadInFlight = true;
    if (!silent && mounted) setState(() => _loading = true);
    try {
      final response = await httpPost(Config.supportChat, {}, context: context);
      if (!mounted) return;
      if (response['status'] == 200) {
        final data = response['data'] as Map<String, dynamic>? ?? {};
        final messages = (data['messages'] as List? ?? [])
            .whereType<Map>()
            .map((item) => Map<String, dynamic>.from(item))
            .toList();
        setState(() {
          _messages
            ..clear()
            ..addAll(messages);
          _loading = false;
          _error = null;
        });
        _scrollToBottom();
      } else if (!silent) {
        setState(() {
          _loading = false;
          _error = (response['error'] ?? response['message'] ?? 'Try again')
              .toString();
        });
      }
    } catch (_) {
      if (mounted && !silent) {
        setState(() {
          _loading = false;
          _error = 'Try again'.translate(context);
        });
      }
    } finally {
      _loadInFlight = false;
    }
  }

  Future<void> _send() async {
    final message = _controller.text.trim();
    if ((message.isEmpty && _attachment == null) || _sending) return;
    setState(() => _sending = true);
    late final dynamic response;
    if (_attachment == null) {
      response = await httpPost(Config.supportChatMessages, {
        'message': message,
      }, context: context);
    } else {
      response = await httpMultipartPost(
        Config.supportChatMessages,
        {'message': message},
        filePath: _attachment!.path,
        context: context,
      );
    }
    if (!mounted) return;
    setState(() => _sending = false);
    if (response['status'] == 200) {
      _controller.clear();
      setState(() => _attachment = null);
      await _load(silent: true);
    } else {
      showErrorToastMessage(
        (response['error'] ?? response['message'] ?? 'Message was not sent')
            .toString(),
      );
    }
  }

  Future<void> _pickAttachment() async {
    try {
      final picked = await ImagePicker().pickImage(
        source: ImageSource.gallery,
        maxWidth: 2048,
        maxHeight: 2048,
        imageQuality: 82,
        requestFullMetadata: false,
      );
      if (picked == null || !mounted) return;
      final fileSize = await File(picked.path).length();
      if (!mounted) return;
      if (fileSize > 5 * 1024 * 1024) {
        showErrorToastMessage(
          'Photo is too large. Maximum size is 5 MB.'.translate(context),
        );
        return;
      }
      setState(() => _attachment = picked);
    } catch (_) {
      if (mounted) {
        showErrorToastMessage('Photo could not be loaded'.translate(context));
      }
    }
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 250),
          curve: Curves.easeOut,
        );
      }
    });
  }

  @override
  void dispose() {
    _poller?.cancel();
    _controller.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: notifires.getbgcolor,
      appBar: AppBar(
        title: Text('Live support'.translate(context)),
        backgroundColor: notifires.getbgcolor,
        foregroundColor: notifires.getwhiteblackColor,
      ),
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: _loading
                  ? const Center(child: CircularProgressIndicator())
                  : _error != null
                  ? Center(
                      child: TextButton(onPressed: _load, child: Text(_error!)),
                    )
                  : _messages.isEmpty
                  ? Center(
                      child: Padding(
                        padding: const EdgeInsets.all(24),
                        child: Text(
                          'Write your message. AI can answer first and an operator can take over.'
                              .translate(context),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    )
                  : ListView.builder(
                      controller: _scrollController,
                      padding: const EdgeInsets.all(12),
                      itemCount: _messages.length,
                      itemBuilder: (_, index) {
                        final item = _messages[index];
                        final support = item['is_support'] == true;
                        return Align(
                          alignment: support
                              ? Alignment.centerLeft
                              : Alignment.centerRight,
                          child: Container(
                            constraints: const BoxConstraints(maxWidth: 310),
                            margin: const EdgeInsets.symmetric(vertical: 4),
                            padding: const EdgeInsets.all(12),
                            decoration: BoxDecoration(
                              color: support
                                  ? Colors.grey.shade200
                                  : themeColor,
                              borderRadius: BorderRadius.circular(14),
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                if ((item['attachment_url']?.toString() ?? '')
                                    .isNotEmpty)
                                  ClipRRect(
                                    borderRadius: BorderRadius.circular(10),
                                    child: Image.network(
                                      item['attachment_url'].toString(),
                                      width: 260,
                                      fit: BoxFit.cover,
                                      errorBuilder: (_, _, _) => Padding(
                                        padding: const EdgeInsets.all(8),
                                        child: Text(
                                          'Photo could not be loaded'.translate(
                                            context,
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                if ((item['message']?.toString() ?? '')
                                    .trim()
                                    .isNotEmpty)
                                  Padding(
                                    padding: EdgeInsets.only(
                                      top:
                                          (item['attachment_url']?.toString() ??
                                                  '')
                                              .isNotEmpty
                                          ? 8
                                          : 0,
                                    ),
                                    child: Text(
                                      item['message'].toString(),
                                      style: TextStyle(
                                        color: support
                                            ? Colors.black87
                                            : Colors.black,
                                      ),
                                    ),
                                  ),
                                if (support &&
                                    item['source']?.toString() == 'ai')
                                  const Padding(
                                    padding: EdgeInsets.only(top: 4),
                                    child: Text(
                                      'AI',
                                      style: TextStyle(
                                        fontSize: 10,
                                        color: Colors.black54,
                                      ),
                                    ),
                                  ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
            ),
            if (_attachment != null)
              Padding(
                padding: const EdgeInsets.fromLTRB(12, 8, 12, 0),
                child: Row(
                  children: [
                    ClipRRect(
                      borderRadius: BorderRadius.circular(10),
                      child: Image.file(
                        File(_attachment!.path),
                        width: 54,
                        height: 54,
                        fit: BoxFit.cover,
                      ),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: Text(
                        _attachment!.name,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    IconButton(
                      onPressed: _sending
                          ? null
                          : () => setState(() => _attachment = null),
                      icon: const Icon(Icons.close),
                    ),
                  ],
                ),
              ),
            Padding(
              padding: const EdgeInsets.fromLTRB(12, 8, 12, 12),
              child: Row(
                children: [
                  IconButton(
                    tooltip: 'Add photo'.translate(context),
                    onPressed: _sending ? null : _pickAttachment,
                    icon: const Icon(Icons.add_photo_alternate_outlined),
                  ),
                  Expanded(
                    child: TextField(
                      controller: _controller,
                      minLines: 1,
                      maxLines: 4,
                      maxLength: 2000,
                      decoration: InputDecoration(
                        hintText: 'Type a message'.translate(context),
                        counterText: '',
                        border: const OutlineInputBorder(),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  IconButton.filled(
                    onPressed: _sending ? null : _send,
                    icon: _sending
                        ? const SizedBox(
                            width: 20,
                            height: 20,
                            child: CircularProgressIndicator(strokeWidth: 2),
                          )
                        : const Icon(Icons.send),
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
