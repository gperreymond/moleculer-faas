const sh = require('exec-sh')
const path = require('path')
const fse = require('fs-extra')
const uuid = require('uuid')
const yaml = require('yaml')

module.exports = {
  handler: async function (ctx) {
    const { FILE_YAML } = ctx.params
    const filepath = path.resolve(FILE_YAML)
    const root = path.dirname(filepath)
    const filename = path.basename(filepath)
    await this.WriteLogo()
    // file exist ?
    const exists = await fse.pathExists(`${root}/${filename}`)
    if (exists !== true) { return Promise.reject(new Error(`${FILE_YAML} not exists`)) }
    // load yaml
    const data = await fse.readFile(FILE_YAML, 'utf8')
    const content = yaml.parse(data)
    // service exists ?
    const functions = []
    Object.keys(content.functions).map(key => {
      functions.push(Object.assign(content.functions[key]))
    })
    do {
      const f = functions.shift()
      switch (f.lang) {
        case 'nodejs':
          // service exists ?
          var servicePath = path.resolve(root, f.service, 'index.js')
          var serviceExists = await fse.pathExists(servicePath)
          if (serviceExists === false) { throw new Error(`Lang: nodejs > Service ${servicePath} not exists`) }
          // create tmp dir
          console.log(f.alias, f.action)
          var tmpdir = `/var/tmp/moleculerfaas-fn/${uuid.v4()}`
          await fse.ensureDir(tmpdir)
          await fse.ensureDir(`${tmpdir}/services`)
          await fse.copy(`${root}/${f.service}`, `${tmpdir}/services`)
          await fse.copy(servicePath, `${tmpdir}/services/moleculerfaas.service.js`)
          break
        default:
          throw new Error(`Lang ${f.lang} not exists`)
      }
    } while (functions.length > 0)
    // const NAMESPACE = 'moleculerfaas-fn'
    /* await sh(`
      helm upgrade ${APP_NAME} ${KUBERNETES_REPOSITORY} \
        --set image.tag=${IMAGE_TAG} \
        --set image.repository=${IMAGE_REPOSITORY} \
        --set env=${ENV} \
        --set ingress.host=${INGRESS_HOST} \
        --set app.name=${APP_NAME} \
        --namespace=${NAMESPACE} \
        --install
    helm history ${APP_NAME}
    `) */
  }
}
