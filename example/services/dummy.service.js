module.exports = {
  name: 'Dummy',
  metadata: {
    aliases: {
      'POST dummy/hello-world': [
        'Dummy.HelloWorld'
      ],
      'GET dummy/not-hello-world': 'Dummy.NotHelloWorld'
    }
  },
  actions: {
    HelloWorld: require('./actions/HelloWorldQuery'),
    NotHelloWorld: require('./actions/NotHelloWorld')
  }
}
