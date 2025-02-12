export function findTargetKey(
  obj: Record<string, any>,
  targetKey: string,
): string | number {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (key.toLowerCase().endsWith(targetKey.toLowerCase())) {
        return key; // Return the first matching key
      }
    }
  }
  return -1;
}
