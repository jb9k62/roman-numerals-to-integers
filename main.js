const ADD_OPERATION = "ADD";
const SUBTRACT_OPERATION = "SUBTRACT";

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
  getNumeralMap() {
    return this.#numeralMap;
  }
  start() {
    let processIndex = 0;
    do {
      const numeral = new Numeral(
        this.#numerals[processIndex],
        this.getNumeralMap()
      );
      const result = numeral.process(this.#numerals, processIndex);
      if (result.operation === ADD_OPERATION) {
        this.#total = this.#total + result.value;
      } else {
        this.#total = this.#total - result.value;
      }
      processIndex = result.nextIndex;
    } while (processIndex);
    return this.#total;
  }
}

class Numeral {
  #numeral;
  #numeralValue;
  #numeralMap;

  constructor(numeral, map) {
    if (!numeral || !(map instanceof Map)) {
      throw new ValidationError("Instantiated with incorrect arguments.");
    }
    this.#numeral = numeral;
    this.#numeralMap = map;
    this.#numeralValue = this.#getNumeralValue(numeral);
  }

  #getNumeralValue(numeral) {
    const value = this.#numeralMap.get(numeral);
    if (!value) {
      throw new ValidationError(
        `Numeral ${numeral} is not defined in Roman numeral set.`
      );
    }
    return value;
  }

  process(numerals, index) {
    this.#validateNoMoreThanThreeOfSameOccurSequentially(
      numerals.substring(index)
    );

    let previous;
    let next;
    let afterNext;
    if (index > 0) {
      previous = this.#getNumeralValue(numerals[index - 1]);
    }
    if (index + 1 < numerals.length) {
      next = this.#getNumeralValue(numerals[index + 1]);
    }
    if (index + 2 < numerals.length) {
      afterNext = this.#getNumeralValue(numerals[index + 2]);
    }
    const current = this.#getNumeralValue(numerals[index]);
    if (next && afterNext) {
      this.#validateNextTwoArentLarger(
        next,
        afterNext,
        numerals.substring(index)
      );
    }

    if (numerals.length === 1) {
      return {
        value: current,
        operation: ADD_OPERATION,
        nextIndex: null,
      };
    }
    if (next) {
      return {
        value: next <= current ? current : next - current,
        operation: ADD_OPERATION,
        nextIndex: next <= current ? index + 1 : afterNext ? index + 2 : null,
      };
    } else {
      return {
        value: current,
        operation: previous >= current ? ADD_OPERATION : SUBTRACT_OPERATION,
        nextIndex: null,
      };
    }
  }
  #validateNoMoreThanThreeOfSameOccurSequentially(string) {
    if (new RegExp(`${this.#numeral}{4}`).test(string)) {
      throw new ValidationError(
        "Four sequential occurrences of same numeral. Order should be different."
      );
    }
  }
  #validateNextTwoArentLarger(next, afterNext, numeralSubString) {
    if (next > this.#numeralValue && afterNext > this.#numeralValue) {
      throw new ValidationError(
        `Numerals ${numeralSubString.substring(
          0,
          3
        )} is not in the correct order.`
      );
    }
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

module.exports = { Converter, ValidationError };
