module.exports = init

var request = require('request')
  , async = require('async')

function init(callback) {
  callback(null, 'ifttt', Ifttt)
}

function Ifttt(automait, logger, config) {
  this.automait = automait
  this.logger = logger
  this.config = config
  this.triggerBaseUrl = 'https://maker.ifttt.com/trigger/'
}

Ifttt.prototype.trigger = function (eventName, values, people, callback) {
  var data = {}

  values.forEach(function (value, index) {
    data['value' + (index + 1)] = value
  })

  async.each(people
  , function (name, eachCb) {
      var url = this.triggerBaseUrl + eventName + '/with/key/' + this.config.people[name]
      request.post({ url: url, body: data, json: true }, eachCb)
    }.bind(this)
  , callback
  )
}
