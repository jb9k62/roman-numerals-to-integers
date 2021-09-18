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
    const linkedNumerals = this.#numerals
      .split("")
      .map((numeral) => new LinkedNumeral(new Numeral(numeral, getValue)))
      .map((linkedNumeral, index, array) => {
        linkedNumeral.setPrevious(array[index - 1]);
        linkedNumeral.setNext(array[index + 1]);
        return linkedNumeral;
      });

    do {
      const currentLinkedNumeral = linkedNumerals[processIndex];
      const currentValue = LinkedNumeral.tryGetOrNull(() =>
        currentLinkedNumeral.getOwnValue()
      );
      if (linkedNumerals.length === 1) {
        return (this.#total += currentValue);
      }
      Converter.#validateNoMoreThanThreeOfSameOccurSequentially(
        this.#numerals.substring(processIndex)
      );
      const nextValue = LinkedNumeral.tryGetOrNull(() =>
        currentLinkedNumeral.getNext().getOwnValue()
      );
      const afterNextValue = LinkedNumeral.tryGetOrNull(() =>
        currentLinkedNumeral.getNext().getNext().getOwnValue()
      );
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
        if (
          LinkedNumeral.tryGetOrNull(() =>
            currentLinkedNumeral.getPrevious().getOwnValue()
          ) >= currentValue
        ) {
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

class LinkedNumeral {
  #numeral;
  #previous;
  #next;
  constructor(numeral) {
    this.#numeral = numeral;
  }
  static tryGetOrNull(fn) {
    try {
      return fn();
    } catch (error) {
      return null;
    }
  }
  getOwnValue() {
    return this.#numeral.getValue();
  }
  getPrevious() {
    return this.#previous;
  }
  setPrevious(linkedNumeral) {
    this.#previous = linkedNumeral;
  }
  getNext() {
    return this.#next;
  }
  setNext(linkedNumeral) {
    this.#next = linkedNumeral;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

module.exports = { Converter, ValidationError };
