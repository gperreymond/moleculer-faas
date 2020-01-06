const sh = require('exec-sh')
const path = require('path')

module.exports = {
  handler: async function (ctx) {
    const { RABBITMQ_VALUES } = ctx.params
    const NAMESPACE = 'moleculerfaas'
    const RABBITMQ_VALUES_PATH = path.resolve(__dirname, '../..', RABBITMQ_VALUES)
    await this.WriteLogo()
    await sh(`kubectl create namespace ${NAMESPACE}`, true)
    // helm update charts repositories
    await sh(`
      helm repo add openfaas https://openfaas.github.io/faas-netes && \
      helm repo add bitnami https://charts.bitnami.com && \
      helm repo add ory https://k8s.ory.sh/helm/charts && \
      helm repo add adwerx https://adwerx.github.io/charts
    `)
    // install rabbitmq
    await sh(`
      helm upgrade rabbitmq bitnami/rabbitmq \
      --values ${RABBITMQ_VALUES_PATH} \
      --namespace ${NAMESPACE} \
      --install
    `)
  }
}
