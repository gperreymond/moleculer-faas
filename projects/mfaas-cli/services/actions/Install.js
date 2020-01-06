const sh = require('exec-sh')
const path = require('path')

module.exports = {
  handler: async function (ctx) {
    const { RABBITMQ_VALUES, NATS_VALUES } = ctx.params
    const NAMESPACE = 'moleculerfaas'
    const RABBITMQ_VALUES_PATH = path.resolve(__dirname, '../..', RABBITMQ_VALUES)
    const NATS_VALUES_PATH = path.resolve(__dirname, '../..', NATS_VALUES)
    console.log(NATS_VALUES_PATH)
    await this.WriteLogo()
    await sh(`kubectl create namespace ${NAMESPACE}`, true)
    // helm update charts repositories
    await sh('helm repo add bitnami https://charts.bitnami.com')
    // install rabbitmq
    await sh(`
      helm upgrade rabbitmq bitnami/rabbitmq \
      --values ${RABBITMQ_VALUES_PATH} \
      --namespace ${NAMESPACE} \
      --install
    `)
    // install nats
    await sh(`
      helm upgrade nats bitnami/nats \
      --values ${NATS_VALUES_PATH} \
      --namespace ${NAMESPACE} \
      --install
    `)
  }
}
