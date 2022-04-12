export default function getUniqueSerialNumber(serialNumber: string): string {
  const numbersArr = serialNumber.split('\n');
  return Array.from(new Set(numbersArr)).join('\n');
}
