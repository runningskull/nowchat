var fs = require('fs')

if (fs.exists('/home/dotcloud/environment.json')) {
  var env = JSON.parse(fs.readFileSync('/home/dotcloud/environment.json'))
  exports = module.exports = {
    mongo: env['DOTCLOUD_MONGO_MONGO_URL']
  }
} else {
  exports = module.exports = {}
}

