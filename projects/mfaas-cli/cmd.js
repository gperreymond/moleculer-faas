#!/usr/bin/env node

const program = require('commander')
const { ServiceBroker } = require('moleculer')

program
  .command('help')
  .description('Help about any command')
  .action(async () => {
    const broker = new ServiceBroker({
      metrics: false,
      logger: false
    })
    await broker.loadServices()
    await broker.start()
    await broker.call('Commander.Help')
  })

program
  .command('version')
  .description('Display the clients version information')
  .action(async () => {
    const broker = new ServiceBroker({
      metrics: false,
      logger: false
    })
    await broker.loadServices()
    await broker.start()
    await broker.call('Commander.Version')
  })

program.parse(process.argv)
