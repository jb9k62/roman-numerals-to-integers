const numeralMap = new Map();

numeralMap.set("I", 1);
numeralMap.set("V", 5);
numeralMap.set("X", 10);
numeralMap.set("L", 50);
numeralMap.set("C", 100);
numeralMap.set("D", 500);
numeralMap.set("M", 1000);

function numeralToInteger(numerals = "") {
  if (typeof numerals !== "string") {
    throw new ValidationError("Incorrect input.");
  }
  const chars = numerals.toUpperCase().split("");
  let workingTotal = 0;
  let next;

  for (let index = 0; index < chars.length; index++) {
    const currentChar = chars[index];
    if (new RegExp(`${currentChar}{4}`).test(numerals.substring(index))) {
      throw new ValidationError(
        "Four sequential occurrences of same numeral. Order should be different."
      );
    }
    const current = numeralMap.get(currentChar);
    if (!current) {
      throw new ValidationError("Unknown numeral encountered.");
    }
    if (index === 0 && !chars[index + 1]) {
      workingTotal = workingTotal + current;
    } else {
      const nextChar = chars[index + 1];
      if (nextChar) {
        next = numeralMap.get(nextChar);
        if (!next) {
          throw new ValidationError("Unknown numeral encountered.");
        }
        const charAfterNext = chars[index + 2];
        if (charAfterNext) {
          const intAfterNext = numeralMap.get(charAfterNext);
          if (!intAfterNext) {
            throw new ValidationError("Unknown numeral encountered.");
          }
          if (next > current && intAfterNext > current) {
            throw new ValidationError("Incorrect sequence of numerals.");
          }
        }
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

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

module.exports = {
  numeralToInteger,
  ValidationError,
};
