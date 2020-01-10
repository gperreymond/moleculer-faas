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
    try {
      const broker = new ServiceBroker({
        metrics: false,
        logger: false
      })
      await broker.loadServices()
      await broker.start()
      await broker.call('Commander.Help')
    } catch (e) {
      console.log(e)
      process.exit(1)
    }
  })

program
  .command('version')
  .description('Display the clients version information')
  .action(async () => {
    try {
      const broker = new ServiceBroker({
        metrics: false,
        logger: false
      })
      await broker.loadServices()
      await broker.start()
      await broker.call('Commander.Version')
    } catch (e) {
      console.log(e)
      process.exit(1)
    }
  })

program
  .command('install')
  .description('Install all MoleculerFaas infrastructure and the gateway ui')
  .option('-r, --rabbitmq <RABBITMQ_VALUES>', 'The values filepath to initialize rabbitmq', 'moleculerfaas/rabbitmq/values.yaml')
  .option('-n, --nats <NATS_VALUES>', 'The values filepath to initialize nats', 'moleculerfaas/nats/values.yaml')
  .option('-m, --memcached <MEMCACHED_VALUES>', 'The values filepath to initialize memcached', 'moleculerfaas/memcached/values.yaml')
  .action(async (cmd) => {
    try {
      const { rabbitmq: RABBITMQ_VALUES, nats: NATS_VALUES, memcached: MEMCACHED_VALUES } = cmd
      const broker = new ServiceBroker({
        metrics: false,
        logger: false
      })
      await broker.loadServices()
      await broker.start()
      await broker.call('Commander.Install', { RABBITMQ_VALUES, NATS_VALUES, MEMCACHED_VALUES })
    } catch (e) {
      console.log(e)
      process.exit(1)
    }
  })

program
  .command('auth')
  .description('Obtain a token for your MoleculerFaas gateway')
  .action(async () => {
  })

program
  .command('deploy')
  .description('Deploy MoleculerFaas functions')
  .option('-f, --file <FILE_YAML>', 'Path to YAML file describing function(s)')
  /* .option('-n, --name <APP_NAME>', 'The name to use for the MoleculerFaas')
  .option('-e, --env <ENV>', 'Environement to execute the MoleculerFaas', 'development')
  .option('-i, --image-repository <IMAGE_REPOSITORY>', 'The docker repository to use')
  .option('-t, --image-tag <IMAGE_TAG>', 'The docker tag to use', 'latest')
  .option('-h, --ingress-host <INGRESS_HOST>', 'The hostname to use for ingress controller')
  .option('-r, --replicas <REPLICAS>', 'The number of replicas to implement', 2) */
  .action(async (cmd) => {
    try {
      const { file: FILE_YAML } = cmd
      const broker = new ServiceBroker({
        metrics: false,
        logger: false
      })
      await broker.loadServices()
      await broker.start()
      await broker.call('Commander.Deploy', { FILE_YAML })
    } catch (e) {
      console.log(e)
      process.exit(1)
    }
  })

program
  .command('list')
  .description('List MoleculerFaas functions')
  .action(async () => {
    try {
      const broker = new ServiceBroker({
        metrics: false,
        logger: false
      })
      await broker.loadServices()
      await broker.start()
      await broker.call('Commander.List')
    } catch (e) {
      console.log(e)
      process.exit(1)
    }
  })

program.parse(process.argv)
