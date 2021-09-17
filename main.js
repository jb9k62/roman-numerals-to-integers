class Converter {
  #numeralMap = new Map(
    Object.entries({ I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 })
  );
  #numerals;
  #total = 0;
  constructor(numerals) {
    if (typeof numerals !== "string") {
      throw new ValidationError("Incorrect input.");
    }
    this.#numerals = numerals.toUpperCase();
  }
  static #validateNoMoreThanThreeOfSameOccurSequentially(numerals) {
    if (new RegExp(`${numerals[0]}{4}`).test(numerals)) {
      throw new ValidationError(
        "Four sequential occurrences of same numeral. Order should be different."
      );
    }
  }
  static #validateNextTwoArentLarger({
    current,
    next,
    afterNext,
    numeralSubString,
  }) {
    if (next > current && afterNext > current) {
      throw new ValidationError(
        `Numerals ${numeralSubString.substring(
          0,
          3
        )} is not in the correct order.`
      );
    }
  }
  getNumeralValue(numeral) {
    const value = this.#numeralMap.get(numeral);
    if (!value) {
      throw new ValidationError(
        `Numeral ${numeral} is not defined in Roman numeral set.`
      );
    }
    return value;
  }
  start() {
    let processIndex = 0;
    const getValue = this.getNumeralValue.bind(this);
    const linkedNumerals = this.#numerals.split("").map(
      (numeral, index) =>
        new NumeralWithCertainSiblings({
          getNumeralIntegerValue: getValue,
          numerals: this.#numerals,
          index,
        })
    );

    do {
      const currentLinkedNumeral = linkedNumerals[processIndex];
      const currentValue = currentLinkedNumeral.getValue();
      if (linkedNumerals.length === 1) {
        return (this.#total += currentValue);
      }
      Converter.#validateNoMoreThanThreeOfSameOccurSequentially(
        this.#numerals.substring(processIndex)
      );
      const nextValue = currentLinkedNumeral.getNext();
      const afterNextValue = currentLinkedNumeral.getAfterNext();
      if (nextValue && afterNextValue) {
        Converter.#validateNextTwoArentLarger({
          current: currentValue,
          next: nextValue,
          afterNext: afterNextValue,
          numeralSubString: this.#numerals.substring(processIndex),
        });
      }
      if (nextValue) {
        if (nextValue <= currentValue) {
          this.#total += currentValue;
          processIndex += 1;
        } else {
          this.#total += nextValue - currentValue;
          if (afterNextValue) {
            processIndex += 2;
          } else {
            processIndex = null;
          }
        }
      } else {
        if (currentLinkedNumeral.getPrevious() >= currentValue) {
          this.#total += currentValue;
        } else {
          this.#total -= currentValue;
        }
        processIndex = null;
      }
    } while (processIndex);
    return this.#total;
  }
}

class Numeral {
  #numeral;
  #numeralValue;

  constructor(numeral, getValue) {
    if (!numeral || typeof getValue !== "function") {
      throw new ValidationError("Instantiated with incorrect arguments.");
    }
    this.#numeral = numeral;
    this.#numeralValue = getValue(numeral);
  }

  getValue() {
    return this.#numeralValue;
  }
}

class NumeralWithCertainSiblings {
  #numeral;
  #previous;
  #next;
  #afterNext;
  #getValue;
  constructor({ getNumeralIntegerValue, numerals, index }) {
    this.#getValue = getNumeralIntegerValue;
    this.#numeral = new Numeral(numerals[index], this.#getValue).getValue();
    this.#previous = this.#valueOrNull(numerals[index - 1]);
    this.#next = this.#valueOrNull(numerals[index + 1]);
    this.#afterNext = this.#valueOrNull(numerals[index + 2]);
  }
  #valueOrNull(numeralOrUndefined) {
    return numeralOrUndefined
      ? new Numeral(numeralOrUndefined, this.#getValue).getValue()
      : null;
  }
  getValue() {
    return this.#numeral;
  }
  getPrevious() {
    return this.#previous;
  }
  getNext() {
    return this.#next;
  }
  getAfterNext() {
    return this.#afterNext;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

module.exports = { Converter, ValidationError };
