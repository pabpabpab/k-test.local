export default function getUniqueSerialNumbers(serialNumbers: string): string {
  const numbersArr = serialNumbers.split('\n');
  return Array.from(new Set(numbersArr)).join('\n');
}
