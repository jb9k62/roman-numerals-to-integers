const assert = require("assert");

const { numeralToInteger, ValidationError } = require("./main");

console.log("Running tests...");
assert.strictEqual(numeralToInteger("IV"), 4);
assert.strictEqual(numeralToInteger("VII"), 7);
assert.strictEqual(numeralToInteger("XXIV"), 24);
assert.strictEqual(numeralToInteger("XXXI"), 31);
assert.strictEqual(numeralToInteger("CCCLXIX"), 369);
assert.strictEqual(numeralToInteger("CD"), 400);
assert.strictEqual(numeralToInteger("CDXLVIII"), 448);
assert.strictEqual(numeralToInteger("MMDCCLI"), 2751);
assert.strictEqual(numeralToInteger("LIV"), 54);
assert.throws(() => numeralToInteger([]), {
  name: ValidationError.name,
  message: "Incorrect input.",
});
assert.throws(() => numeralToInteger("IVL"), {
  name: ValidationError.name,
  message: "Incorrect sequence of numerals.",
});
assert.throws(() => numeralToInteger("XXXXI"), {
  name: ValidationError.name,
  message:
    "Four sequential occurrences of same numeral. Order should be different.",
});
assert.throws(() => numeralToInteger("B"), {
  name: ValidationError.name,
  message: "Unknown numeral encountered.",
});
assert.throws(() => numeralToInteger("VB"), {
  name: ValidationError.name,
  message: "Unknown numeral encountered.",
});
console.log("Tests passed.");
