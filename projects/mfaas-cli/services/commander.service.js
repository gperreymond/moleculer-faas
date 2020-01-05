module.exports = {
  name: 'Commander',
  actions: {
    Help: require('./actions/Help'),
    Version: require('./actions/Version')
  },
  methods: {
    WriteLogo: require('./methods/WriteLogo')
  }
}
