const sh = require('exec-sh')
const path = require('path')

module.exports = {
  handler: async function (ctx) {
    console.log(ctx.params)
    const { ENV, NAMESPACE, IMAGE_REPOSITORY, IMAGE_TAG, INGRESS_HOST, APP_NAME } = ctx.params
    const KUBERNETES_REPOSITORY = path.resolve(__dirname, '../../kubernetes')
    await this.WriteLogo()
    await sh(`kubectl create namespace ${NAMESPACE}`, true)
    await sh(`
      helm upgrade ${APP_NAME} ${KUBERNETES_REPOSITORY} \
        --set image.tag=${IMAGE_TAG} \
        --set image.repository=${IMAGE_REPOSITORY} \
        --set env=${ENV} \
        --set ingress.host=${INGRESS_HOST} \
        --set app.name=${APP_NAME} \
        --namespace=${NAMESPACE} \
        --install \
        --debug
    helm history ${APP_NAME}
    `)
  }
}
