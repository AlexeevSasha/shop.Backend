export const removeKeysFromObject = <T extends object, K>(object: T, keys: string[]): K => {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => (!keys.includes(key) ? [key, value] : []))
  );
};
