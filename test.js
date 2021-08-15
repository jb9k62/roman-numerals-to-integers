const assert = require("assert");

const numberalToInteger = require("./main").numberalToInteger;

console.log("Running tests...");
assert.strictEqual(numberalToInteger("IV"), 4);
assert.strictEqual(numberalToInteger("VII"), 7);
assert.strictEqual(numberalToInteger("XXIV"), 24);
assert.strictEqual(numberalToInteger("XXXI"), 31);
assert.strictEqual(numberalToInteger("CCCLXIX"), 369);
assert.strictEqual(numberalToInteger("CD"), 400);
assert.strictEqual(numberalToInteger("CDXLVIII"), 448);
assert.strictEqual(numberalToInteger("MMDCCLI"), 2751);
console.log("Tests passed.");
