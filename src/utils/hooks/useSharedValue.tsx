import {useEffect, useRef} from 'react';

interface SharedValue<T> {
  value: T;
}

export function useSharedValue<T>(init: T): SharedValue<T> {
  const ref = useRef<SharedValue<T>>({value: init});

  if (ref.current === null) {
    ref.current = {value: init};
  }

  useEffect(() => {
    return () => {
      cancelAnimation(ref.current!);
    };
  }, []);

  return ref.current!;
}

function cancelAnimation<T>(sharedValue: SharedValue<T>): void {
  'worklet';
  // setting the current value cancels the animation if one is currently running
  sharedValue.value = sharedValue.value;
}
