import {Dimensions} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import styled from 'styled-components/native';

export enum MaxSize {
  WIDTH = Dimensions.get('window').width,
  HEIGHT = Dimensions.get('window').height,
}

//check data null
export const isNull = (data: any) => {
  if (data === undefined || data == null) {
    return true;
  } else if (typeof data === 'string') {
    data = String(data).trim();
    return data === '';
  } else if (typeof data === 'object' && data.constructor === Object) {
    if (Object.keys(data).length === 0) {
      return true;
    }
  } else if (Array.isArray(data) && data.length === 0) {
    return true;
  }
  return false;
};

// URL
export const validURL = (str: string) => {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !!pattern.test(str);
};
//validate
export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const isValidateEmail = (email: string) => {
  return EMAIL_REGEX.test(String(email).toLowerCase());
};
export const isValidatePasswordLength = (text: string) => {
  const re =
    /^([a-zA-Z0-9!@#$%^&*₹•.₫€£¥₩○●□■♤♡◇♧☆▪︎¤±≡№‽₱·†‡‚‹›♪♦Ωμ←↑↓→′″∞℅≤⟨≥⟩〔「『〕」』♠♥◆♣★《》–—₽§”“„»«…’‘‰≠≈¡¿√π÷×¶∆¢°©®™✓,`~<>/\\()_|+\-=?;:'"]){8,32}$/;
  return re.test(text);
};
export const isValidatePasswordCharacter = (text: string) => {
  const containUpper = /[A-Z]/;
  const containLower = /[a-z]/;
  const containNumber = /[0-9]/;
  return (
    containUpper.test(text) &&
    containLower.test(text) &&
    containNumber.test(text)
  );
};

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

//
// You can now use deferred.promise, deferred.resolve, and deferred.reject
export function defer() {
  let resolve: (value: unknown) => void = () => {};
  let reject: (value: unknown) => void = () => {}; // Initialize with an empty function

  let promise = new Promise<unknown>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return {
    promise,
    resolve,
    reject,
  };
}

export const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export const formatNumber = (carrot: any) => {
  return new Intl.NumberFormat('en').format(carrot);
};

export const Space = styled.View<{vertical?: number; horizontal?: number}>`
  height: ${props => verticalScale(props.vertical ?? 0)}px;
  width: ${props => scale(props.horizontal ?? 0)}px;
`;
