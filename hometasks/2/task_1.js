/* AsyncReducer */

async function asyncReducer(arr, func, startVal) {
  if (!Array.isArray(arr) || !(func instanceof Function) || startVal == null) {
    throw new Error('Incorrect function call')
  }
  let result = startVal

  for await (let prom of arr) {
    result = func(result, prom)
  }

  return result
}

const asyncTimer = (income = 'hello world', time = 1000) =>
  new Promise(res => setTimeout(() => res(income), time))

const promisesArr = [
  asyncTimer('Hello', 3000),
  asyncTimer('World', 1000),
  asyncTimer('!!', 300),
  asyncTimer('Say', 1000),
  asyncTimer('your', 300),
  asyncTimer('name', 50),
  asyncTimer('?', 20)
]

asyncReducer(promisesArr, (a, b) => a + b + ' ', '').then(console.log)
// Expected: 'Hello World !! Say your name ? '
