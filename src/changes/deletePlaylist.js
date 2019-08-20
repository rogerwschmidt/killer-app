const {
  checkKeysAndValues, isNumber
} = require('../utils')


const keysRequired = [
  { key: 'playlist', validation: isNumber }
]

const apply = (mixtape, { playlist: playlistId }) => {
  
  // get playlist, throw error if it does not exist
  const playList = mixtape.playlists.find(playlist => playlist.id === String(playlistId))
  if(!playList) throw new Error(`Playlist ${playList} does not exist`)

  // get index of the playlist
  const playlistIndex = mixtape.playlists.findIndex(e => e.id === String(playlistId) )
  
  // remote playlist from array
  mixtape.playlists.splice(playlistIndex, 1)

  return mixtape
}

module.exports = {
  isValid: checkKeysAndValues(keysRequired),
  apply
}