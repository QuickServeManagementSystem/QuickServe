import RNModule, {NativeEventEmitter, EmitterSubscription} from 'react-native';

import {EventPayloadByEventType, EventType} from './type';

class HammerEventEmitter {
  private static _instance: HammerEventEmitter;
  private _listeners: NativeEventEmitter;

  // support only one track
  constructor() {
    // this._listeners =
    //   RNModule.Platform.OS !== 'android'
    //     ? new RNModule.NativeEventEmitter()
    //     : RNModule.DeviceEventEmitter;
    this._listeners = RNModule.DeviceEventEmitter;

    if (!HammerEventEmitter._instance) {
      // private methods and variables
      HammerEventEmitter._instance = this;
    }

    return HammerEventEmitter._instance;
  }

  static get shared() {
    return this._instance || (this._instance = new this());
  }

  addEventListener<K extends keyof EventPayloadByEventType>(
    key: K,
    callback: EventPayloadByEventType[K] extends never
      ? () => void
      : (event: EventPayloadByEventType[K]) => void,
  ): EmitterSubscription {
    return this._listeners.addListener(
      key,
      (args: EventPayloadByEventType[K]) => callback(args),
    );
  }

  emitEventListener<K extends keyof EventPayloadByEventType>(
    key: K,
    data: EventPayloadByEventType[K],
  ) {
    this._listeners.emit(key, data);
  }

  removeEventListener<K extends EventType>(key: K) {
    this._listeners.removeAllListeners(key);
  }
}

const EventInstance = HammerEventEmitter.shared;
export default EventInstance;
