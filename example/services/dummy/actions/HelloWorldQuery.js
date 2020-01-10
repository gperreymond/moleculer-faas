module.exports = {
  handler: async function (ctx) {
    return { debug: true, ...ctx.params }
  }
}
