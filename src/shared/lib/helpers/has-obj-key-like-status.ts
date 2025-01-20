export function hasObjKeyLikeStatus(obj: Record<string, any>): any {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (key.toLowerCase() === "status") {
        return +obj[key];
      }
    }
  }
  return -1;
}
