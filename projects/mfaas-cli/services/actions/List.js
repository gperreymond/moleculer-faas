const sh = require('exec-sh')

module.exports = {
  handler: async function (ctx) {
    const NAMESPACE = 'moleculerfaas-fn'
    await this.WriteLogo()
    await sh(`helm list --namespace ${NAMESPACE}`)
  }
}
