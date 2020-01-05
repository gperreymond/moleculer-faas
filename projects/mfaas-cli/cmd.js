#!/usr/bin/env node

const program = require('commander')
const { ServiceBroker } = require('moleculer')

program
  .command('version')
  .description('output the current version')
  .action(async () => {
    const broker = new ServiceBroker({
      metrics: false,
      logger: false
    })
    await broker.loadServices()
    await broker.start()
    await broker.call('Commander.VersionQuery')
  })

program.parse(process.argv)
