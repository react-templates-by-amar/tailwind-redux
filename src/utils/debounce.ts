export type DebouncedFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => void;

/**
 * Creates a debounced function that delays invoking `func` until after `wait` milliseconds
 * have elapsed since the last time the debounced function was invoked.
 *
 * @param func The function to debounce
 * @param wait The number of milliseconds to delay
 * @param options The options object
 * @param options.leading Specify invoking on the leading edge of the timeout
 * @param options.maxWait The maximum time `func` is allowed to be delayed before it's invoked
 * @returns The new debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number = 300,
  options: { leading?: boolean; maxWait?: number } = {}
): DebouncedFunction<T> & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastCallTime: number | null = null;
  let lastInvokeTime = 0;
  let maxWait = options.maxWait;
  let leading = options.leading || false;
  let lastArgs: Parameters<T> | null = null;
  let result: ReturnType<T>;

  const shouldInvoke = (time: number) => {
    if (lastCallTime === null) return false;
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, or it's been long enough since the last call
    return (
      lastCallTime === null ||
      timeSinceLastCall >= wait ||
      (maxWait !== undefined && timeSinceLastInvoke >= maxWait)
    );
  };

  const invokeFunc = (time: number) => {
    const args = lastArgs as Parameters<T>;
    lastArgs = null;
    lastInvokeTime = time;
    if (args) {
      result = func(...args);
    }
    return result;
  };

  const startTimer = (pendingFunc: () => void, wait: number) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(pendingFunc, wait);
  };

  const leadingEdge = (time: number) => {
    lastInvokeTime = time;
    startTimer(timerExpired, wait);
    if (leading) {
      return invokeFunc(time);
    }
    return result;
  };

  const remainingWait = (time: number) => {
    const timeSinceLastCall = time - (lastCallTime || 0);
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;

    return maxWait !== undefined
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  };

  const shouldInvokeTime = (time: number) => {
    const timeSinceLastCall = time - (lastCallTime || 0);
    const timeSinceLastInvoke = time - lastInvokeTime;

    return (
      lastCallTime === null ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxWait !== undefined && timeSinceLastInvoke >= maxWait)
    );
  };

  const timerExpired = () => {
    const time = Date.now();
    if (shouldInvokeTime(time)) {
      return trailingEdge(time);
    }
    startTimer(timerExpired, remainingWait(time));
  };

  const trailingEdge = (time: number) => {
    timeoutId = null;
    if (lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = null;
    return result;
  };

  const debounced = function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);

    lastArgs = args;
    lastCallTime = time;

    if (isInvoking) {
      if (timeoutId === null) {
        return leadingEdge(lastCallTime);
      }
      if (maxWait !== undefined) {
        // Handle invocations in a tight loop.
        startTimer(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timeoutId === null) {
      startTimer(timerExpired, wait);
    }
    return result;
  };

  debounced.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    lastInvokeTime = 0;
    lastCallTime = null;
    lastArgs = null;
    timeoutId = null;
  };

  return debounced as DebouncedFunction<T> & { cancel: () => void };
}

/**
 * A simpler debounce implementation that only handles the basic use case.
 * Use this if you don't need the full feature set of the main debounce function.
 *
 * @param func The function to debounce
 * @param wait The number of milliseconds to delay
 * @returns The new debounced function
 */
export function simpleDebounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number = 300
): DebouncedFunction<T> & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debounced = function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
      timeoutId = null;
    }, wait);
  };

  debounced.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debounced as DebouncedFunction<T> & { cancel: () => void };
}
