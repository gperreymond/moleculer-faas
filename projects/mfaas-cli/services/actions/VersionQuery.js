const chalk = require('chalk')

const { name, version, description } = require('../../package.json')

module.exports = {
  handler: async function (ctx) {
    console.log(chalk`
----------------------------------------------------------------------------------------------------------------------
Name: {green ${name}}
Description: {green ${description}}
Version: {green ${version}}
----------------------------------------------------------------------------------------------------------------------
Help
  {cyan mfaas-cli version} "output the current version"
  {cyan mfaas-cli up -f <dirpath/filename.yaml>} "build and deploy functions describe in <dirpath/filename.yaml>"
----------------------------------------------------------------------------------------------------------------------
    `)
    return true
  }
}
