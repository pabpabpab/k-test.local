export default function getRegExpMismatches(serialNumber: string, regexpValue: string): string[] {
  const numbersArr = serialNumber.split('\n');
  const nonEmptyNumbersArr = numbersArr.filter((item) => item.length > 0);

  const re = new RegExp(regexpValue);
  return nonEmptyNumbersArr.filter((item) => !re.test(item));
}
