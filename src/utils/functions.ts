export const removeObjectUndefined = (obj: { [key: string]: Object }): void =>
  Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key]);
