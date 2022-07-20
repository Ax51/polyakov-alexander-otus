function summarize(...numArr) {
  // Variant 1
  // return numArr.reduce((acc, cur) => acc + cur, 0)

  // Variant 2
  let result = 0

  for (let i = 0; i < numArr.length; i++) {
    result += numArr[i]
  }

  return result
}

function substract(...numArr) {
  // Variant 1
  // return numArr.slice(1).reduce((acc, cur) => acc - cur, numArr[0])

  // Variant 2
  let result = numArr[0]

  for (let i = 1; i < numArr.length; i++) {
    result -= numArr[i]
  }

  return result
}

function curry(func) {
  let argsArr = []
  return function curried(...args) {
    if (args.length === 0) {
      return func(...argsArr)
    } else {
      argsArr = [...argsArr, ...args]
      return function (...args2) {
        return curried.apply(this, args2)
      }
    }
  }
}
const sum = curry(summarize)
const sub = curry(substract)

console.log(sum(35)(5)(60)()) //expected 100
console.log(sub(60)(35)(5)()) //expected 20
