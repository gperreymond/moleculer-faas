const nconf = require('nconf')
nconf.argv().env().file({ file: 'nconf.json' })

// ************************************
// Typecasting from kube env
// ************************************
let APP_MOLECULER_LOGGER = true
let APP_MOLECULER_METRICS = true
let APP_NATS_PORT = 4222
// ************************************
if (nconf.get('APP_MOLECULER_LOGGER')) { APP_MOLECULER_LOGGER = nconf.get('APP_MOLECULER_LOGGER') === 'true' }
if (nconf.get('APP_MOLECULER_METRICS')) { APP_MOLECULER_METRICS = nconf.get('APP_MOLECULER_METRICS') === 'true' }
if (nconf.get('APP_NATS_PORT')) { APP_NATS_PORT = parseInt(nconf.get('APP_NATS_PORT')) }
// ************************************

const APP_NATS_HOSTNAME = nconf.get('APP_NATS_HOSTNAME') || 'nats-client.moleculerfaas.svc.cluster.local'
const APP_NATS_USERNAME = nconf.get('APP_NATS_USERNAME') || 'infra'
const APP_NATS_PASSWORD = nconf.get('APP_NATS_PASSWORD') || 'infra'

const APP_MOLECULER_TRANSPORTER = {
  type: 'NATS',
  options: {
    url: `nats://${APP_NATS_HOSTNAME}:${APP_NATS_PORT}`,
    user: APP_NATS_USERNAME,
    pass: APP_NATS_PASSWORD
  }
}

module.exports = {
  env: process.env.NODE_ENV || 'development',
  moleculer: {
    validation: true,
    logger: APP_MOLECULER_LOGGER,
    transporter: (process.env.NODE_ENV !== 'test') ? APP_MOLECULER_TRANSPORTER : null,
    metrics: {
      enabled: APP_MOLECULER_METRICS,
      reporter: [{
        type: 'Prometheus',
        options: {
          port: 3030,
          path: '/metrics',
          defaultLabels: registry => ({
            namespace: registry.broker.namespace,
            nodeID: registry.broker.nodeID
          })
        }
      }]
    }
  }
}
