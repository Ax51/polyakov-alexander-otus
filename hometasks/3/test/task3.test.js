import getPath from "../task_3.js"

const someElem = document.querySelector(".body>.block>.text")
const $0 = document.createElement("div")
$0.className = "no-matter-class"
someElem.append($0)

const testUnique = document.querySelectorAll(getPath($0)).length === 1

const testEquality = document.querySelectorAll(getPath($0))[0] === $0

console.log("element placed at:", getPath($0))
console.log("Test for unique:", testUnique ? "passed" : "failed")
console.log("Test for equality:", testEquality ? "passed" : "failed")

if (!testUnique || !testEquality) {
  console.error("Some of the tests failed")
}
