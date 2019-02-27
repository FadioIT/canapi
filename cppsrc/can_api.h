#ifndef CAN_API_H
#define CAN_API_H

#include <map>
#include <napi.h>
#include <canlib.h>

class CanApi : public Napi::ObjectWrap<CanApi> {
  public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    CanApi(const Napi::CallbackInfo& info);

  private:
    static Napi::FunctionReference constructor;
    static void CheckCanStatus(char* label, canStatus status);

    Napi::Value SendMessage(const Napi::CallbackInfo& info);
    Napi::Value ReadMessage(const Napi::CallbackInfo& info);
    Napi::Value Open(const Napi::CallbackInfo& info);
    Napi::Value Close(const Napi::CallbackInfo& info);

    int channel;
    canHandle handle;
    int opened = false;
};

#endif