export default function getRegExpForMask(mask: string): string {
  const reBook = {
    N: '[0-9]{1}',
    A: '[A-Z]{1}',
    a: '[a-z]{1}',
    X: '[A-Z0-9]{1}',
    Z: '[-_@]{1}',
  };
  const regexpArr: string[] = [...mask].map((item) => reBook[item as keyof typeof reBook]);
  return `^${regexpArr.join('')}$`;
}
