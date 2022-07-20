const fs = require('fs/promises')

async function read(currDir) {
  const files = []
  const folders = []
  for await (let i of currDir) {
    if (i.isDirectory()) {
      folders.push(`${currDir.path}/${i.name}`)
    } else {
      files.push(`${currDir.path}/${i.name}`)
    }
  }
  return { files, folders }
}

module.exports = path =>
  fs
    .realpath(path)
    .then(fs.opendir)
    .then(read)
    .then(res => {
      console.log(res)
      return res
    })

module.exports(process.argv[2])
