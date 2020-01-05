const sh = require('exec-sh')

module.exports = {
  handler: async function (ctx) {
    await this.WriteLogo()
    await sh('mfaas-cli --help')
  }
}
