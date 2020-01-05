module.exports = {
  name: 'Commander',
  actions: {
    Help: require('./actions/Help'),
    Version: require('./actions/Version'),
    Deploy: require('./actions/Deploy')
  },
  methods: {
    WriteLogo: require('./methods/WriteLogo')
  }
}
