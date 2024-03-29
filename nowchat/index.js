var express = require('express')
  , _ = require('underscore')
  , http = require('http')
  , app = express()
  , server = http.createServer(app)
  , config = require('./config')
  , everyone

  , Mongolian = require('mongolian')
  , db = new Mongolian(config.mongo ? config.mongo + '/admin' : 'localhost:27017/nowchat')
  , history, _allUsers=[]

history = db.collection('history')

server.listen(8080), console.log('Listening on 3000')
everyone = require('now').initialize(server)


app.use(express.logger())
app.use(express.static(__dirname + '/public'))

var __all = function() {
  _allUsers = _.reduce(everyone.users, function(memo, val, key) {
    return (memo.push(val.now.name)), memo
  }, [])
}

function allUsers() {
  __all()
  return _allUsers
}


everyone.now.distributeMsg = function(msg) {
  everyone.now.displayMsg(this.now.name, msg)
  history.insert({author:this.now.name, msg:msg})
}

everyone.now.hello = function() {
  var self = this
  history.find().sort({$natural: -1}).limit(100).toArray(function(err, arr) {
    self.now.displayHistory(arr)
  })
}


everyone.on('connect', function() {
  process.nextTick(function() {
    everyone.now.displayUsers(allUsers())
  })
})

everyone.on('disconnect', function() {
  process.nextTick(function() {
    everyone.now.displayUsers(allUsers())
  })
})


