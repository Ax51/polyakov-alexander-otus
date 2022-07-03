function countItems(arr) {
  const result = {}
  arr.forEach(i => (result[i] ? result[i]++ : (result[i] = 1)))
  return result
}

function filterItemsToCheck(obj) {
  const result = []
  const lettersObj = {}
  const letters = Object.keys(obj)
  letters.forEach(letter => {
    const count = obj[letter]
    if (count > 1) {
      lettersObj[letter] = [count]
      result.push(letter)
    }
  })
  return [result, lettersObj]
}

function maxItemAssociation(arr) {
  const res = []
  const countedItems = countItems(arr.flat(1))
  const [itemsToCheck] = filterItemsToCheck(countedItems)

  for (let shoppingList of arr) {
    let alreadyAdded = false
    itemsToCheck.forEach(i => {
      console.log('Check item: ', i, 'in ', shoppingList)
      if (~shoppingList.indexOf(i) && !alreadyAdded) {
        res.push(shoppingList)
        alreadyAdded = true
      }
    })
  }

  const result = [...new Set(res.flat(1))].sort((a, b) => a.localeCompare(b))

  return result
}

console.log(
  maxItemAssociation([
    ['q', 'w', 'a'],
    ['a', 'b'],
    ['a', 'c'],
    ['q', 'e'],
    ['q', 'r']
  ])
)
console.log(
  maxItemAssociation([
    ['q', 'w', 'a', 'g'],
    ['a', 'b'],
    ['a', 'c', 'e'],
    ['f', 'e'],
    ['q', 'r']
  ])
)

console.log(
  maxItemAssociation([
    ['a', 'b'],
    ['a', 'c'],
    ['d', 'e']
  ])
)
