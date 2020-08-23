export const random = (n: number = 8) =>
  Math.random().toString(36).substring(2, n) +
  Math.random().toString(36).substring(2, n)
