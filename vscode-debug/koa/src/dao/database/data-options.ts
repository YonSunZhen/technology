export function DataOptions<T>(options: T): T {
  if (!options) {
    return {} as T;
  }
  options = { ...options };
  for (const key in options) {
    if (options[key] === undefined) {
      delete options[key];
    }
  }
  return options;
}
