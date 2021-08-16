const numeralMap = new Map();

numeralMap.set("I", 1);
numeralMap.set("V", 5);
numeralMap.set("X", 10);
numeralMap.set("L", 50);
numeralMap.set("C", 100);
numeralMap.set("D", 500);
numeralMap.set("M", 1000);

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
