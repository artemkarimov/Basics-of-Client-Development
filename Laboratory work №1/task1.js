'use strict';

// 1.

const arr = n => {
  const array = [];
  for (let i = 0; i < n; i++) {
    array.push(i);
  }
  return array;
};

console.log(arr(8));
console.log(arr(51));

// 2.

const areDividers = (a, b, c) => !(a % b || a % c);

console.log(areDividers(30, 10, 15));
console.log(areDividers(12, 6, 5));

//

const capitilise = string => string[0].toUpperCase() + string.substr(1);

console.log(capitilise('software'));
console.log(capitilise('engineer'));
