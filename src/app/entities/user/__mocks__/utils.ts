export function limitOffset<T>(array: T[], limit: number, offset: number): T[] {
  if (!array) return [];

  const length = array.length;

  if (!length) {
    return [];
  }
  if (offset > length - 1) {
    return [];
  }

  const start = Math.min(length - 1, offset);
  const end = Math.min(length, offset + limit);

  return array.slice(start, end);
}
