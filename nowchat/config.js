var fs = require('fs')

if (fs.existsSync('/home/dotcloud/environment.json')) {
  var env = JSON.parse(fs.readFileSync('/home/dotcloud/environment.json'))
  exports = module.exports = {
    mongo: env['DOTCLOUD_MONGO_MONGODB_URL']
  }
} else {
  exports = module.exports = {}
}

