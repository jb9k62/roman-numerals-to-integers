const numerals = new Map();

numerals.set('I', 1)
numerals.set('V', 5)
numerals.set('X', 10)
numerals.set('L', 50)
numerals.set('C', 100)
numerals.set('D', 500)
numerals.set('M', 1000)

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
