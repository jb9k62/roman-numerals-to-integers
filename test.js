const assert = require("assert");

const { Converter, ValidationError } = require("./main");

console.log("Running tests...");
assert.strictEqual(new Converter("IV").start(), 4);
assert.strictEqual(new Converter("VII").start(), 7);
assert.strictEqual(new Converter("XXIV").start(), 24);
assert.strictEqual(new Converter("XXXI").start(), 31);
assert.strictEqual(new Converter("CCCLXIX").start(), 369);
assert.strictEqual(new Converter("CD").start(), 400);
assert.strictEqual(new Converter("CDXLVIII").start(), 448);
assert.strictEqual(new Converter("MMDCCLI").start(), 2751);
assert.strictEqual(new Converter("LIV").start(), 54);
assert.strictEqual(new Converter("XLIV").start(), 44);
assert.strictEqual(new Converter("XXIX").start(), 29);
assert.strictEqual(new Converter("XLV").start(), 45);
assert.strictEqual(new Converter("LXVIII").start(), 68);
assert.strictEqual(new Converter("LXXXIII").start(), 83);
assert.strictEqual(new Converter("XCVII").start(), 97);
assert.strictEqual(new Converter("XCIX").start(), 99);
assert.strictEqual(new Converter("D").start(), 500);
assert.strictEqual(new Converter("DI").start(), 501);
assert.strictEqual(new Converter("DCXLIX").start(), 649);
assert.strictEqual(new Converter("DCCXCVIII").start(), 798);
assert.strictEqual(new Converter("DCCCXCI").start(), 891);
assert.strictEqual(new Converter("M").start(), 1000);
assert.strictEqual(new Converter("MIV").start(), 1004);
assert.strictEqual(new Converter("MVI").start(), 1006);
assert.strictEqual(new Converter("MXXIII").start(), 1023);
assert.strictEqual(new Converter("MMXIV").start(), 2014);
assert.strictEqual(new Converter("MMMCMXCIX").start(), 3999);
assert.throws(() => new Converter([]), {
  name: ValidationError.name,
  message: "Incorrect input.",
});
assert.throws(() => new Converter("IVL").start(), {
  name: ValidationError.name,
  message: "Numerals IVL is not in the correct order.",
});
assert.throws(() => new Converter("XXXXI").start(), {
  name: ValidationError.name,
  message:
    "Four sequential occurrences of same numeral. Order should be different.",
});
assert.throws(() => new Converter("B").start(), {
  name: ValidationError.name,
  message: "Numeral B is not defined in Roman numeral set.",
});
assert.throws(() => new Converter("VB").start(), {
  name: ValidationError.name,
  message: "Numeral B is not defined in Roman numeral set.",
});
console.log("Tests passed.");
