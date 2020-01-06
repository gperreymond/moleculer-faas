module.exports = {
  name: 'Commander',
  actions: {
    Help: require('./actions/Help'),
    Version: require('./actions/Version'),
    Install: require('./actions/Install'),
    List: require('./actions/List'),
    Deploy: require('./actions/Deploy')
  },
  methods: {
    WriteLogo: require('./methods/WriteLogo')
  }
}
