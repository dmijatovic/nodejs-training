

module.exports = {
  generateMessage({from, body}){
    return {
      from: from,
      body: body,
      createdAt: new Date().toISOString()
    }
  }
}