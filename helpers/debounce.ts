export const debounce = (callback: () => unknown, ms: number) => {
  let timeout: NodeJS.Timeout;
  return () => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      callback();
    }, ms);
  };
};
