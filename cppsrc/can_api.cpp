#include <conio.h>
#include <stdio.h>
#include <napi.h>
#include <thread>
#include <iostream>
#include "can_api.h"

Napi::FunctionReference CanApi::constructor;

void CanApi::CheckCanStatus(char* label, canStatus status) {
  if (status != canOK) {
    char buffer[50];
    buffer[0] = '\0';

    canGetErrorText(status, buffer, sizeof(buffer));

    printf("%s => failed, stat=%d (%s)\n", label, (int)status, buffer);
  }
}

Napi::Object CanApi::Init(Napi::Env env, Napi::Object exports) {
  Napi::HandleScope scope(env);

  Napi::Function func = DefineClass(env, "CanApi", {
    InstanceMethod("readMessage", &CanApi::ReadMessage),
    InstanceMethod("sendMessage", &CanApi::SendMessage),
    InstanceMethod("open", &CanApi::Open),
    InstanceMethod("close", &CanApi::Close),
  });

  constructor = Napi::Persistent(func);
  constructor.SuppressDestruct();

  exports.Set("CanApi", func);

  return exports;
}

CanApi::CanApi(const Napi::CallbackInfo& info): Napi::ObjectWrap<CanApi>(info) {
  Napi::Env env = info.Env();
  Napi::HandleScope scope(env);

  this->channel = (int)info[0].As<Napi::Number>();

  canInitializeLibrary();
}

Napi::Value CanApi::ReadMessage(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  canStatus status; 
  long identifier;
  uint32_t  dlc;
  uint32_t flags;
  uint8_t data[8];
  DWORD time;

  status = canReadWait(this->handle, &identifier, data, &dlc, &flags, &time, 3000);
  CanApi::CheckCanStatus("ReadMessage::canReadWait", status);

  Napi::Object output = Napi::Object::New(env);

  output.Set(Napi::String::New(env, "identifier"), Napi::Number::New(env, identifier));
  output.Set(Napi::String::New(env, "data"), Napi::Buffer<uint8_t>::Copy(env, data, dlc));
  output.Set(Napi::String::New(env, "dlc"), Napi::Number::New(env, dlc));

  return output;
}

Napi::Value CanApi::SendMessage(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  int32_t identifier = info[0].As<Napi::Number>();
  uint8_t* data = info[1].As<Napi::Buffer<uint8_t>>().Data();

  canStatus status = canWrite(this->handle, identifier, data, sizeof(data), 0);
  CanApi::CheckCanStatus("SendMessage::canWrite", status);

  return Napi::Boolean::New(env, true);
}

Napi::Value CanApi::Open(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  canStatus status;

  this->handle = canOpenChannel(this->channel, canOPEN_ACCEPT_VIRTUAL);
  CanApi::CheckCanStatus("Constructor::canOpenChannel", (canStatus)this->handle);
  
  status = canSetBusParams(this->handle, canBITRATE_250K, 0, 0, 0, 0, 0);
  CanApi::CheckCanStatus("Constructor::canSetBusParams", status);

  status = canBusOn(this->handle);
  CanApi::CheckCanStatus("Constructor::canBusOn", status);

  this->opened = true;

  return Napi::Boolean::New(env, this->opened);
}

Napi::Value CanApi::Close(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  
  canStatus status;

  this->opened = false;

  status = canBusOff(this->handle);
  CanApi::CheckCanStatus("CanBusOff", status);
  status = canClose(this->handle);
  CanApi::CheckCanStatus("CanClose", status);

  return Napi::Boolean::New(env, this->opened);
}