const fs = require('fs/promises')
const path = require('path')

const files = []
const folders = []
async function read(input) {
  return fs.realpath(input)
    .then(fs.opendir)
    .then(async currDir => {
      for await (const i of currDir) {
        const pathToItem = path.join(input, i.name)
        if (i.isDirectory()) {
          folders.push(pathToItem)
          await read(pathToItem)
        } else {
          files.push(pathToItem)
        }
      }
      return { files, folders }
    })
}

module.exports = (path =>
  read(path).then(res => {
    console.log(res)
    return res
  }))(process.argv[2])
