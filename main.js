const numeralMap = new Map();

numeralMap.set("I", 1);
numeralMap.set("V", 5);
numeralMap.set("X", 10);
numeralMap.set("L", 50);
numeralMap.set("C", 100);
numeralMap.set("D", 500);
numeralMap.set("M", 1000);

/*
 * IV            = 4
 * VII           = 7
 * XXIV          = 24
 * XXXI          = 31
 * CCCLXIX       = 369
 * CD            = 400
 * CDXLVIII      = 448
 * MMDCCLI       = 2751
 *
 * smaller infront of larger = subtract
 * larger after smaller = addition
 * */

/*
 * string
 * split -> array of chars
 * loop
 *   current
 *   previous
 *   next
 *   total
 *
 *  if first iter
 *   add to total
 *
 *  each iter thereafter,
 *   get value
 *     if next is truthy
 *          if next is equal or smaller
 *               ADD
 *          else
 *               take next value, subtraxct current, ?skip next iteration?
 *
 *     else
 *        if previous is equal or bigger
 *           ADD
 *        else
 *           SUBTRACT
 * */

function numberalToInteger(numerals) {
  const chars = numerals.split("");
  let workingTotal = 0;
  let next;

  for (let index = 0; index < chars.length; index++) {
    const currentChar = chars[index];
    const current = numeralMap.get(currentChar);
    if (index === 0 && !chars[index + 1]) {
      workingTotal = workingTotal + current;
    } else {
      const nextChar = chars[index + 1];
      if (nextChar) {
        next = numeralMap.get(nextChar);
        if (next <= current) {
          workingTotal = workingTotal + current;
        } else {
          workingTotal = workingTotal + (next - current);
          index++;
        }
      } else {
        const previous = numeralMap.get(chars[index - 1]);
        if (previous >= current) {
          workingTotal = workingTotal + current;
        } else {
          workingTotal = workingTotal - current;
        }
      }
    }
  }

  return workingTotal;
}

module.exports = {
  numberalToInteger,
};
