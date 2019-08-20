const { 
  checkKeysAndValues,
  isArray
} = require('../utils')


const mixTapeKeys = [
  {key: 'users', validation: isArray},
  {key: 'songs', validation: isArray},
  {key: 'playlists', validation: isArray},
]

module.exports = {
  isMixtapeValid : checkKeysAndValues(mixTapeKeys)
}