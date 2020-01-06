#!/usr/bin/env node

const program = require('commander')
const { ServiceBroker } = require('moleculer')

program
  .name('mfaas-cli')
  .usage('[command] [options]')
  .helpOption('-h, --help', 'Help for MoleculerFaas')

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

program
  .command('auth')
  .description('Obtain a token for your MoleculerFaas gateway')
  .action(async () => {
  })

program
  .command('deploy')
  .description('Deploy MoleculerFaas functions')
  .option('-n, --name <APP_NAME>', 'The name to use for the MoleculerFaas')
  .option('-e, --env <ENV>', 'Environement to execute the MoleculerFaas', 'development')
  .option('-i, --image-repository <IMAGE_REPOSITORY>', 'The docker repository to use')
  .option('-t, --image-tag <IMAGE_TAG>', 'The docker tag to use', 'latest')
  .option('-h, --ingress-host <INGRESS_HOST>', 'The hostname to use for ingress controller')
  .option('-r, --replicas <REPLICAS>', 'The number of replicas to implement', 2)
  .action(async (cmd) => {
    const { env: ENV, name: APP_NAME, replicas: REPLICAS, ingressHost: INGRESS_HOST, imageRepository: IMAGE_REPOSITORY, imageTag: IMAGE_TAG } = cmd
    const broker = new ServiceBroker({
      metrics: false,
      logger: false
    })
    await broker.loadServices()
    await broker.start()
    await broker.call('Commander.Deploy', { ENV, APP_NAME, IMAGE_REPOSITORY, IMAGE_TAG, INGRESS_HOST, REPLICAS })
  })

program
  .command('list')
  .description('List MoleculerFaas functions')
  .action(async () => {
    const broker = new ServiceBroker({
      metrics: false,
      logger: false
    })
    await broker.loadServices()
    await broker.start()
    await broker.call('Commander.List')
  })

program.parse(process.argv)
