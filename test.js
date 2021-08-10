const numberalToInteger = require("./main").numberalToInteger;

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

console.log(numberalToInteger("IV"));
console.log(numberalToInteger("VII"));
console.log(numberalToInteger("XXIV"));
console.log(numberalToInteger("XXXI"));
console.log(numberalToInteger("CCCLXIX"));
console.log(numberalToInteger("CD"));
console.log(numberalToInteger("CDXLVIII"));
console.log(numberalToInteger("MMDCCLI"));
