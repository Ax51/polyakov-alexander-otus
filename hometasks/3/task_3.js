function getPath(element) {
  if (element?.id.length > 0) {
    return '#' + element.id
  }

  function getSiblings(el, count) {
    return el.previousElementSibling ? getSiblings(el.previousElementSibling, ++count) : count
  }

  function getTags(collection, el) {
    collection.push({ name: el.localName, number: getSiblings(el, 0) })
    return el.parentElement ? getTags(collection, el.parentElement) : collection
  }

  const tags = getTags([], element)
  let selector = ''
  do {
    const el = tags.pop()
    selector += el.name + (el.number ? `:nth-child(${el.number + 1})` : '') + '>'
  } while (tags.length)

  return selector.slice(0, -1)
}

getPath()
