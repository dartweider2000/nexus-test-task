export const convertObjectToSearchParams = (obj: object) => {
  const list = Object.entries(obj);
  const searchParams = new URLSearchParams();

  list.forEach(([key, value]) => {
    switch (typeof value) {
      case "object":
      case "function":
      case "undefined":
        return;
    }

    searchParams.set(key, `${value}`);
  });

  return searchParams;
};
