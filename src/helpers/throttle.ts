export const throttle = (callback: Function, delayMs: number) => {
  let currentTimeout: null | number = null;
  
  if (currentTimeout) {
    clearTimeout(currentTimeout);
    currentTimeout = null;
  }

  currentTimeout = setTimeout(callback, delayMs);
}