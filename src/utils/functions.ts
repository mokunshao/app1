export const removeObjectUndefined = (obj: { [key: string]: unknown }): void =>
  Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key]);
