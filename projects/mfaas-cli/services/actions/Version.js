const chalk = require('chalk')

const { version } = require('../../package.json')

module.exports = {
  handler: async function (ctx) {
    await this.WriteLogo()
    console.log(chalk`{white CLI:
 ${'version:'.padEnd(12, ' ')} ${version}}`)
  }
}
