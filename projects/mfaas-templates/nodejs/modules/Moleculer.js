const { ServiceBroker } = require('moleculer')

const Configuration = require('./Configuration')

class Moleculer {
  constructor () {
    this._instance = new ServiceBroker({
      ...Configuration.moleculer,
      async started (broker) {
        broker.logger.warn('Broker started')
      },
      stopped: async (broker) => {
        broker.logger.warn('Broker stopped')
      }
    })
  }

  getInstance () {
    return this._instance
  }

  async initialize () {
    const broker = this.getInstance()
    await broker.loadServices()
  }

  async start () {
    const broker = this.getInstance()
    await broker.start()
  }

  async stop () {
    const broker = this.getInstance()
    await broker.stop()
  }
}

module.exports = Moleculer
