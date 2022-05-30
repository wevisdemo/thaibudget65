export function toLocaleWithFixed3Digits(num) {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
}
