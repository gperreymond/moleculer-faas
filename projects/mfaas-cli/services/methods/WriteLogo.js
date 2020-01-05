const chalk = require('chalk')
const figlet = require('figlet')

const { description } = require('../../package.json')

module.exports = async function () {
  console.log(chalk`{blue ${figlet.textSync('MoleculerFaas', {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  })}}`)
  console.log(' ')
  console.log(description)
  console.log(' ')
}
