export enum EventType {
  LOGIN_FAIL = 'LOGIN_FAIL',
  LOADING = 'LOADING',
}
export interface EventPayloadByEventType {
  [EventType.LOGIN_FAIL]: {
    _error: string;
  };
  [EventType.LOADING]: {
    _loading: boolean;
  };
}
